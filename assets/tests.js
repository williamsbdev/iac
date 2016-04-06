define('iac/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('iac/tests/application/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - application/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'application/controller.js should pass jshint.');
  });
});
define('iac/tests/components/slide-container/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/slide-container/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/slide-container/component.js should pass jshint.');
  });
});
define('iac/tests/components/slide-home/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/slide-home/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/slide-home/component.js should pass jshint.');
  });
});
define('iac/tests/components/slide-overview/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/slide-overview/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/slide-overview/component.js should pass jshint.');
  });
});
define('iac/tests/components/slide.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/slide.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/slide.js should pass jshint.');
  });
});
define('iac/tests/helpers/color.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/color.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/color.js should pass jshint.');
  });
});
define('iac/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('iac/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('iac/tests/helpers/ember-power-select', ['exports', 'ember'], function (exports, _ember) {
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;

  // Helpers for integration tests

  function typeText(selector, text) {
    $(selector).val(text);
    $(selector).trigger('input');
  }

  function triggerKeydown(domElement, k) {
    var oEvent = document.createEvent("Events");
    oEvent.initEvent('keydown', true, true);
    $.extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    _ember['default'].run(function () {
      domElement.dispatchEvent(oEvent);
    });
  }

  function typeInSearch(text) {
    _ember['default'].run(function () {
      typeText('.ember-power-select-search input, .ember-power-select-trigger-multiple-input', text);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    var event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return event[key] = options[key];
    });
    _ember['default'].run(function () {
      return _ember['default'].$(selector)[0].dispatchEvent(event);
    });
  }

  // Helpers for acceptance tests

  exports['default'] = function () {
    var isEmberOne = _ember['default'].VERSION.match(/1\.13/);

    _ember['default'].Test.registerAsyncHelper('selectChoose', function (app, cssPath, value) {
      var id = find(cssPath).find('.ember-power-select-trigger').attr('class').match(/ember-power-select-trigger-ember(\d+)/)[1];
      // If the dropdown is closed, open it
      if (_ember['default'].$('.ember-power-select-dropdown-ember' + id).length === 0) {
        click(cssPath + ' .ember-power-select-trigger');
      }

      // Select the option with the given text
      click('.ember-power-select-dropdown-ember' + id + ' .ember-power-select-option:contains("' + value + '")');
    });

    _ember['default'].Test.registerAsyncHelper('selectSearch', function (app, cssPath, value) {
      var id = find(cssPath).find('.ember-power-select-trigger').attr('class').match(/ember-power-select-trigger-ember(\d+)/)[1];
      var isMultipleSelect = _ember['default'].$(cssPath + ' .ember-power-select-trigger-multiple-input').length > 0;

      var dropdownIsClosed = _ember['default'].$('.ember-power-select-dropdown-ember' + id).length === 0;
      if (dropdownIsClosed) {
        click(cssPath + ' .ember-power-select-trigger');
      }

      if (isMultipleSelect) {
        fillIn(cssPath + ' .ember-power-select-trigger-multiple-input', value);
        if (isEmberOne) {
          triggerEvent(cssPath + ' .ember-power-select-trigger-multiple-input', 'input');
        }
      } else {
        fillIn('.ember-power-select-search input', value);
        if (isEmberOne) {
          triggerEvent('.ember-power-select-dropdown-ember' + id + ' .ember-power-select-search input', 'input');
        }
      }
    });
  };
});
define('iac/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'iac/tests/helpers/start-app', 'iac/tests/helpers/destroy-app'], function (exports, _qunit, _iacTestsHelpersStartApp, _iacTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _iacTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _iacTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('iac/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('iac/tests/helpers/resolver', ['exports', 'iac/resolver', 'iac/config/environment'], function (exports, _iacResolver, _iacConfigEnvironment) {

  var resolver = _iacResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _iacConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _iacConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('iac/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('iac/tests/helpers/scale.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/scale.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/scale.js should pass jshint.');
  });
});
define('iac/tests/helpers/start-app', ['exports', 'ember', 'iac/app', 'iac/config/environment'], function (exports, _ember, _iacApp, _iacConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _iacConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _iacApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('iac/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('iac/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('iac/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('iac/tests/test-helper', ['exports', 'iac/tests/helpers/resolver', 'ember-qunit'], function (exports, _iacTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_iacTestsHelpersResolver['default']);
});
define('iac/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('iac/tests/transitions.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - transitions.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('iac/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map