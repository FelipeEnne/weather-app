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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DOMmodel.js":
/*!*************************!*\
  !*** ./src/DOMmodel.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _returnCity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./returnCity */ \"./src/returnCity.js\");\n\n\n\nasync function getAPIData() {\n  const API = '0571f1a1044888615170693425198c8d';\n  const data = await fetch(\n    `https://api.openweathermap.org/data/2.5/weather?q=${Object(_returnCity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()}&appid=${API}`,\n    { mode: 'cors' },\n  );\n\n  const model = document.getElementById('output-data');\n\n  if (data.ok === false) {\n    model.style.display = 'none';\n  } else {\n    model.style.display = 'block';\n  }\n\n  const result = await data.json();\n\n  return result;\n}\n\nasync function displayData(cf = 0) {\n  const data = await getAPIData();\n\n  const name = document.getElementById('output-name');\n  const weather = document.getElementById('output-weather');\n  const img = document.getElementById('output-img');\n  const temp = document.getElementById('output-temp');\n  const feel = document.getElementById('output-feel');\n  const minmax = document.getElementById('output-minmax');\n  const humidity = document.getElementById('output-humidity');\n  const wind = document.getElementById('output-wind');\n\n  name.innerHTML = `${data.name} , ${data.sys.country}`;\n  weather.innerHTML = `${data.weather[0].main} , ${data.weather[0].description}`;\n  img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);\n  humidity.innerHTML = `Humidity ${data.main.humidity} %`;\n  wind.innerHTML = `Wind ${data.wind.speed} meter/sec`;\n\n  if (cf === 0) {\n    temp.innerHTML = `${parseFloat(data.main.temp - 273).toFixed(1)} °C`;\n    feel.innerHTML = `Feels like ${parseFloat(data.main.feels_like - 273).toFixed(1)} °C`;\n    minmax.innerHTML = ` Min ${parseFloat(data.main.temp_min - 273).toFixed(1)} °C\n        - Max ${parseFloat(data.main.temp_max - 273).toFixed(1)} °C`;\n  }\n\n  if (cf === 1) {\n    temp.innerHTML = `${(1.8 * (data.main.temp - 273) + 32).toFixed(1)} °F`;\n    feel.innerHTML = `Feels like ${(1.8 * (data.main.feels_like - 273) + 32).toFixed(1)} °F`;\n    minmax.innerHTML = ` Min ${(1.8 * (data.main.temp_min - 273) + 32).toFixed(1)} °F\n        - Max ${(1.8 * (data.main.temp_max - 273) + 32).toFixed(1)} °F`;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (displayData);\n\n\n//# sourceURL=webpack:///./src/DOMmodel.js?");

/***/ }),

/***/ "./src/buttonCF.js":
/*!*************************!*\
  !*** ./src/buttonCF.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMmodel */ \"./src/DOMmodel.js\");\n\r\n\r\nfunction addEventbut() {\r\n  document.getElementById('buttom-celsius').addEventListener('click', () => {\r\n    Object(_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0);\r\n  });\r\n\r\n  document.getElementById('buttom-fahrenheit').addEventListener('click', () => {\r\n    Object(_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1);\r\n  });\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (addEventbut);\n\n//# sourceURL=webpack:///./src/buttonCF.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMmodel */ \"./src/DOMmodel.js\");\n/* harmony import */ var _buttonCF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonCF */ \"./src/buttonCF.js\");\n\r\n\r\n\r\nwindow.onload = Object(_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\nObject(_buttonCF__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/returnCity.js":
/*!***************************!*\
  !*** ./src/returnCity.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction cityInfo(city) {\r\n  const cit = JSON.stringify(city);\r\n  sessionStorage.setItem(0, cit);\r\n}\r\n\r\ndocument.getElementById('button-getCity').addEventListener('click', () => {\r\n  const val = document.getElementById('input-getCity').value;\r\n  cityInfo(val);\r\n});\r\n\r\nfunction getCity() {\r\n  const cit = sessionStorage.getItem(0);\r\n  return JSON.parse(cit);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (getCity);\r\n\n\n//# sourceURL=webpack:///./src/returnCity.js?");

/***/ })

/******/ });