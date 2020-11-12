/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);


//1
const putSession = async (email, password) => {
  const res = await fetch('/api/session', {method: "put",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN") },
    body: JSON.stringify({ email, password })});
  res.data = await res.json();
  console.log(res.data);
}

//2
const deleteSession = async _ => { const res = await fetch('/api/session', {method: "delete",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN") }});
  res.data = await res.json();
  console.log(res.data);
}

//3
const postUser = async (firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff) => {
  const res = await fetch('/api/users', { method: "post",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN") },
    body: JSON.stringify({firstName,lastName,email,wantsEmail,password,confirmPassword,optStuff}) });
  res.data = await res.json();
  console.log(res.data);
}

//4
const getUser = async _ => {
  const res = await fetch("/api/users");
  res.data = await res.json();
  console.log(res.data);
}

//5
const putUser = async (firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff) => {
  const res = await fetch('/api/users', {method: "put",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")},
    body: JSON.stringify({firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff}) });
  res.data = await res.json();
  console.log(res.data);
}

//6
const deleteUser = async _ => {
  const res = await fetch('/api/users', {method: "delete", body: JSON.stringify({message: "bye" }),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
  await deleteSession();
}

//7
const postClass = async (name, description) => {
  const res = await fetch('/api/classes', {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")},
    body: JSON.stringify({name, description}) });
  res.data = await res.json();
  console.log(res.data);
}

//8
const postClassSubscription = async id => {
  const res = await fetch(`/api/classes/${id}/subscription`, {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")},
  //  body: JSON.stringify({})
  });
  res.data = await res.json();
  console.log(res.data);
}
//9
const getClasses = async _ => {
  const res = await fetch("/api/classes");
  res.data = await res.json();
  console.log(res.data);
}

//10
const getClass = async id => {
  const res = await fetch(`/api/classes/${id}`);
  res.data = await res.json();
  console.log(res.data);
}

//11
const deleteClass = async id => {
  const res = await fetch(`/api/classes/${id}`, {method: "delete", body: JSON.stringify({message: "class gone" }),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

//12
const postDeck = async (classId, name, objective) => {
  const res = await fetch('/api/decks', { method: "post",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN") },
    body: JSON.stringify({ classId, name, objective }) });
  res.data = await res.json();
  console.log(res.data);
}

//13
const getDecks = async (classId, deckIds) => {
  const res = await fetch(`/api/decks/${classId}/${deckIds.join("&")}`);
  res.data = await res.json();
  console.log(res.data);
}

//14
const deleteDeck = async id => {
  const res = await fetch(`/api/decks/${id}`, {method: "delete", body: JSON.stringify({}),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

//15
const postCard = async (deckId, question, answer) => {
  const res = await fetch(`/api/cards`, {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")},
    body: JSON.stringify({deckId, question, answer})});
  res.data = await res.json();
  console.log(res.data);
}

//16
const getCard = async id => {
  const res = await fetch(`/api/cards/${id}`);
  res.data = await res.json();
  console.log(res.data);
}

//17
const putCard = async (id, question, answer) => {
  const res = await fetch(`/api/cards/${id}`, {method: "put",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")},
    body: JSON.stringify({question, answer})});
  res.data = await res.json();
  console.log(res.data);
}

//18
const putCardHistory = async (id, confidence) => {
  const res = await fetch(`/api/cards/${id}/confidence`, {method: "put",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN") },
    body: JSON.stringify({ confidence })});
  res.data = await res.json();
  console.log(res.data);
}

//19
const deleteCard = async id => {
  const res = await fetch(`/api/cards/${id}`, {method: "delete", body: JSON.stringify({}),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

window.putSession = putSession;                      //1
window.deleteSession = deleteSession;                //2
window.postUser = postUser;                          //3
window.getUser = getUser;                            //4
window.putUser = putUser;                            //5
window.deleteUser = deleteUser;                      //6
window.postClass = postClass                         //7
window.postClassSubscription = postClassSubscription //8
window.getClasses = getClasses                       //9
window.getClass = getClass                           //10
window.deleteClass = deleteClass                     //11
window.postDeck = postDeck                           //12
window.getDecks = getDecks                          //13
window.deleteDeck = deleteDeck                       //14
window.postCard = postCard                           //15
window.getCard = getCard                             //16
window.putCard = putCard                             //17
window.putCardHistory = putCardHistory               //18
window.deleteCard = deleteCard                       //19


/***/ }),

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFnQzs7QUFFaEM7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxjQUFjLG1EQUFtRCxnREFBTyxvQkFBb0I7QUFDNUYsMEJBQTBCLGtCQUFrQixFQUFFO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQywwQ0FBMEM7QUFDNUUsY0FBYyxtREFBbUQsZ0RBQU8scUJBQXFCO0FBQzdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLGNBQWMsbURBQW1ELGdEQUFPLG9CQUFvQjtB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Q0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxxRUFBcUU7QUFDckU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7O0FBRUEsU0FBUyxvQkFBb0I7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuLy8xXG5jb25zdCBwdXRTZXNzaW9uID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXNzaW9uJywge21ldGhvZDogXCJwdXRcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSl9KTtcbiAgcmVzLmRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59XG5cbi8vMlxuY29uc3QgZGVsZXRlU2Vzc2lvbiA9IGFzeW5jIF8gPT4geyBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXNzaW9uJywge21ldGhvZDogXCJkZWxldGVcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpIH19KTtcbiAgcmVzLmRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59XG5cbi8vM1xuY29uc3QgcG9zdFVzZXIgPSBhc3luYyAoZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHdhbnRzRW1haWwsIHBhc3N3b3JkLCBjb25maXJtUGFzc3dvcmQsIG9wdFN0dWZmKSA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL3VzZXJzJywgeyBtZXRob2Q6IFwicG9zdFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIikgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Zmlyc3ROYW1lLGxhc3ROYW1lLGVtYWlsLHdhbnRzRW1haWwscGFzc3dvcmQsY29uZmlybVBhc3N3b3JkLG9wdFN0dWZmfSkgfSk7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufVxuXG4vLzRcbmNvbnN0IGdldFVzZXIgPSBhc3luYyBfID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL3VzZXJzXCIpO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy81XG5jb25zdCBwdXRVc2VyID0gYXN5bmMgKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCB3YW50c0VtYWlsLCBwYXNzd29yZCwgY29uZmlybVBhc3N3b3JkLCBvcHRTdHVmZikgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS91c2VycycsIHttZXRob2Q6IFwicHV0XCIsXG4gICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Zmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHdhbnRzRW1haWwsIHBhc3N3b3JkLCBjb25maXJtUGFzc3dvcmQsIG9wdFN0dWZmfSkgfSk7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufVxuXG4vLzZcbmNvbnN0IGRlbGV0ZVVzZXIgPSBhc3luYyBfID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvdXNlcnMnLCB7bWV0aG9kOiBcImRlbGV0ZVwiLCBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogXCJieWVcIiB9KSxcbiAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIil9fSk7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICBhd2FpdCBkZWxldGVTZXNzaW9uKCk7XG59XG5cbi8vN1xuY29uc3QgcG9zdENsYXNzID0gYXN5bmMgKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2NsYXNzZXMnLCB7bWV0aG9kOiBcInBvc3RcIixcbiAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIil9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtuYW1lLCBkZXNjcmlwdGlvbn0pIH0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy84XG5jb25zdCBwb3N0Q2xhc3NTdWJzY3JpcHRpb24gPSBhc3luYyBpZCA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvYXBpL2NsYXNzZXMvJHtpZH0vc3Vic2NyaXB0aW9uYCwge21ldGhvZDogXCJwb3N0XCIsXG4gICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpfSxcbiAgLy8gIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt9KVxuICB9KTtcbiAgcmVzLmRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59XG4vLzlcbmNvbnN0IGdldENsYXNzZXMgPSBhc3luYyBfID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NsYXNzZXNcIik7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufVxuXG4vLzEwXG5jb25zdCBnZXRDbGFzcyA9IGFzeW5jIGlkID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2xhc3Nlcy8ke2lkfWApO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy8xMVxuY29uc3QgZGVsZXRlQ2xhc3MgPSBhc3luYyBpZCA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvYXBpL2NsYXNzZXMvJHtpZH1gLCB7bWV0aG9kOiBcImRlbGV0ZVwiLCBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogXCJjbGFzcyBnb25lXCIgfSksXG4gICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpfX0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy8xMlxuY29uc3QgcG9zdERlY2sgPSBhc3luYyAoY2xhc3NJZCwgbmFtZSwgb2JqZWN0aXZlKSA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2RlY2tzJywgeyBtZXRob2Q6IFwicG9zdFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIikgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNsYXNzSWQsIG5hbWUsIG9iamVjdGl2ZSB9KSB9KTtcbiAgcmVzLmRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59XG5cbi8vMTNcbmNvbnN0IGdldERlY2tzID0gYXN5bmMgKGNsYXNzSWQsIGRlY2tJZHMpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvZGVja3MvJHtjbGFzc0lkfS8ke2RlY2tJZHMuam9pbihcIiZcIil9YCk7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufVxuXG4vLzE0XG5jb25zdCBkZWxldGVEZWNrID0gYXN5bmMgaWQgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgL2FwaS9kZWNrcy8ke2lkfWAsIHttZXRob2Q6IFwiZGVsZXRlXCIsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHt9KSxcbiAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIil9fSk7XG4gIHJlcy5kYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xufVxuXG4vLzE1XG5jb25zdCBwb3N0Q2FyZCA9IGFzeW5jIChkZWNrSWQsIHF1ZXN0aW9uLCBhbnN3ZXIpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FyZHNgLCB7bWV0aG9kOiBcInBvc3RcIixcbiAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFwiWFNSRi1UT0tFTlwiOiBDb29raWVzLmdldChcIlhTUkYtVE9LRU5cIil9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtkZWNrSWQsIHF1ZXN0aW9uLCBhbnN3ZXJ9KX0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy8xNlxuY29uc3QgZ2V0Q2FyZCA9IGFzeW5jIGlkID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FyZHMvJHtpZH1gKTtcbiAgcmVzLmRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG59XG5cbi8vMTdcbmNvbnN0IHB1dENhcmQgPSBhc3luYyAoaWQsIHF1ZXN0aW9uLCBhbnN3ZXIpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FyZHMvJHtpZH1gLCB7bWV0aG9kOiBcInB1dFwiLFxuICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJYU1JGLVRPS0VOXCI6IENvb2tpZXMuZ2V0KFwiWFNSRi1UT0tFTlwiKX0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3F1ZXN0aW9uLCBhbnN3ZXJ9KX0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy8xOFxuY29uc3QgcHV0Q2FyZEhpc3RvcnkgPSBhc3luYyAoaWQsIGNvbmZpZGVuY2UpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FyZHMvJHtpZH0vY29uZmlkZW5jZWAsIHttZXRob2Q6IFwicHV0XCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXCJYU1JGLVRPS0VOXCI6IENvb2tpZXMuZ2V0KFwiWFNSRi1UT0tFTlwiKSB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29uZmlkZW5jZSB9KX0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxuLy8xOVxuY29uc3QgZGVsZXRlQ2FyZCA9IGFzeW5jIGlkID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FyZHMvJHtpZH1gLCB7bWV0aG9kOiBcImRlbGV0ZVwiLCBib2R5OiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlhTUkYtVE9LRU5cIjogQ29va2llcy5nZXQoXCJYU1JGLVRPS0VOXCIpfX0pO1xuICByZXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbn1cblxud2luZG93LnB1dFNlc3Npb24gPSBwdXRTZXNzaW9uOyAgICAgICAgICAgICAgICAgICAgICAvLzFcbndpbmRvdy5kZWxldGVTZXNzaW9uID0gZGVsZXRlU2Vzc2lvbjsgICAgICAgICAgICAgICAgLy8yXG53aW5kb3cucG9zdFVzZXIgPSBwb3N0VXNlcjsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vM1xud2luZG93LmdldFVzZXIgPSBnZXRVc2VyOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzRcbndpbmRvdy5wdXRVc2VyID0gcHV0VXNlcjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy81XG53aW5kb3cuZGVsZXRlVXNlciA9IGRlbGV0ZVVzZXI7ICAgICAgICAgICAgICAgICAgICAgIC8vNlxud2luZG93LnBvc3RDbGFzcyA9IHBvc3RDbGFzcyAgICAgICAgICAgICAgICAgICAgICAgICAvLzdcbndpbmRvdy5wb3N0Q2xhc3NTdWJzY3JpcHRpb24gPSBwb3N0Q2xhc3NTdWJzY3JpcHRpb24gLy84XG53aW5kb3cuZ2V0Q2xhc3NlcyA9IGdldENsYXNzZXMgICAgICAgICAgICAgICAgICAgICAgIC8vOVxud2luZG93LmdldENsYXNzID0gZ2V0Q2xhc3MgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzEwXG53aW5kb3cuZGVsZXRlQ2xhc3MgPSBkZWxldGVDbGFzcyAgICAgICAgICAgICAgICAgICAgIC8vMTFcbndpbmRvdy5wb3N0RGVjayA9IHBvc3REZWNrICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xMlxud2luZG93LmdldERlY2tzID0gZ2V0RGVja3MgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTNcbndpbmRvdy5kZWxldGVEZWNrID0gZGVsZXRlRGVjayAgICAgICAgICAgICAgICAgICAgICAgLy8xNFxud2luZG93LnBvc3RDYXJkID0gcG9zdENhcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzE1XG53aW5kb3cuZ2V0Q2FyZCA9IGdldENhcmQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTZcbndpbmRvdy5wdXRDYXJkID0gcHV0Q2FyZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xN1xud2luZG93LnB1dENhcmRIaXN0b3J5ID0gcHV0Q2FyZEhpc3RvcnkgICAgICAgICAgICAgICAvLzE4XG53aW5kb3cuZGVsZXRlQ2FyZCA9IGRlbGV0ZUNhcmQgICAgICAgICAgICAgICAgICAgICAgIC8vMTlcbiIsIi8qIVxuICogSmF2YVNjcmlwdCBDb29raWUgdjIuMi4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vanMtY29va2llL2pzLWNvb2tpZVxuICpcbiAqIENvcHlyaWdodCAyMDA2LCAyMDE1IEtsYXVzIEhhcnRsICYgRmFnbmVyIEJyYWNrXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHR2YXIgcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKCFyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIpIHtcblx0XHR2YXIgT2xkQ29va2llcyA9IHdpbmRvdy5Db29raWVzO1xuXHRcdHZhciBhcGkgPSB3aW5kb3cuQ29va2llcyA9IGZhY3RvcnkoKTtcblx0XHRhcGkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5Db29raWVzID0gT2xkQ29va2llcztcblx0XHRcdHJldHVybiBhcGk7XG5cdFx0fTtcblx0fVxufShmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBhcmd1bWVudHNbIGkgXTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVjb2RlIChzKSB7XG5cdFx0cmV0dXJuIHMucmVwbGFjZSgvKCVbMC05QS1aXXsyfSkrL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIpIHtcblx0XHRmdW5jdGlvbiBhcGkoKSB7fVxuXG5cdFx0ZnVuY3Rpb24gc2V0IChrZXksIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGF0dHJpYnV0ZXMgPSBleHRlbmQoe1xuXHRcdFx0XHRwYXRoOiAnLydcblx0XHRcdH0sIGFwaS5kZWZhdWx0cywgYXR0cmlidXRlcyk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpICogMSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGUrNSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlJ3JlIHVzaW5nIFwiZXhwaXJlc1wiIGJlY2F1c2UgXCJtYXgtYWdlXCIgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuXHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzID8gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJztcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdFx0aWYgKC9eW1xce1xcW10vLnRlc3QocmVzdWx0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0XHR2YWx1ZSA9IGNvbnZlcnRlci53cml0ZSA/XG5cdFx0XHRcdGNvbnZlcnRlci53cml0ZSh2YWx1ZSwga2V5KSA6XG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDNBfDNDfDNFfDNEfDJGfDNGfDQwfDVCfDVEfDVFfDYwfDdCfDdEfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXG5cdFx0XHRrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpXG5cdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG5cdFx0XHRcdC5yZXBsYWNlKC9bXFwoXFwpXS9nLCBlc2NhcGUpO1xuXG5cdFx0XHR2YXIgc3RyaW5naWZpZWRBdHRyaWJ1dGVzID0gJyc7XG5cdFx0XHRmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc7ICcgKyBhdHRyaWJ1dGVOYW1lO1xuXHRcdFx0XHRpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ29uc2lkZXJzIFJGQyA2MjY1IHNlY3Rpb24gNS4yOlxuXHRcdFx0XHQvLyAuLi5cblx0XHRcdFx0Ly8gMy4gIElmIHRoZSByZW1haW5pbmcgdW5wYXJzZWQtYXR0cmlidXRlcyBjb250YWlucyBhICV4M0IgKFwiO1wiKVxuXHRcdFx0XHQvLyAgICAgY2hhcmFjdGVyOlxuXHRcdFx0XHQvLyBDb25zdW1lIHRoZSBjaGFyYWN0ZXJzIG9mIHRoZSB1bnBhcnNlZC1hdHRyaWJ1dGVzIHVwIHRvLFxuXHRcdFx0XHQvLyBub3QgaW5jbHVkaW5nLCB0aGUgZmlyc3QgJXgzQiAoXCI7XCIpIGNoYXJhY3Rlci5cblx0XHRcdFx0Ly8gLi4uXG5cdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdLnNwbGl0KCc7JylbMF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldCAoa2V5LCBqc29uKSB7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBqYXIgPSB7fTtcblx0XHRcdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0XHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLlxuXHRcdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblx0XHRcdHZhciBpID0gMDtcblxuXHRcdFx0Zm9yICg7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IGNvb2tpZXNbaV0uc3BsaXQoJz0nKTtcblx0XHRcdFx0dmFyIGNvb2tpZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcblxuXHRcdFx0XHRpZiAoIWpzb24gJiYgY29va2llLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvb2tpZS5zbGljZSgxLCAtMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBuYW1lID0gZGVjb2RlKHBhcnRzWzBdKTtcblx0XHRcdFx0XHRjb29raWUgPSAoY29udmVydGVyLnJlYWQgfHwgY29udmVydGVyKShjb29raWUsIG5hbWUpIHx8XG5cdFx0XHRcdFx0XHRkZWNvZGUoY29va2llKTtcblxuXHRcdFx0XHRcdGlmIChqc29uKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjb29raWUgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGphcltuYW1lXSA9IGNvb2tpZTtcblxuXHRcdFx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGtleSA/IGphcltrZXldIDogamFyO1xuXHRcdH1cblxuXHRcdGFwaS5zZXQgPSBzZXQ7XG5cdFx0YXBpLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBnZXQoa2V5LCBmYWxzZSAvKiByZWFkIGFzIHJhdyAqLyk7XG5cdFx0fTtcblx0XHRhcGkuZ2V0SlNPTiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBnZXQoa2V5LCB0cnVlIC8qIHJlYWQgYXMganNvbiAqLyk7XG5cdFx0fTtcblx0XHRhcGkucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgYXR0cmlidXRlcykge1xuXHRcdFx0c2V0KGtleSwgJycsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XG5cdFx0XHRcdGV4cGlyZXM6IC0xXG5cdFx0XHR9KSk7XG5cdFx0fTtcblxuXHRcdGFwaS5kZWZhdWx0cyA9IHt9O1xuXG5cdFx0YXBpLndpdGhDb252ZXJ0ZXIgPSBpbml0O1xuXG5cdFx0cmV0dXJuIGFwaTtcblx0fVxuXG5cdHJldHVybiBpbml0KGZ1bmN0aW9uICgpIHt9KTtcbn0pKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=