"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLORS = void 0;
var node_1 = require("./types/node");
exports.COLORS = {
    red: "RED",
    black: "BLACK",
    double_black: "DOUBLE BLACK",
};
var RBNode = /** @class */ (function (_super) {
    __extends(RBNode, _super);
    function RBNode(data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this._parent = null;
        _this._right = null;
        _this._left = null;
        _this._data = data;
        _this._color = exports.COLORS.red;
        return _this;
    }
    Object.defineProperty(RBNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (node) {
            this._parent = node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RBNode.prototype, "left", {
        get: function () {
            return this._left;
        },
        set: function (node) {
            this._left = node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RBNode.prototype, "right", {
        get: function () {
            return this._right;
        },
        set: function (node) {
            this._right = node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RBNode.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RBNode.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
        },
        enumerable: false,
        configurable: true
    });
    RBNode.prototype.colorFlip = function () {
        this._color = this._color === exports.COLORS.red ? exports.COLORS.black : exports.COLORS.red;
    };
    RBNode.prototype.clone = function () {
        var newNode = new RBNode(this.data);
        newNode._parent = this._parent;
        newNode._left = this._left;
        newNode._right = this._right;
        newNode._color = this._color;
        return newNode;
    };
    RBNode.prototype.equal = function (node) {
        return node !== null ? this._data === node._data : false;
    };
    RBNode.prototype.compare = function (node) {
        if (this._data > node._data) {
            return 1;
        }
        else if (this._data < node._data) {
            return -1;
        }
        else {
            return 0;
        }
    };
    RBNode.prototype.copy = function (node) {
        this._data = node._data;
    };
    RBNode.prototype.content = function () {
        return this._data;
    };
    return RBNode;
}(node_1.INode));
exports.default = RBNode;
