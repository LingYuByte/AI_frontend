"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isRegExp = isRegExp;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isBigInt = isBigInt;
exports.isNumberical = isNumberical;
var originToString = Object.prototype.toString;
function isFunction(obj) {
    return typeof (obj) === 'function';
}
function isObject(obj) {
    return obj === Object(obj);
}
function isArray(obj) {
    return originToString.call(obj) === '[object Array]';
}
function isDate(obj) {
    return originToString.call(obj) === '[object Date]';
}
function isRegExp(obj) {
    return originToString.call(obj) === '[object RegExp]';
}
function isBoolean(obj) {
    return originToString.call(obj) === '[object Boolean]';
}
function isString(obj) {
    return originToString.call(obj) === '[object String]';
}
function isUndefined(obj) {
    return originToString.call(obj) === '[object Undefined]';
}
function isNull(obj) {
    return originToString.call(obj) === '[object Null]';
}
function isBigInt(obj) {
    return originToString.call(obj) === '[object BigInt]';
}
function isNumberical(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}
