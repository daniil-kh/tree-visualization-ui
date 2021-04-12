"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BTree = /** @class */ (function () {
    function BTree() {
        this.root = null;
    }
    BTree.prototype.add = function (node) {
        if (this.root === null) {
            this.root = node;
            node.parent = this.root;
            return;
        }
        this.addNode(this.root, node);
    };
    BTree.prototype.addNode = function (currentNode, insetrtedNode) {
        if (currentNode.compare(insetrtedNode) > 0) {
            if (currentNode.left === null) {
                currentNode.left = insetrtedNode;
                insetrtedNode.parent = currentNode;
            }
            else {
                this.addNode(currentNode.left, insetrtedNode);
            }
        }
        if (currentNode.compare(insetrtedNode) <= 0) {
            if (currentNode.right === null) {
                currentNode.right = insetrtedNode;
                insetrtedNode.parent = currentNode;
            }
            else {
                this.addNode(currentNode.right, insetrtedNode);
            }
        }
    };
    BTree.prototype.deleteNode = function (node) {
        var _a;
        var nodeToDelete = this.findNode(this.root, node);
        if (nodeToDelete.equal(this.root)) {
            var nodeToExchange = this.findMax(nodeToDelete.left);
            if (nodeToExchange.left !== null) {
                nodeToExchange.parent.left = nodeToExchange.left;
            }
            if (nodeToExchange.parent.right.equal(nodeToExchange)) {
                nodeToExchange.parent.right = nodeToExchange.right;
            }
            else {
                nodeToExchange.parent.left = nodeToExchange.left;
            }
            nodeToDelete.copy(nodeToExchange);
            return;
        }
        if (nodeToDelete === null)
            return;
        if (nodeToDelete.right === null && nodeToDelete.left === null) {
            if ((_a = nodeToDelete.parent.right) === null || _a === void 0 ? void 0 : _a.equal(nodeToDelete)) {
                nodeToDelete.parent.right = null;
            }
            else {
                nodeToDelete.parent.left = null;
            }
        }
        else if (nodeToDelete.left !== null) {
            var nodeToExchange = this.findMax(nodeToDelete.left);
            nodeToDelete.copy(nodeToExchange);
            if (nodeToDelete.left.equal(nodeToExchange)) {
                nodeToDelete.left = nodeToExchange.left;
                if (nodeToExchange.left !== null) {
                    nodeToExchange.left.parent = nodeToExchange.parent;
                }
                nodeToExchange.parent = null;
            }
            else {
                nodeToExchange.parent.right = nodeToExchange.left;
            }
        }
        else if (nodeToDelete.right !== null) {
            nodeToDelete.parent.right = nodeToDelete.right;
            nodeToDelete.right.parent = nodeToDelete.parent;
        }
    };
    BTree.prototype.delete = function (node) {
        this.deleteNode(node);
    };
    BTree.prototype.find = function (node) {
        return this.findNode(this.root, node);
    };
    BTree.prototype.findNode = function (currentNode, findedNode) {
        if (currentNode === null)
            return null;
        if (currentNode.equal(findedNode)) {
            return currentNode;
        }
        else if (currentNode.compare(findedNode) > 0) {
            return this.findNode(currentNode.left, findedNode);
        }
        else if (currentNode.compare(findedNode) <= 0) {
            return this.findNode(currentNode.right, findedNode);
        }
    };
    BTree.prototype.findMax = function (currentNode) {
        if (currentNode.right === null) {
            return currentNode;
        }
        return this.findMax(currentNode.right);
    };
    BTree.prototype.findMin = function (currentNode) {
        if (currentNode.left === null) {
            return currentNode;
        }
        return this.findMin(currentNode.left);
    };
    BTree.prototype.show = function () {
        this.showTree(this.root, 1);
    };
    BTree.prototype.showTree = function (node, height) {
        if (node === null) {
            return;
        }
        this.showTree(node.left, height + 1);
        var output = "-".repeat(height) + ">" + node.content();
        console.log(output);
        this.showTree(node.right, height + 1);
    };
    return BTree;
}());
exports.default = BTree;
