import MarkdownIt from "markdown-it";
import highlight from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-light.min.css'
import './style.css'
import testtt from './1';
const markdownit = new MarkdownIt({
    html: true, highlight: function (str, lang) {
        if (!lang) {
            lang = `cmd`
        }
        if (lang && highlight.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    highlight.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (e) { console.error(e);return str; }
        }
        else {
            return str;
        }
    }
}).
use(testtt);
function render(value: string, renderBlock?: (string | Element)[]) {
    // console.log(value);
    const res = markdownit.render(value);
    const realRenderBlock:Element[] = [];

    for(let now of renderBlock??[])
    {
        if(typeof now === `string`)
        {
            const elem = document.querySelector(now);
            if(elem)
            {
                realRenderBlock.push(elem);
            }
            else
            {
                console.log(`null`)
            }
        }
        else
        {
            realRenderBlock.push(now as Element);
        }
    }
    return res;
}
export { markdownit, render }