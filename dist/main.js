/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMmodel.js"
/*!*************************!*\
  !*** ./src/DOMmodel.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _returnCity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./returnCity */ \"./src/returnCity.js\");\n\r\n\r\nasync function getAPIData() {\r\n  const API = '0571f1a1044888615170693425198c8d';\r\n  const data = await fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?q=${(0,_returnCity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()}&appid=${API}`,\r\n    { mode: 'cors' },\r\n  );\r\n\r\n  const model = document.getElementById('output-data');\r\n\r\n  if (data.ok === false) {\r\n    model.style.display = 'none';\r\n  } else {\r\n    model.style.display = 'block';\r\n  }\r\n\r\n  const result = await data.json();\r\n\r\n  return result;\r\n}\r\n\r\nasync function displayData(cf = 0) {\r\n  const data = await getAPIData();\r\n\r\n  const name = document.getElementById('output-name');\r\n  const weather = document.getElementById('output-weather');\r\n  const img = document.getElementById('output-img');\r\n  const temp = document.getElementById('output-temp');\r\n  const feel = document.getElementById('output-feel');\r\n  const minmax = document.getElementById('output-minmax');\r\n  const humidity = document.getElementById('output-humidity');\r\n  const wind = document.getElementById('output-wind');\r\n\r\n  name.innerHTML = `${data.name} , ${data.sys.country}`;\r\n  weather.innerHTML = `${data.weather[0].main} , ${data.weather[0].description}`;\r\n  img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);\r\n  humidity.innerHTML = `Humidity ${data.main.humidity} %`;\r\n  wind.innerHTML = `Wind ${data.wind.speed} meter/sec`;\r\n\r\n  if (cf === 0) {\r\n    temp.innerHTML = `${parseFloat(data.main.temp - 273).toFixed(1)} °C`;\r\n    feel.innerHTML = `Feels like ${parseFloat(data.main.feels_like - 273).toFixed(1)} °C`;\r\n    minmax.innerHTML = ` Min ${parseFloat(data.main.temp_min - 273).toFixed(1)} °C\r\n        - Max ${parseFloat(data.main.temp_max - 273).toFixed(1)} °C`;\r\n  }\r\n\r\n  if (cf === 1) {\r\n    temp.innerHTML = `${(1.8 * (data.main.temp - 273) + 32).toFixed(1)} °F`;\r\n    feel.innerHTML = `Feels like ${(1.8 * (data.main.feels_like - 273) + 32).toFixed(1)} °F`;\r\n    minmax.innerHTML = ` Min ${(1.8 * (data.main.temp_min - 273) + 32).toFixed(1)} °F\r\n        - Max ${(1.8 * (data.main.temp_max - 273) + 32).toFixed(1)} °F`;\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayData);\r\n\n\n//# sourceURL=webpack://weather-app/./src/DOMmodel.js?\n}");

/***/ },

/***/ "./src/buttonCF.js"
/*!*************************!*\
  !*** ./src/buttonCF.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DOMmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMmodel */ \"./src/DOMmodel.js\");\n\r\n\r\nfunction addEventbut() {\r\n  document.getElementById('buttom-celsius').addEventListener('click', () => {\r\n    (0,_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0);\r\n  });\r\n\r\n  document.getElementById('buttom-fahrenheit').addEventListener('click', () => {\r\n    (0,_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1);\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addEventbut);\n\n\n//# sourceURL=webpack://weather-app/./src/buttonCF.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMmodel */ \"./src/DOMmodel.js\");\n/* harmony import */ var _buttonCF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonCF */ \"./src/buttonCF.js\");\n\r\n\r\n\r\nwindow.onload = (0,_DOMmodel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_buttonCF__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?\n}");

/***/ },

/***/ "./src/returnCity.js"
/*!***************************!*\
  !*** ./src/returnCity.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction cityInfo(city) {\r\n  const cit = JSON.stringify(city);\r\n  sessionStorage.setItem(0, cit);\r\n}\r\n\r\ndocument.getElementById('button-getCity').addEventListener('click', () => {\r\n  const val = document.getElementById('input-getCity').value;\r\n  cityInfo(val);\r\n});\r\n\r\nfunction getCity() {\r\n  const cit = sessionStorage.getItem(0);\r\n  return JSON.parse(cit);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCity);\r\n\n\n//# sourceURL=webpack://weather-app/./src/returnCity.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;