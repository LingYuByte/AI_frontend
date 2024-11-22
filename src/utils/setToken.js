"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = setToken;
exports.getToken = getToken;
exports.removeToken = removeToken;
function setToken(tokenKey, token) {
    return localStorage.setItem(tokenKey, token);
}
function getToken(tokenKey) {
    return localStorage.getItem(tokenKey);
}
function removeToken(tokenKey) {
    return localStorage.removeItem(tokenKey);
}
