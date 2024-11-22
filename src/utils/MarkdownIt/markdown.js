"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownit = void 0;
exports.render = render;
var markdown_it_1 = __importDefault(require("markdown-it"));
var highlight_js_1 = __importDefault(require("highlight.js"));
require("highlight.js/styles/atom-one-light.min.css");
var markdown_it_mathjax3_1 = __importDefault(require("markdown-it-mathjax3"));
require("./style.css");
var markdownit = new markdown_it_1.default({
    html: true, highlight: function (str, lang) {
        if (!lang) {
            lang = "cmd";
        }
        if (lang && highlight_js_1.default.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    highlight_js_1.default.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            }
            catch (__) {
                return str;
            }
        }
        else {
            return str;
        }
    }
}).use(markdown_it_mathjax3_1.default);
exports.markdownit = markdownit;
function render(value, _timer, renderBlock) {
    if (_timer === void 0) { _timer = 200; }
    var res = markdownit.render(value);
    var realRenderBlock = [];
    for (var _i = 0, _a = renderBlock !== null && renderBlock !== void 0 ? renderBlock : []; _i < _a.length; _i++) {
        var now = _a[_i];
        if (typeof now === "string") {
            var elem = document.querySelector(now);
            if (elem) {
                realRenderBlock.push(elem);
            }
            else {
                console.log("null");
            }
        }
        else {
            realRenderBlock.push(now);
        }
    }
    return res;
}
