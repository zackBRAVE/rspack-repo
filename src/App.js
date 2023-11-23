"use strict";
exports.__esModule = true;
exports.App = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
require("./render.css");
function App() {
    return (<div>
      <div>This is Header</div>
      <div>
        <antd_1.Typography>This is Content</antd_1.Typography>
        <p className="text">this is a text</p>
        <antd_1.Button onClick={function () { return alert("test"); }}>Button</antd_1.Button>
      </div>
      <div>This is Footer</div>
    </div>);
}
exports.App = App;
