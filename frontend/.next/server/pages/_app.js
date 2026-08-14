/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    // Initialize auth state from localStorage\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const storedToken = localStorage.getItem(\"token\");\n        const storedUser = localStorage.getItem(\"user\");\n        if (storedToken && storedUser) {\n            setToken(storedToken);\n            setUser(JSON.parse(storedUser));\n        }\n        setLoading(false);\n    }, []);\n    const login = (token, userData)=>{\n        setToken(token);\n        setUser(userData);\n        localStorage.setItem(\"token\", token);\n        localStorage.setItem(\"user\", JSON.stringify(userData));\n    };\n    const logout = ()=>{\n        setToken(null);\n        setUser(null);\n        localStorage.removeItem(\"token\");\n        localStorage.removeItem(\"user\");\n    };\n    const updateUser = (userData)=>{\n        setUser(userData);\n        localStorage.setItem(\"user\", JSON.stringify(userData));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            token,\n            loading,\n            login,\n            logout,\n            updateUser\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\bishat\\\\OneDrive\\\\Desktop\\\\resume-matcher\\\\frontend\\\\context\\\\AuthContext.js\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, undefined);\n};\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (!context) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0F1dGhDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUU7QUFFdkUsTUFBTUksNEJBQWNKLG9EQUFhQTtBQUUxQixNQUFNSyxlQUFlLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNPLE9BQU9DLFNBQVMsR0FBR1IsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDUyxTQUFTQyxXQUFXLEdBQUdWLCtDQUFRQSxDQUFDO0lBRXZDLDBDQUEwQztJQUMxQ0MsZ0RBQVNBLENBQUM7UUFDUixNQUFNVSxjQUFjQyxhQUFhQyxPQUFPLENBQUM7UUFDekMsTUFBTUMsYUFBYUYsYUFBYUMsT0FBTyxDQUFDO1FBRXhDLElBQUlGLGVBQWVHLFlBQVk7WUFDN0JOLFNBQVNHO1lBQ1RMLFFBQVFTLEtBQUtDLEtBQUssQ0FBQ0Y7UUFDckI7UUFDQUosV0FBVztJQUNiLEdBQUcsRUFBRTtJQUVMLE1BQU1PLFFBQVEsQ0FBQ1YsT0FBT1c7UUFDcEJWLFNBQVNEO1FBQ1RELFFBQVFZO1FBQ1JOLGFBQWFPLE9BQU8sQ0FBQyxTQUFTWjtRQUM5QkssYUFBYU8sT0FBTyxDQUFDLFFBQVFKLEtBQUtLLFNBQVMsQ0FBQ0Y7SUFDOUM7SUFFQSxNQUFNRyxTQUFTO1FBQ2JiLFNBQVM7UUFDVEYsUUFBUTtRQUNSTSxhQUFhVSxVQUFVLENBQUM7UUFDeEJWLGFBQWFVLFVBQVUsQ0FBQztJQUMxQjtJQUVBLE1BQU1DLGFBQWEsQ0FBQ0w7UUFDbEJaLFFBQVFZO1FBQ1JOLGFBQWFPLE9BQU8sQ0FBQyxRQUFRSixLQUFLSyxTQUFTLENBQUNGO0lBQzlDO0lBRUEscUJBQ0UsOERBQUNoQixZQUFZc0IsUUFBUTtRQUFDQyxPQUFPO1lBQUVwQjtZQUFNRTtZQUFPRTtZQUFTUTtZQUFPSTtZQUFRRTtRQUFXO2tCQUM1RW5COzs7Ozs7QUFHUCxFQUFFO0FBRUssTUFBTXNCLFVBQVU7SUFDckIsTUFBTUMsVUFBVTVCLGlEQUFVQSxDQUFDRztJQUMzQixJQUFJLENBQUN5QixTQUFTO1FBQ1osTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdW1lLW1hdGNoZXItZnJvbnRlbmQvLi9jb250ZXh0L0F1dGhDb250ZXh0LmpzPzEzOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbdG9rZW4sIHNldFRva2VuXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICAvLyBJbml0aWFsaXplIGF1dGggc3RhdGUgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xyXG5cclxuICAgIGlmIChzdG9yZWRUb2tlbiAmJiBzdG9yZWRVc2VyKSB7XHJcbiAgICAgIHNldFRva2VuKHN0b3JlZFRva2VuKTtcclxuICAgICAgc2V0VXNlcihKU09OLnBhcnNlKHN0b3JlZFVzZXIpKTtcclxuICAgIH1cclxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbG9naW4gPSAodG9rZW4sIHVzZXJEYXRhKSA9PiB7XHJcbiAgICBzZXRUb2tlbih0b2tlbik7XHJcbiAgICBzZXRVc2VyKHVzZXJEYXRhKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHRva2VuKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XHJcbiAgICBzZXRUb2tlbihudWxsKTtcclxuICAgIHNldFVzZXIobnVsbCk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdXBkYXRlVXNlciA9ICh1c2VyRGF0YSkgPT4ge1xyXG4gICAgc2V0VXNlcih1c2VyRGF0YSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCB0b2tlbiwgbG9hZGluZywgbG9naW4sIGxvZ291dCwgdXBkYXRlVXNlciB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xyXG4gIGlmICghY29udGV4dCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJyk7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59O1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkF1dGhDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsInRva2VuIiwic2V0VG9rZW4iLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInN0b3JlZFRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0b3JlZFVzZXIiLCJKU09OIiwicGFyc2UiLCJsb2dpbiIsInVzZXJEYXRhIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJ1cGRhdGVVc2VyIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUF1dGgiLCJjb250ZXh0IiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/AuthContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/AuthContext */ \"./context/AuthContext.js\");\n\n\n\n\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (true) return;\n        const savedTheme = localStorage.getItem(\"theme\");\n        const prefersDark = window.matchMedia(\"(prefers-color-scheme: dark)\").matches;\n        const currentTheme = savedTheme || (prefersDark ? \"dark\" : \"light\");\n        document.documentElement.classList.toggle(\"dark\", currentTheme === \"dark\");\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bishat\\\\OneDrive\\\\Desktop\\\\resume-matcher\\\\frontend\\\\pages\\\\_app.js\",\n            lineNumber: 18,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\bishat\\\\OneDrive\\\\Desktop\\\\resume-matcher\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFrQztBQUNIO0FBQ3VCO0FBRXZDLFNBQVNFLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbERKLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxJQUE2QixFQUFFO1FBRW5DLE1BQU1LLGFBQWFDLGFBQWFDLE9BQU8sQ0FBQztRQUN4QyxNQUFNQyxjQUFjQyxPQUFPQyxVQUFVLENBQUMsZ0NBQWdDQyxPQUFPO1FBQzdFLE1BQU1DLGVBQWVQLGNBQWVHLENBQUFBLGNBQWMsU0FBUyxPQUFNO1FBRWpFSyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVFKLGlCQUFpQjtJQUNyRSxHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ1gsOERBQVlBO2tCQUNYLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdW1lLW1hdGNoZXItZnJvbnRlbmQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0L0F1dGhDb250ZXh0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2F2ZWRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGhlbWVcIik7XG4gICAgY29uc3QgcHJlZmVyc0RhcmsgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcztcbiAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBzYXZlZFRoZW1lIHx8IChwcmVmZXJzRGFyayA/IFwiZGFya1wiIDogXCJsaWdodFwiKTtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiLCBjdXJyZW50VGhlbWUgPT09IFwiZGFya1wiKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJBdXRoUHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJzYXZlZFRoZW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInByZWZlcnNEYXJrIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJjdXJyZW50VGhlbWUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();