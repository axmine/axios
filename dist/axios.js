"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = exports.ConfigType = exports.ConfigOptionType = exports.ResponseType = exports.ResultType = exports.OptionType = exports.ErrorMessageType = exports.ResultKeysType = void 0;
var axios_1 = require("axios");
var Qs = require("qs");
function getType(data) { return Object.prototype.toString.call(data).slice(8, -1).toLowerCase(); }
var ResultKeysType = (function () {
    function ResultKeysType() {
    }
    return ResultKeysType;
}());
exports.ResultKeysType = ResultKeysType;
var ErrorMessageType = (function () {
    function ErrorMessageType() {
    }
    return ErrorMessageType;
}());
exports.ErrorMessageType = ErrorMessageType;
var OptionType = (function () {
    function OptionType() {
    }
    return OptionType;
}());
exports.OptionType = OptionType;
var ResultType = (function () {
    function ResultType() {
    }
    return ResultType;
}());
exports.ResultType = ResultType;
var ResponseType = (function () {
    function ResponseType() {
    }
    return ResponseType;
}());
exports.ResponseType = ResponseType;
var ConfigOptionType = (function () {
    function ConfigOptionType() {
    }
    return ConfigOptionType;
}());
exports.ConfigOptionType = ConfigOptionType;
var ConfigType = (function () {
    function ConfigType() {
    }
    return ConfigType;
}());
exports.ConfigType = ConfigType;
var errorMessage = {
    400: '请求发生错误，请联系工程师（400）',
    401: '登陆信息失效，请重新登录（401）',
    402: '您的登录信息已过期（402）',
    403: '你没有足够的权限访问该资源（403）',
    404: '请求的资源不存在（404）',
    405: '服务器拒绝了你的请求（405）',
    500: '请求错误，请联系工程师（500）',
    501: '请求异常，请联系工程师（501）',
    502: '数据异常，请联系工程师（502）',
    503: '服务繁忙，请稍候再试（503）',
    504: '连接超时，请稍候再试（504）',
    505: '不受支持的请求，请联系工程师（505）'
};
var Axios = (function () {
    function Axios(option) {
        this.resultData = { code: 0, result: {}, message: '' };
        this.initOptionData = {
            useJson: true,
            formatKeys: { code: 'code', result: 'result', message: 'message' },
            successCode: [],
            baseURL: '/',
            timeout: 10000,
            errorMessage: errorMessage
        };
        Object.assign(this.initOptionData, option);
        this.responseData = {
            status: 200,
            statusText: 'ok',
            headers: {},
            data: this.resultData
        };
        var transform = this.initOptionData.useJson ? {} : {
            transformRequest: [function (data) {
                    return Qs.stringify(data);
                }]
        };
        var _a = this.initOptionData, baseURL = _a.baseURL, timeout = _a.timeout;
        this.http = axios_1.default.create(Object.assign({ baseURL: baseURL, timeout: timeout }, transform));
        this.setInterceptor();
    }
    Axios.prototype.request = function (url, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            var responseData, post, mArrs, confMethod, method, query, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseData = this.getResponseData();
                        post = ['post', 'put', 'patch'];
                        mArrs = post.concat(['get', 'delete', 'head', 'options']);
                        confMethod = (config === null || config === void 0 ? void 0 : config.method) || 'get';
                        method = mArrs.includes(confMethod) ? confMethod : 'get';
                        query = post.includes(method) ? { data: data } : { params: data };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http(__assign({ url: url,
                                method: method }, Object.assign(query, config.option)))];
                    case 2:
                        response = _a.sent();
                        Object.assign(responseData, {
                            data: response.data,
                            headers: response.headers,
                            status: response.status,
                            statusText: response.statusText,
                            config: response.config
                        });
                        return [2, responseData];
                    case 3:
                        error_1 = _a.sent();
                        return [2, error_1];
                    case 4: return [2];
                }
            });
        });
    };
    Axios.prototype.getResponseData = function () { return this.responseData; };
    Axios.prototype.getResultData = function () { return this.resultData; };
    Axios.prototype.transformResponseData = function (response, type) {
        if (type === void 0) { type = 'success'; }
        var resultData = this.getResultData();
        var responseData = this.getResponseData();
        Object.assign(responseData, {
            status: (response === null || response === void 0 ? void 0 : response.status) || 500,
            headers: (response === null || response === void 0 ? void 0 : response.headers) || {},
            statusText: (response === null || response === void 0 ? void 0 : response.statusText) || ''
        });
        var data = response.data;
        if (data) {
            var code = responseData.status;
            var message = this.initOptionData.errorMessage[responseData.status] || '请求发生错误，请联系工程师' + ("(" + responseData.status + ")");
            var result = {};
            if (getType(data) === 'object') {
                var k = this.initOptionData.formatKeys;
                code = response.data[k.code];
                code = isNaN(code) ? -1 : code * 1;
                result = response.data[k.result] || {};
                message = response.data[k.message] || '';
            }
            else {
                responseData.status = 502;
                code = -1;
                result = { error: data };
                message = type === 'success' ? '响应错误，未获取预期数据' : message;
            }
            Object.assign(resultData, { code: code, result: result, message: message });
        }
        else {
            responseData.status = 502;
            resultData.code = -1;
            resultData.result = { error: data };
            resultData.message = "\u54CD\u5E94\u9519\u8BEF\uFF0C\u672A\u83B7\u53D6\u9884\u671F\u6570\u636E(" + responseData.status + ")";
        }
        responseData.data = resultData;
        return responseData;
    };
    Axios.prototype.setInterceptor = function () {
        var _this = this;
        this.http.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            var res = _this.getResponseData();
            res.status = 501;
            res.statusText = JSON.stringify(error);
            res.data.message = _this.initOptionData.errorMessage[res.status] || "\u53D1\u8D77\u8BF7\u6C42\u51FA\u9519\u4E86 \uFF08" + res.status + "\uFF09";
            return Promise.reject(res);
        });
        this.http.interceptors.response.use(function (response) {
            var responseData = _this.transformResponseData(response);
            return Object.assign(response, responseData);
        }, function (error) {
            var response = error.response;
            var responseData = _this.getResponseData();
            if (response) {
                Object.assign(responseData, _this.transformResponseData(response, 'error'));
            }
            else {
                var statusText = JSON.stringify(error) || '';
                var status_1 = statusText.indexOf('timeout') > -1 ? 504 : 501;
                if (statusText.indexOf('network error') > -1) {
                    status_1 = 504;
                }
                Object.assign(responseData, {
                    status: status_1,
                    statusText: statusText,
                    headers: (error === null || error === void 0 ? void 0 : error.headers) || {},
                    data: {
                        code: -1,
                        result: {},
                        message: _this.initOptionData.errorMessage[status_1]
                    }
                });
            }
            responseData.config = (error === null || error === void 0 ? void 0 : error.config) || {};
            return Promise.reject(responseData);
        });
    };
    return Axios;
}());
exports.Axios = Axios;
