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

/***/ "./scripts/AStar.ts":
/*!**************************!*\
  !*** ./scripts/AStar.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AStar\": () => (/* binding */ AStar)\n/* harmony export */ });\nvar AStar = /** @class */ (function () {\r\n    function AStar() {\r\n    }\r\n    AStar.findPath = function (terrain, start, end) {\r\n        var open = [];\r\n        var closed = [];\r\n        // add the starting square to the 'open' array\r\n        open.push(start);\r\n        var _loop_1 = function () {\r\n            if (closed.includes(end)) {\r\n                console.log(\"found the end\");\r\n                return \"break\";\r\n            }\r\n            else if (open.length < 1) {\r\n                console.log(\"no path found from %s to %s\", JSON.stringify(start.squarePos), JSON.stringify(end.squarePos));\r\n                return { value: void 0 };\r\n            }\r\n            open.sort(AStar.compareF);\r\n            var current = open.shift();\r\n            closed.push(current);\r\n            var adjacent = AStar.getSurrounding(terrain, current.squarePos);\r\n            adjacent.map(function (square) {\r\n                if (closed.includes(square) || !square.walkable)\r\n                    return;\r\n                console.log(square);\r\n                var index = open.findIndex(function (el) { return el == square; });\r\n                if (index < 0) // not found in open\r\n                 {\r\n                    open.push(square);\r\n                    square.setParentNode(current);\r\n                    square.setG();\r\n                    square.setH(end);\r\n                    square.setF();\r\n                }\r\n                else // is the index thing necessary?\r\n                 {\r\n                    // console.log( \"index:\", index );\r\n                    // console.log( closed );\r\n                    if (open[index].G > current.G + open[index].getMoveCostTo(current)) {\r\n                        open[index].setParentNode(current);\r\n                        open[index].setG();\r\n                        open[index].setF();\r\n                        open.sort(AStar.compareF); // ?\r\n                    }\r\n                }\r\n            });\r\n        };\r\n        while (true) {\r\n            var state_1 = _loop_1();\r\n            if (typeof state_1 === \"object\")\r\n                return state_1.value;\r\n            if (state_1 === \"break\")\r\n                break;\r\n        }\r\n        // console.log( open );\r\n        return AStar.getPath(start, end);\r\n    };\r\n    // arr[y][x] <-- note\r\n    AStar.getSurrounding = function (terrain, squarePos) {\r\n        var x0 = squarePos.x > 0 ? squarePos.x - 1 : 0;\r\n        var y0 = squarePos.y > 0 ? squarePos.y - 1 : 0;\r\n        var xOmega = squarePos.x >= terrain[squarePos.y].length - 1 ? terrain[squarePos.y].length - 1 : squarePos.x + 1;\r\n        var yOmega = squarePos.y >= terrain.length - 1 ? terrain.length - 1 : squarePos.y + 1;\r\n        var arr = [];\r\n        // console.log( x0, y0 );\r\n        // console.log( xOmega, yOmega );\r\n        for (var i = y0; i <= yOmega; i++) // y\r\n         {\r\n            for (var j = x0; j <= xOmega; j++) // x\r\n             {\r\n                if (!(i == squarePos.y && j == squarePos.x))\r\n                    arr.push(terrain[i][j]);\r\n            }\r\n        }\r\n        return arr;\r\n    };\r\n    AStar.compareF = function (a, b) {\r\n        if (a.F < b.F)\r\n            return -1;\r\n        else if (a.F > b.F)\r\n            return 1;\r\n        return 0;\r\n    };\r\n    AStar.getPath = function (start, end) {\r\n        var currentSquare = end;\r\n        var pathArr = [];\r\n        var cost = 0;\r\n        while (currentSquare.squarePos != start.squarePos) {\r\n            pathArr.unshift(currentSquare.squarePos);\r\n            var prev = currentSquare;\r\n            currentSquare = currentSquare.getParentNode();\r\n            cost += currentSquare.getMoveCostTo(prev);\r\n        }\r\n        pathArr.unshift(currentSquare.squarePos); // takes care of the last square - start square\r\n        // console.log( path );\r\n        var path = {\r\n            path: pathArr,\r\n            overallCost: cost\r\n        };\r\n        return path;\r\n    };\r\n    return AStar;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/AStar.ts?");

/***/ }),

/***/ "./scripts/TerrainSquare.ts":
/*!**********************************!*\
  !*** ./scripts/TerrainSquare.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TerrainSquare\": () => (/* binding */ TerrainSquare)\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar TerrainSquare = /** @class */ (function () {\r\n    function TerrainSquare(w, pos, cost, name) {\r\n        if (cost === void 0) { cost = 10; }\r\n        this.walkable = w;\r\n        this.movementCost = cost;\r\n        this.diagonalMovementCost = Math.round(this.movementCost * 1.4);\r\n        this.squarePos = __assign({}, pos);\r\n        if (name)\r\n            this.terrainName = name;\r\n    }\r\n    TerrainSquare.prototype.setParentNode = function (parent) {\r\n        this.parentNode = parent;\r\n        this.moveShift = TerrainSquare.getMoveShift(this.parentNode, this);\r\n    };\r\n    TerrainSquare.prototype.getParentNode = function () {\r\n        return this.parentNode;\r\n    };\r\n    TerrainSquare.getMoveShift = function (start, end) {\r\n        var xShift = Math.abs(end.squarePos.x - start.squarePos.x);\r\n        var yShift = Math.abs(end.squarePos.y - start.squarePos.y);\r\n        return { y: yShift, x: xShift };\r\n    };\r\n    // returns move cost from start square to this square\r\n    TerrainSquare.prototype.getMoveCostTo = function (start) {\r\n        var move = TerrainSquare.getMoveShift(start, this);\r\n        if (move.x == 0 || move.y == 0)\r\n            return this.movementCost;\r\n        else\r\n            return this.diagonalMovementCost;\r\n    };\r\n    TerrainSquare.prototype.setF = function () {\r\n        this.F = this.G + this.H;\r\n    };\r\n    TerrainSquare.prototype.setG = function () {\r\n        // if( this.moveShift.x == 0 || this.moveShift.y == 0 )\r\n        //     this.G = this.parentNode.G + this.movementCost;\r\n        // else\r\n        //     this.G = this.parentNode.G + this.diagonalMovementCost;\r\n        // both s and y are zero maybe????\r\n        this.G = this.parentNode.G + ((this.moveShift.x == 0 || this.moveShift.y == 0) ? this.movementCost : this.diagonalMovementCost);\r\n    };\r\n    TerrainSquare.prototype.setH = function (target) {\r\n        var dist = Math.abs(target.squarePos.x - this.squarePos.x) + Math.abs(target.squarePos.y - this.squarePos.y);\r\n        this.H = dist * 10; // very, VERY rough estimation\r\n    };\r\n    return TerrainSquare;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/TerrainSquare.ts?");

/***/ }),

/***/ "./scripts/main.ts":
/*!*************************!*\
  !*** ./scripts/main.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TerrainSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerrainSquare */ \"./scripts/TerrainSquare.ts\");\n/* harmony import */ var _AStar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AStar */ \"./scripts/AStar.ts\");\n\r\n\r\n// let t : TerrainSquare = new TerrainSquare( true, { x: 0, y: 0 }, 16, \"plain\" );\r\n// document.write(JSON.stringify(t, null, 5));\r\nvar terrain = [];\r\nfor (var y = 0; y < 10; y++) {\r\n    // console.log( \"y: \" + y );\r\n    terrain[y] = [];\r\n    for (var x = 0; x < 10; x++) {\r\n        // console.log( \"x: \" + x );\r\n        terrain[y][x] = new _TerrainSquare__WEBPACK_IMPORTED_MODULE_0__.TerrainSquare(true, { y: y, x: x }, 10, \"plain\");\r\n    }\r\n}\r\nterrain[1][1].walkable = false;\r\nterrain[1][1].terrainName = \"wall\";\r\nterrain[1][2].walkable = false;\r\nterrain[1][2].terrainName = \"wall\";\r\nterrain[1][3].walkable = false;\r\nterrain[1][3].terrainName = \"wall\";\r\n// console.table(terrain[0]);\r\n// console.table(terrain[1]);\r\n// console.table(terrain[2]);\r\nconsole.table(terrain);\r\n// console.log( AStar.getSurrounding( terrain, { y: 2, x: 1 } ) );\r\nconsole.log(_AStar__WEBPACK_IMPORTED_MODULE_1__.AStar.findPath(terrain, terrain[0][0], terrain[9][9]));\r\n\n\n//# sourceURL=webpack:///./scripts/main.ts?");

/***/ })

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/main.ts");
/******/ 	
/******/ })()
;