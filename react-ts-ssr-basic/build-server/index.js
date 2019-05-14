"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const App_1 = require("./App");
require("./index.css");
require("./App.css");
const registerServiceWorker_1 = require("./registerServiceWorker");
ReactDOM.render(React.createElement(App_1.default, null), document.getElementById('root'));
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map