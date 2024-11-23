import MarkdownIt from "markdown-it";
import highlight from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-light.min.css'
import katex from '@iktakahiro/markdown-it-katex'
import './style.css'
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
            } catch (__) { return str }
        }
        else {
            return str;
        }
    }
}).use(katex)
function render(value: string, _timer: number = 200, renderBlock?: any[]) {
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