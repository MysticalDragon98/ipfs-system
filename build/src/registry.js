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
exports.ContentRouter = void 0;
var ContentRouter = /** @class */ (function () {
    function ContentRouter(ipfs, routerDirs) {
        this.ipfs = ipfs;
        this.routerDirs = routerDirs;
        this.router = {};
    }
    ContentRouter.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, routerCID, routesPaths, router, _c, routesPaths_1, path, cid, normalizedRouter, _d, _e, _f, fieldName, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        this.router = {};
                        _a = [];
                        for (_b in this.routerDirs)
                            _a.push(_b);
                        _i = 0;
                        _k.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 13];
                        routerCID = _a[_i];
                        routesPaths = this.routerDirs[routerCID];
                        router = {};
                        _c = 0, routesPaths_1 = routesPaths;
                        _k.label = 2;
                    case 2:
                        if (!(_c < routesPaths_1.length)) return [3 /*break*/, 11];
                        path = routesPaths_1[_c];
                        cid = path;
                        if (!(typeof path !== "string")) return [3 /*break*/, 8];
                        normalizedRouter = {};
                        _d = [];
                        for (_e in path)
                            _d.push(_e);
                        _f = 0;
                        _k.label = 3;
                    case 3:
                        if (!(_f < _d.length)) return [3 /*break*/, 6];
                        fieldName = _d[_f];
                        _g = normalizedRouter;
                        _h = fieldName;
                        return [4 /*yield*/, this.publish(path[fieldName])];
                    case 4:
                        _g[_h] = _k.sent();
                        _k.label = 5;
                    case 5:
                        _f++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, this.publish(normalizedRouter)];
                    case 7:
                        cid = _k.sent();
                        _k.label = 8;
                    case 8:
                        _j = [__assign({}, router)];
                        return [4 /*yield*/, this.get(cid)];
                    case 9:
                        router = __assign.apply(void 0, _j.concat([(_k.sent())]));
                        _k.label = 10;
                    case 10:
                        _c++;
                        return [3 /*break*/, 2];
                    case 11:
                        this.router[routerCID] = router;
                        _k.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 1];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ContentRouter.prototype.getIPFSCIDFromPath = function (path) {
        if (typeof path !== "string")
            throw new Error("Invalid path format, expected string, received: " + typeof path);
        if (!path)
            return null;
        if (!path.includes("::"))
            return path;
        var head = path.substring(0, path.indexOf("::"));
        var cid = path.substring(path.indexOf("::") + 2);
        if (!this.router[head])
            throw new Error("No router found: " + head + "::*");
        if (!this.router[head][cid])
            return null;
        return this.getIPFSCIDFromPath(this.router[head][cid]);
    };
    ContentRouter.prototype.get = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var cid, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cid = this.getIPFSCIDFromPath(path);
                        if (!cid)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.ipfs.get(cid)];
                    case 1:
                        result = _a.sent();
                        //TODO: VERIFY SIGNATURE
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentRouter.prototype.resolve = function (path, fieldsToExpand) {
        if (fieldsToExpand === void 0) { fieldsToExpand = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, _loop_1, this_1, _a, _b, _i, fieldName;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.get(path)];
                    case 1:
                        data = _c.sent();
                        if (!data)
                            return [2 /*return*/, null];
                        if (fieldsToExpand === true || fieldsToExpand === 1)
                            return [2 /*return*/, data];
                        if (fieldsToExpand === false || fieldsToExpand === null || fieldsToExpand === 0)
                            return [2 /*return*/, null];
                        _loop_1 = function (fieldName) {
                            var fieldData, _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        fieldData = data[fieldName];
                                        if (!fieldData)
                                            return [2 /*return*/, "continue"];
                                        if (!Array.isArray(fieldData)) return [3 /*break*/, 2];
                                        _a = data;
                                        _b = fieldName;
                                        return [4 /*yield*/, Promise.all(fieldData
                                                .map(function (v) { return _this.resolve(v, fieldsToExpand[fieldName]); }))];
                                    case 1:
                                        _a[_b] = _e.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        _c = data;
                                        _d = fieldName;
                                        return [4 /*yield*/, this_1.resolve(fieldData, fieldsToExpand[fieldName])];
                                    case 3:
                                        _c[_d] = _e.sent();
                                        _e.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in fieldsToExpand)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        fieldName = _a[_i];
                        return [5 /*yield**/, _loop_1(fieldName)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, data];
                }
            });
        });
    };
    ContentRouter.prototype.publish = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipfs.add(payload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ContentRouter;
}());
exports.ContentRouter = ContentRouter;
//# sourceMappingURL=registry.js.map