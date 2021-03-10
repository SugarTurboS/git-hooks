var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
const { colorNoResetMap, isBrowser, reset, webColorMap } = require('./_private');
/**
 * Log out a message in a box
 *
 * @since v0.0.1
 * @param {LogBoxConfig} [config] - The configuration for the box
 * @returns {(...lines: Array<string | LogBoxLine>) => void}
 * @example
 * logBox()('I\'m in a box!');
 * @example
 * logBox({ color: 'magenta' })('I\'m in a magenta box!');
 * @example
 * logBox({ padding: 10, symbol: '-' })('I\'ve got 10 spaces of padding in a box with a symbol override!');
 * @example
 * // More complex
 * logBox({ color: 'green', indent: 4, bufferLines: true })(
 *   'This box is indented 4 spaces.',
 *   'It also has buffer lines above and below the content.',
 *   '',
 *   { color: 'red', message: 'I\'m red in a green box!' },
 *   { color: 'cyan', message: '...and I\'m cyan! '},
 * );
 * @docgen_types
 * export type LogBoxConfig = {
 *   color: Color,
 *   indent?: number,
 *   padding?: number,
 *   bufferLines?: boolean,
 *   symbol?: string,
 * };
 *
 * export type LogBoxLine = {
 *   color: Color,
 *   message: string,
 * };
 *
 * export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
 * @docgen_import
 * { logBox, LogBoxConfig, LogBoxLine, Color }
 */
var logBox = function (config) { return function () {
    var lines = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lines[_i] = arguments[_i];
    }
    var indent = typeof (config === null || config === void 0 ? void 0 : config.indent) === 'number' ? ' '.repeat(config.indent) : '';
    var padding = typeof (config === null || config === void 0 ? void 0 : config.padding) === 'number' ? config.padding : 2;
    var color = (config === null || config === void 0 ? void 0 : config.color) ? config.color : 'cyan';
    var symbol = (config === null || config === void 0 ? void 0 : config.symbol) && config.symbol.length > 0 ? config.symbol : undefined;
    var browser = isBrowser();
    var width = getTextWidth(lines);
    var output = __spreadArrays((browser ? [] : [colorNoResetMap.get(color)]), [
        getBorder('top', browser, indent, padding, width, symbol),
    ]);
    if (config === null || config === void 0 ? void 0 : config.bufferLines) {
        output = __spreadArrays(output, [getLine(browser, color, indent, padding, width, '', symbol)]);
    }
    for (var _a = 0, lines_1 = lines; _a < lines_1.length; _a++) {
        var line = lines_1[_a];
        output = __spreadArrays(output, [getLine(browser, color, indent, padding, width, line, symbol)]);
    }
    if (config === null || config === void 0 ? void 0 : config.bufferLines) {
        output = __spreadArrays(output, [getLine(browser, color, indent, padding, width, '', symbol)]);
    }
    output = __spreadArrays(output, [getBorder('bottom', browser, indent, padding, width, symbol)]);
    if (browser) {
        var lineColors = __spreadArrays(((config === null || config === void 0 ? void 0 : config.bufferLines) ? [webColorMap.get(color)] : []), lines.map(function (line) { return typeof line === 'string' ? webColorMap.get(color) : webColorMap.get(line.color); }), ((config === null || config === void 0 ? void 0 : config.bufferLines) ? [webColorMap.get(color)] : []));
        console.log.apply(console, __spreadArrays([output.join(''),
            webColorMap.get(color)], lineColors.reduce(function (accumulator, item) { return __spreadArrays(accumulator, [webColorMap.get(color), item, webColorMap.get(color)]); }, []), [webColorMap.get(color),
            'color: inherit;']));
        return;
    }
    console.log(output.join('') + reset);
}; };
var getTextWidth = function (lines) {
    var width = 0;
    lines.forEach(function (x) {
        if (typeof x === 'object' && x.message.length > width) {
            width = x.message.length;
        }
        else if (typeof x === 'string' && x.length > width) {
            width = x.length;
        }
    });
    return width;
};
var getBorder = function (bar, browser, indent, padding, width, symbol) {
    var _symbol = symbol ? symbol.substring(0, 1) : '─';
    var corners = {
        topLeft: symbol ? symbol.substring(0, 1) : '╭',
        topRight: symbol ? symbol.substring(0, 1) : '╮',
        bottomLeft: symbol ? symbol.substring(0, 1) : '╰',
        bottomRight: symbol ? symbol.substring(0, 1) : '╯',
    };
    var leftCorner = indent + (browser ? '%c' : '') + (bar === 'bottom' ? corners.bottomLeft : corners.topLeft);
    var center = _symbol.repeat(padding + width + padding);
    var rightCorner = (bar === 'bottom' ? corners.bottomRight + (browser ? '%c' : '') + '\n' : corners.topRight);
    return '\n' + leftCorner + center + rightCorner;
};
var getLine = function (browser, boxColor, indent, padding, width, line, symbol) {
    var message = typeof line === 'string' ? line : line.message;
    var _symbol = symbol ? symbol.substring(0, 1) : '│';
    var rightPadding = width > message.length ? width - message.length + padding : padding;
    var browserMarker = browser ? '%c' : '';
    var getPadding = function (padding) { return ' '.repeat(padding); };
    if (typeof line === 'object') {
        return '\n' + indent + browserMarker + _symbol + getPadding(padding) + (browser ? browserMarker : colorNoResetMap.get(line.color)) + message + (browser ? browserMarker : colorNoResetMap.get(boxColor)) + getPadding(rightPadding) + _symbol;
    }
    return '\n' + indent + browserMarker + _symbol + getPadding(padding) + browserMarker + message + browserMarker + getPadding(rightPadding) + _symbol;
};

module.exports = logBox;