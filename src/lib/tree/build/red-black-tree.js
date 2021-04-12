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
var red_black_node_1 = require("./red-black-node");
var RBTree = /** @class */ (function (_super) {
    __extends(RBTree, _super);
    function RBTree() {
        var _this = _super.call(this) || this;
        _this.root = null;
        return _this;
    }
    RBTree.prototype.add = function (node) {
        if (this.root === null) {
            this.root = node;
            this.root.color = red_black_node_1.COLORS.black;
            return;
        }
        this.addNode(this.root, node);
        this.balanceTreeAfterInsertion(this.findNode(this.root, node));
    };
    RBTree.prototype.balanceTreeAfterInsertion = function (node) {
        if (node.equal(this.root)) {
            return;
        }
        var nodeGrandparent = node.parent.parent;
        this.balanceSubTreeAfterInsertion(node);
        if (nodeGrandparent !== null)
            this.balanceTreeAfterInsertion(nodeGrandparent);
        this.root.color = red_black_node_1.COLORS.black;
    };
    RBTree.prototype.balanceSubTreeAfterInsertion = function (node) {
        var _a;
        if (node.equal(this.root)) {
            this.root.color = red_black_node_1.COLORS.black;
            return;
        }
        if (node.parent.color === node.color && node.parent.parent !== null) {
            if ((_a = node.parent.parent.left) === null || _a === void 0 ? void 0 : _a.equal(node.parent)) {
                if (node.parent.parent.right !== null &&
                    node.parent.parent.right.color === red_black_node_1.COLORS.red) {
                    this.recolor(node);
                }
                else {
                    this.rotateSubtree(node);
                }
            }
            else {
                if (node.parent.parent.left !== null &&
                    node.parent.parent.left.color === red_black_node_1.COLORS.red) {
                    this.recolor(node);
                }
                else {
                    this.rotateSubtree(node);
                }
            }
        }
    };
    RBTree.prototype.recolor = function (node) {
        var _a;
        if ((_a = node.parent.parent) === null || _a === void 0 ? void 0 : _a.left.equal(node.parent)) {
            if (node.parent.parent.right !== null) {
                node.parent.parent.right.color = red_black_node_1.COLORS.black;
            }
        }
        else {
            if (node.parent.parent.left !== null) {
                node.parent.parent.left.color = red_black_node_1.COLORS.black;
            }
        }
        node.parent.color = red_black_node_1.COLORS.black;
        node.parent.parent.color = red_black_node_1.COLORS.red;
    };
    RBTree.prototype.rotateSubtree = function (node, deletion) {
        var _a, _b, _c, _d, _e;
        if (deletion === void 0) { deletion = false; }
        if ((_a = node.parent.left) === null || _a === void 0 ? void 0 : _a.equal(node)) {
            if ((_b = node.parent.parent.left) === null || _b === void 0 ? void 0 : _b.equal(node.parent)) {
                this.rightRotation(node.parent.parent);
                console.log([node.parent, node.parent.left, node.parent.right]);
                if (!deletion) {
                    node.parent.colorFlip();
                    node.parent.right.colorFlip();
                }
                else {
                    node.parent.colorFlip();
                    (_c = node.parent.left) === null || _c === void 0 ? void 0 : _c.colorFlip();
                    node.parent.right.color = red_black_node_1.COLORS.black;
                }
            }
            else {
                this.rightLeftRotation(node.parent.parent);
                console.log([node, node.left, node.right]);
                if (!deletion) {
                    node.colorFlip();
                    node.left.colorFlip();
                }
                else {
                    node.left.color = red_black_node_1.COLORS.black;
                }
            }
        }
        else {
            if ((_d = node.parent.parent.left) === null || _d === void 0 ? void 0 : _d.equal(node.parent)) {
                this.leftRightRotation(node.parent.parent);
                if (!deletion) {
                    node.colorFlip();
                    node.right.colorFlip();
                }
                else {
                    node.right.color = red_black_node_1.COLORS.black;
                }
            }
            else {
                this.leftRotation(node.parent.parent);
                console.log([node.parent, node.parent.left, node.parent.right]);
                if (!deletion) {
                    node.parent.colorFlip();
                    node.parent.left.colorFlip();
                }
                else {
                    node.parent.colorFlip();
                    (_e = node.parent.right) === null || _e === void 0 ? void 0 : _e.colorFlip();
                    node.parent.left.color = red_black_node_1.COLORS.black;
                }
            }
        }
    };
    RBTree.prototype.rightRotation = function (node) {
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
    RBTree.prototype.leftRotation = function (node) {
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
    RBTree.prototype.leftRightRotation = function (node) {
        this.leftRotation(node.left);
        this.rightRotation(node);
    };
    RBTree.prototype.rightLeftRotation = function (node) {
        this.rightRotation(node.right);
        this.leftRotation(node);
    };
    RBTree.prototype.delete = function (node) {
        var nodeToDelete = this.find(node);
        var nodeToExchange = this.findNodeToExchange(nodeToDelete);
        this.balanceDeleteNode(nodeToDelete, nodeToExchange);
        this.root.color = red_black_node_1.COLORS.black;
    };
    RBTree.prototype.balanceDeleteNode = function (nodeToDelete, nodeToExchange) {
        if (nodeToExchange !== null) {
            if (nodeToExchange.color === red_black_node_1.COLORS.red) {
                var nodeToExchangeBuffer = nodeToExchange.clone();
                this.deleteNode(nodeToExchange);
                nodeToDelete.copy(nodeToExchangeBuffer);
                return;
            }
            else {
                var nodeToExchangeBuffer = nodeToExchange.clone();
                this.balanceDeleteNode(nodeToExchange, this.findNodeToExchange(nodeToExchange));
                nodeToDelete.copy(nodeToExchangeBuffer);
                return;
            }
        }
        else {
            if (nodeToDelete.color === red_black_node_1.COLORS.red) {
                this.deleteNode(nodeToDelete);
                return;
            }
            else {
                var nodeToDeleteParent = nodeToDelete.parent;
                this.deleteNode(nodeToDelete);
                this.resolveDoubleBlackCase(null, nodeToDeleteParent);
                return;
            }
        }
    };
    RBTree.prototype.findNodeToExchange = function (node) {
        if (node.right === null && node.left === null) {
            return null;
        }
        else if (node.left !== null) {
            return this.findMax(node.left);
        }
        else if (node.right !== null) {
            return node.right;
        }
    };
    RBTree.prototype.resolveDoubleBlackCase = function (node, parent) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (node === null || node === void 0 ? void 0 : node.equal(this.root)) {
            this.root.color = red_black_node_1.COLORS.black;
            return;
        }
        var nodePart = null;
        if (node === null)
            nodePart = parent;
        else
            nodePart = node.parent;
        var ifNodeNullComparator = function (_node) {
            return _node === null;
        };
        var ifNodeNotNullComparator = function (_node1, _node2) { return _node1 === null || _node1 === void 0 ? void 0 : _node1.equal(_node2); };
        var comparator = node === null ? ifNodeNullComparator : ifNodeNotNullComparator;
        if (comparator(nodePart.left, node)) {
            if (nodePart.right !== null &&
                (((_a = nodePart.right.right) === null || _a === void 0 ? void 0 : _a.color) === red_black_node_1.COLORS.red ||
                    ((_b = nodePart.right.left) === null || _b === void 0 ? void 0 : _b.color) === red_black_node_1.COLORS.red)) {
                if (((_c = nodePart.right.right) === null || _c === void 0 ? void 0 : _c.color) === red_black_node_1.COLORS.red) {
                    this.rotateSubtree(nodePart.right.right, true);
                }
                else if (((_d = nodePart.right.left) === null || _d === void 0 ? void 0 : _d.color) === red_black_node_1.COLORS.red) {
                    this.rotateSubtree(nodePart.right.left, true);
                }
            }
            else {
                if (nodePart.right !== null) {
                    nodePart.right.color = red_black_node_1.COLORS.red;
                }
                if (nodePart.color === red_black_node_1.COLORS.red) {
                    nodePart.color === red_black_node_1.COLORS.black;
                }
                else {
                    this.resolveDoubleBlackCase(nodePart);
                }
            }
        }
        else {
            if (nodePart.left !== null &&
                (((_e = nodePart.left.right) === null || _e === void 0 ? void 0 : _e.color) === red_black_node_1.COLORS.red ||
                    ((_f = nodePart.left.left) === null || _f === void 0 ? void 0 : _f.color) === red_black_node_1.COLORS.red)) {
                if (((_g = nodePart.left.left) === null || _g === void 0 ? void 0 : _g.color) === red_black_node_1.COLORS.red) {
                    this.rotateSubtree(nodePart.left.left, true);
                }
                else if (((_h = nodePart.left.right) === null || _h === void 0 ? void 0 : _h.color) === red_black_node_1.COLORS.red) {
                    this.rotateSubtree(nodePart.left.right, true);
                }
            }
            else {
                if (nodePart.left !== null) {
                    nodePart.left.color = red_black_node_1.COLORS.red;
                }
                if (nodePart.color === red_black_node_1.COLORS.red) {
                    nodePart.color = red_black_node_1.COLORS.black;
                }
                else {
                    this.resolveDoubleBlackCase(nodePart);
                }
            }
        }
    };
    RBTree.prototype.find = function (node) {
        return this.findNode(this.root, node);
    };
    RBTree.prototype.showTree = function (node, height) {
        if (node === null) {
            return;
        }
        this.showTree(node.left, height + 1);
        var output = (node.color === red_black_node_1.COLORS.red ? "\x1b[31m" : "\x1b[37m") +
            "-".repeat(height) +
            ">" +
            node.content() +
            "\x1b[0m";
        console.log(output);
        this.showTree(node.right, height + 1);
    };
    return RBTree;
}(binary_tree_1.default));
exports.default = RBTree;
