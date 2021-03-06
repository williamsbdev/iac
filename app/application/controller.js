import Ember from 'ember';
import SlideComponent from 'iac/components/slide';
import { task, subscribe, events } from 'ember-concurrency';

const { computed } = Ember;
const LEFT = 37;
const RIGHT = 39;
const SPACEBAR = 32;

export default Ember.Controller.extend(Ember.Evented, {
  queryParams: ['slide'],
  slide: 'home',

  slides: [
    "home",
    "summary",
    "thank-you"
  ],

  indexedSlides: computed('slides', function() {
    let slides = this.get('slides');
    let indexedSlides = [];
    for (let i = 0; i < slides.length; ++i) {
      let name = slides[i];
      let prev = slides[i-1];
      let next = slides[i+1];
      let componentName = `slide-${name}`;
      this.registerAndValidateSlide(componentName);
      indexedSlides.push({
        componentName,
        name,
        prev,
        next,
        index: i,
      });
    }
    return indexedSlides;
  }),

  currentSlide: computed('slide', function() {
    let name = this.get('slide');
    let indexedSlides = this.get('indexedSlides');
    return indexedSlides.findBy('name', name) || indexedSlides[0];
  }),

  progress: computed('currentSlide', function() {
    let slide = this.get('currentSlide');
    return slide.index / (this.slides.length - 1);
  }),

  registerAndValidateSlide(componentName) {
    let container = Ember.getOwner(this);
    let componentClassName = `component:${componentName}`;
    let ComponentClass = container._lookupFactory(componentClassName);
    let template = container._lookupFactory(`template:components/${componentName}`);
    Ember.assert(`Couldn't resolve template for ${componentName}`, !!template);
    if (!ComponentClass) {
      container.register(componentClassName, SlideComponent);
    }
  },

  index: 0,
  keyboardListener: task(function * () {
    yield subscribe(events(Ember.$(document.body), 'keydown'), function (ev) {
      let { keyCode } = ev;
      let destination;
      if (keyCode === LEFT) {
        destination = this.get('currentSlide.prev');
        if (destination) {
          this.set('index', 0);
          this.set('slide', destination);
        }
      } else if (keyCode === RIGHT || keyCode === SPACEBAR) {
        this.advance();
      }
    });
  }).on('init'),

  advance() {
    let destination = this.get('currentSlide.next');
    document.getSelection().removeAllRanges();
    let prevented = false;
    let proceedEvent = {
      preventDefault() {
        let oldPrevented = prevented;
        prevented = true;
        return !oldPrevented;
      },
      index: this.index,
    };
    this.trigger('nextSlide', proceedEvent);
    Ember.run.next(() => {
      if (!prevented && destination) {
        this.set('index', 0);
        this.set('slide', destination);
      } else {
        this.incrementProperty('index');
      }
    });
  },
});

