System.register(["react", "react-dom"], function (exports_1, context_1) {
    "use strict";
    var react_1, react_dom_1, Greetings;
    var __moduleName = context_1 && context_1.id;
    function main() {
        react_dom_1.default.render(react_1.default.createElement(Greetings, { name: 'world' }), document.querySelector('#root'));
    }
    exports_1("main", main);
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            }
        ],
        execute: function () {
            Greetings = class Greetings extends react_1.default.Component {
                render() {
                    return react_1.default.createElement("h1", null,
                        "Hello ",
                        this.props.name,
                        "!");
                }
            };
        }
    };
});
