
// const { default: MarkdownIt } = require('markdown-it');

import MarkdownIt from "markdown-it";
import katex from 'katex'
import { StateBlock, StateInline, Token } from "markdown-it/index.js";

function isValidDelim(state: StateInline, pos: number) {
    var prevChar: number, nextChar: number,
        max = state.posMax,
        can_open = true,
        can_close = true;

    prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

    // Check non-whitespace conditions for opening and closing, and
    // check that closing delimeter isn't followed by a number
    if (prevChar === 0x20/* " " */ || prevChar === 0x09/* \t */ ||
        (nextChar >= 0x30/* "0" */ && nextChar <= 0x39/* "9" */)) {
        can_close = false;
    }
    if (nextChar === 0x20/* " " */ || nextChar === 0x09/* \t */) {
        can_open = false;
    }

    return {
        can_open: can_open,
        can_close: can_close
    };
}

function math_inline(state: StateInline, silent: boolean):boolean {

    if (state.src[state.pos] !== "$" && (state.src[state.pos] !== `\\` || state.src[state.pos + 1] !== `(`)) { return false; }
    console.log(state.src[state.pos] + state.src[state.pos + 1]);
    let type = state.src[state.pos] === `$`;
    let res = isValidDelim(state, state.pos);
    if (!res.can_open) {
        if (!silent) {
            if (!type)
                state.pending += "\(";
            else
                state.pending += "$";
        }
        state.pos += 1 + (state.src[state.pos] === `\\` ? 1 : 0);
        return true;
    }

    // First check for and bypass all properly escaped delimieters
    // This loop will assume that the first leading backtick can not
    // be the first character in state.src, which is known since
    // we have found an opening delimieter already.
    const start = state.pos + 1 + (state.src[state.pos] === `\\` ? 1 : 0);
    let match = start;
    if (type) {
        while ((match = state.src.indexOf("$", match)) !== -1) {
            // Found potential $, look for escapes, pos will point to
            // first non escape when complete
            let pos = match - 1;
            while (state.src[pos] === "\\") { pos -= 1; }

            // Even number of escapes, potential closing delimiter found
            if (((match - pos) % 2) == 1) { break; }
            match += 1;
        }
    }
    else {
        while ((match = state.src.indexOf("\\)", match)) !== -1) {
            // Found potential $, look for escapes, pos will point to
            // first non escape when complete
            let pos = match - 1;
            while (state.src[pos] === "\\") { pos -= 1; }

            // Even number of escapes, potential closing delimiter found
            if (((match - pos) % 2) == 1) { break; }
            match += 1;
        }
        // match has to byte.

    }
    // No closing delimter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent) { state.pending += type ? "$" : "\\("; }
        state.pos = start;
        return true;
    }

    // Check if we have empty content, ie: $$.  Do not parse.
    if (match - start === 0) {
        if (!silent) { state.pending += type ? "$$" : "\\(\\)"; }
        state.pos = start + 1;
        return true;
    }

    // Check for valid closing delimiter
    res = isValidDelim(state, match + (type ? 0 : 1));
    if (!res.can_close) {
        if (!silent) { state.pending += type ? "$" : "\\("; }
        state.pos = start;
        return true;
    }

    if (!silent) {
        const token = state.push('math_inline', 'math', 0);
        token.markup = type ? "$" : "\\)";
        token.content = state.src.slice(start, match);
    }
    if (!type) {
        ++match;
    }
    state.pos = match + 1;
    return true;
}
function math_block(state: StateBlock, start: number, end: number, silent: boolean) {
    var firstLine, lastLine, next, lastPos, found = false, token,
        pos = state.bMarks[start] + state.tShift[start],
        max = state.eMarks[start]

    if (pos + 2 > max) { return false; }
    if (state.src.slice(pos, pos + 2) !== '$$' && state.src.slice(pos, pos + 2) !== '\\[') { return false; }
    const type = state.src.slice(pos, pos + 2) === '$$';
    pos += 2;
    firstLine = state.src.slice(pos, max);

    if (silent) { return true; }
    if (firstLine.trim().slice(-2) === '$$' || firstLine.trim().slice(-2) === '\\]') {
        // Single line expression
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
    }

    for (next = start; !found;) {

        next++;

        if (next >= end) { break; }

        pos = state.bMarks[next] + state.tShift[next];
        max = state.eMarks[next];

        if (pos < max && state.tShift[next] < state.blkIndent) {
            // non-empty line with negative indent should stop the list:
            break;
        }

        if (state.src.slice(pos, max).trim().slice(-2) === '$$' || state.src.slice(pos, max).trim().slice(-2) === '\\]'){
            lastPos = state.src.slice(0, max).lastIndexOf(type?'$$':'\\]');
            lastLine = state.src.slice(pos, lastPos);
            found = true;
        }

    }

    state.line = next + 1;

    token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '')
        + state.getLines(start + 1, next, state.tShift[start], true)
        + (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [start, state.line];
    token.markup = type? '$$': '\\]';
    return true;
}

/**
 * 
 * @param {MarkdownIt} md 
 * @param {*} options 
 */

export default function math_plugin(md: MarkdownIt, options: { displayMode?: any; throwOnError?: any; }) {
    // Default options
    options = options || {};
    const katexInline = function (latex: string) {
        options.displayMode = false;
        try {
            return katex.renderToString(latex, options);
        }
        catch (error) {
            console.log(error);
            if (options.throwOnError) { console.log(error); }
            return `<span class='katex-error' >${(latex)}</span>`;
        }
    };

    const inlineRenderer = function (tokens: Token[], idx: number) {
        return katexInline(tokens[idx].content);
    };
    const katexBlock = (latex:string)=>{
        options.displayMode = true;
        try {
            return katex.renderToString(latex, options);
        }
        catch (error) {
            console.log(error);
            if (options.throwOnError) { console.log(error); }
            return `<span class='katex-error' >${(latex)}</span>`;
        }
    }
    const blockRenderer = function (tokens: Token[], idx: number) {
        return katexBlock(tokens[idx].content);
    };
    // set KaTeX as the renderer for markdown-it-simplemath
    md.inline.ruler.before(`escape`, 'math_inline', math_inline);
    md.block.ruler.before(`code`, 'math_block', math_block, { alt: [
        'paragraph', 'reference', 'blockquote', 'list'
    ] });
    md.renderer.rules.math_inline = inlineRenderer;
    md.renderer.rules.math_block = blockRenderer;
};
