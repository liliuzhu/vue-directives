(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueDirectives"] = factory();
	else
		root["VueDirectives"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(2);
var ctx = __webpack_require__(20);
var hide = __webpack_require__(22);
var has = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(10);
var defined = __webpack_require__(6);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(7);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/number/min-safe-integer.js
var min_safe_integer = __webpack_require__(12);
var min_safe_integer_default = /*#__PURE__*/__webpack_require__.n(min_safe_integer);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/number/max-safe-integer.js
var max_safe_integer = __webpack_require__(13);
var max_safe_integer_default = /*#__PURE__*/__webpack_require__.n(max_safe_integer);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/number/is-finite.js
var is_finite = __webpack_require__(14);
var is_finite_default = /*#__PURE__*/__webpack_require__.n(is_finite);

// CONCATENATED MODULE: ./src/utils/index.js
var triggerEvent = function triggerEvent(el, name) {
  var eventName = '';
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  var e = document.createEvent(eventName);
  e.initEvent(name, true, true);
  el.dispatchEvent ? el.dispatchEvent(e) : el.fireEvent('on' + name, e);
};
// CONCATENATED MODULE: ./src/directives/integer/index.js






var timer = null;
var integer_dataHandle = function dataHandle(event, inputEl, binding, vnode, options) {
  var inputValue = inputEl.value;
  var newValue = null;
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : '';
  } else {
    var reg = /^[^\d-]|(?!^)[^\d]/g;
    var reg2 = /^([-]?)[0]+/g;
    newValue = inputValue.replace(reg, '').replace(reg2, '$1') || '0';
  }

  if ((is_finite_default()(options.max) || is_finite_default()(options.min)) && newValue) {
    newValue = Number(newValue);
    if (max_safe_integer_default.a && newValue > max_safe_integer_default.a || min_safe_integer_default.a && newValue < min_safe_integer_default.a) {
      console.warn('\u63D0\u793A\uFF1A\u8F93\u5165\u503C\u8D85\u8FC7\xB1' + max_safe_integer_default.a + '\uFF0C\u65E0\u6CD5\u7CBE\u786E\u8868\u793A\u8FD9\u4E2A\u503C');
    }
    options.warningEvents.indexOf(event.type) > -1 && (newValue > options.max || newValue < options.min) && options.tipFun && options.tipFun();
    if (options.cover && options.coverEvents.indexOf(event.type) > -1) {
      newValue = is_finite_default()(options.max) && newValue > options.max ? options.max : is_finite_default()(options.min) && newValue < options.min ? options.min : newValue;
    }
  }
  console.log(1, event.isTrusted);
  timer = setTimeout(function () {
    console.log('' + newValue);
    inputEl.value = '' + newValue;
    console.log(2, event.isTrusted);
    triggerEvent(inputEl, 'input');
    clearTimeout(timer);
    timer = null;
  }, 0);
};
var EVENTS = ['input', 'blur'];

/* harmony default export */ var integer = ({
  name: 'integer',
  bind: function bind(el, binding, vnode) {
    var defaultOptions = {
      reqired: false,
      cover: false,
      reqireValue: '0',
      max: Infinity,
      min: -Infinity,
      coverEvents: ['blur'],
      warningEvents: ['blur'],
      tipFun: null };
    var options = extends_default()({}, defaultOptions, binding.modifiers || {}, binding.value || {});
    console.log(options);
    var inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0];
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用');
      return;
    }
    inputEl.keyupHandle = function (event) {
      integer_dataHandle(event, inputEl, binding, vnode, options);
    };
    EVENTS.forEach(function (event) {
      inputEl.addEventListener(event, inputEl.keyupHandle, false);
    });
  },
  unbind: function unbind(el) {
    var inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0];
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用');
      return;
    }
    EVENTS.forEach(function (event) {
      inputEl.removeEventListener(event, inputEl.keyupHandle, true);
    });
    delete inputEl.keyupHandle;
  }
});
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/number/parse-int.js
var parse_int = __webpack_require__(50);
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// CONCATENATED MODULE: ./src/directives/float/index.js







var float_addZero = function addZero() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var num = parse_int_default()(number);
  if (num <= 0) return '';
  var arr = [];
  while (num--) {
    arr.push('0');
  }
  return arr.join('');
};
var handleFixed = function handleFixed() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var toFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var string = '' + value;
  if (!string || toFixed < 0) return string;
  var tempArray = string.split('.');
  tempArray[1] = tempArray[1] || '';
  if (tempArray[1].length < toFixed) {
    tempArray[1] += float_addZero(toFixed - tempArray[1].length);
  } else if (tempArray[1].length > toFixed) {
    tempArray[1] = tempArray[1].slice(0, toFixed);
  }
  return tempArray.join('.');
};
var float_timer = null;
var float_dataHandle = function dataHandle(event, inputEl, binding, vnode, options) {
  var inputValue = inputEl.value;
  var newValue = null;
  if (inputValue.length === 0) {
    newValue = options.reqired ? options.reqireValue : '';
  } else {
    var reg = /^[^\d-]|(?!^)[^\d.]/g;
    var reg2 = /^([-]?)([0]+)([\d]+[.]?[\d]?)/g;
    var reg3 = /[.]{2,}/g;
    newValue = inputValue.replace(reg, '').replace(reg3, '.').replace(reg2, '$1$3') || '0';
    var tempArray = newValue.split('.');
    newValue = tempArray.slice(0, 2).join('.') + tempArray.slice(2).join('');
  }
  if ((is_finite_default()(options.max) || is_finite_default()(options.min)) && newValue) {
    newValue = newValue && Number(newValue);
    if (max_safe_integer_default.a && newValue > max_safe_integer_default.a || min_safe_integer_default.a && newValue < min_safe_integer_default.a) {
      console.warn('\u63D0\u793A\uFF1A\u8F93\u5165\u503C\u8D85\u8FC7\xB1' + max_safe_integer_default.a + '\uFF0C\u65E0\u6CD5\u7CBE\u786E\u8868\u793A\u8FD9\u4E2A\u503C');
    }
    options.warningEvents.indexOf(event.type) > -1 && (newValue > options.max || newValue < options.min) && options.tipFun && options.tipFun();
    if (options.cover && options.coverEvents.indexOf(event.type) > -1) {
      newValue = is_finite_default()(options.max) && newValue > options.max ? options.max : is_finite_default()(options.min) && newValue < options.min ? options.min : newValue;
    }
  }
  if (options.toFixedEvents.indexOf(event.type) > -1) {
    newValue = handleFixed(newValue, options.toFixed);
  }
  float_timer = setTimeout(function () {
    console.log(newValue);
    inputEl.value = '' + newValue;
    triggerEvent(inputEl, 'input');
    clearTimeout(float_timer);
    float_timer = null;
  }, 0);
};
var float_EVENTS = ['input', 'blur'];

/* harmony default export */ var directives_float = ({
  name: 'float',
  bind: function bind(el, binding, vnode) {
    var defaultOptions = {
      reqired: false,
      cover: false,
      reqireValue: '0',
      max: Infinity,
      toFixed: -1,
      min: -Infinity,
      coverEvents: ['blur'],
      warningEvents: ['blur'],
      toFixedEvents: ['blur'],
      tipFun: null };
    var options = extends_default()({}, defaultOptions, binding.modifiers || {}, binding.value || {});
    console.log(options);
    var inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0];
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用');
      return;
    }
    inputEl.keyupHandle = function (event) {
      event.isTrusted && float_dataHandle(event, inputEl, binding, vnode, options);
    };
    float_EVENTS.forEach(function (event) {
      inputEl.addEventListener(event, inputEl.keyupHandle, false);
    });
  },
  unbind: function unbind(el) {
    var inputEl = el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0];
    if (!inputEl) {
      throw new Error('该指令只能在input元素或者其父元素使用');
      return;
    }
    float_EVENTS.forEach(function (event) {
      inputEl.removeEventListener(event, inputEl.keyupHandle, true);
    });
    delete inputEl.keyupHandle;
  }
});
// CONCATENATED MODULE: ./src/directives/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "float", function() { return directives_float; });
/* @license
 目前integer和float两个指令存在bug，当输入的数值大于Number.MAX_SAFE_INTEGER会造成经度丢失的问题
 */



var directives = [integer, directives_float];
var install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  directives.forEach(function (directive) {
    Vue.directive(directive.name, directive);
  });
};


/* harmony default export */ var src_directives = __webpack_exports__["default"] = ({
  install: install
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(29) });


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(21);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(23);
var createDesc = __webpack_require__(28);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(24);
var IE8_DOM_DEFINE = __webpack_require__(25);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(3);
var getKeys = __webpack_require__(30);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(42);
var toObject = __webpack_require__(43);
var IObject = __webpack_require__(10);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(31);
var enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(9);
var arrayIndexOf = __webpack_require__(33)(false);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(11);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(11);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(37)('keys');
var uid = __webpack_require__(39);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(38) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
module.exports = -0x1fffffffffffff;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = 0x1fffffffffffff;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(2).Number.isFinite;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(1).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(2).Number.parseInt;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(53);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(1).parseInt;
var $trim = __webpack_require__(54).trim;
var ws = __webpack_require__(15);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(6);
var fails = __webpack_require__(4);
var spaces = __webpack_require__(15);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ })
/******/ ]);
});