"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentHost = void 0;
var locationHost = {
    hostname: 'localhost',
    baseApiIp: 'http://10.30.10.54:10001',
    baseApi: 'http://10.30.10.54:10001/api'
};
var hostList = [
    locationHost
];
/**
 *  获取当前服务的 host 前缀
 */
exports.currentHost = hostList.find(function (hostItem) {
    return window.location.hostname === hostItem.hostname;
}) || locationHost;
