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
var binary_tree_1 = require("./binary-tree");
var AVLTree = /** @class */ (function (_super) {
    __extends(AVLTree, _super);
    function AVLTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AVLTree.prototype.add = function (node) {
        if (this.root === null) {
            this.root = node;
            return;
        }
        this.addNode(this.root, node);
        this.checkBalanceFactor(this.findNode(this.root, node));
    };
    AVLTree.prototype.checkBalanceFactor = function (node) {
        if (node.equal(this.root)) {
            this.fixUnbalanceDomain(node);
            return;
        }
        this.fixUnbalanceDomain(node);
        this.checkBalanceFactor(node.parent);
    };
    AVLTree.prototype.fixUnbalanceDomain = function (node) {
        var heightLeft = this.findHeight(node.left, 1);
        var heightRight = this.findHeight(node.right, 1);
        if (Math.abs(heightLeft - heightRight) > 1) {
            if (heightLeft > heightRight) {
                var heightLeftChild = this.findHeight(node.left.left, 1);
                var heightRightChild = this.findHeight(node.left.right, 1);
                if (heightLeftChild > heightRightChild) {
                    this.rightRotation(node);
                }
                else {
                    this.leftRightRotation(node);
                }
            }
            else {
                var heightLeftChild = this.findHeight(node.right.left, 1);
                var heightRightChild = this.findHeight(node.right.right, 1);
                if (heightLeftChild > heightRightChild) {
                    this.rightLeftRotation(node);
                }
                else {
                    this.leftRotation(node);
                }
            }
        }
    };
    AVLTree.prototype.findHeight = function (node, height) {
        if (node === null) {
            return height - 1;
        }
        var left = this.findHeight(node.left, height + 1);
        var right = this.findHeight(node.right, height + 1);
        return left >= right ? left : right;
    };
    AVLTree.prototype.rightRotation = function (node) {
        var _a;
        if (node.equal(this.root)) {
            this.root = node.left;
        }
        if (node.parent !== null) {
            if ((_a = node.parent.left) === null || _a === void 0 ? void 0 : _a.equal(node)) {
                node.parent.left = node.left;
            }
            else {
                node.parent.right = node.left;
            }
        }
        node.left.parent = node.parent;
        node.parent = node.left;
        node.left = node.left.right;
        if (node.left !== null) {
            node.left.parent = node;
        }
        node.parent.right = node;
    };
    AVLTree.prototype.leftRotation = function (node) {
        var _a;
        if (node.equal(this.root)) {
            this.root = node.right;
        }
        if (node.parent !== null) {
            if ((_a = node.parent.left) === null || _a === void 0 ? void 0 : _a.equal(node)) {
                node.parent.left = node.right;
            }
            else {
                node.parent.right = node.right;
            }
        }
        node.right.parent = node.parent;
        node.parent = node.right;
        node.right = node.right.left;
        if (node.right !== null) {
            node.right.parent = node;
        }
        node.parent.left = node;
    };
    AVLTree.prototype.leftRightRotation = function (node) {
        this.leftRotation(node.left);
        this.rightRotation(node);
    };
    AVLTree.prototype.rightLeftRotation = function (node) {
        this.rightRotation(node.right);
        this.leftRotation(node);
    };
    AVLTree.prototype.checkAllNodes = function (currentNode) {
        if (currentNode === null)
            return;
        this.checkAllNodes(currentNode.left);
        this.checkAllNodes(currentNode.right);
        this.checkBalanceFactor(currentNode);
    };
    AVLTree.prototype.delete = function (node) {
        this.deleteNode(node);
        this.checkAllNodes(this.root);
    };
    return AVLTree;
}(binary_tree_1.default));
exports.default = AVLTree;
