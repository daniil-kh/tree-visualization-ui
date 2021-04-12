"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binary_node_1 = require("./binary-node");
var binary_tree_1 = require("./binary-tree");
var avl_tree_1 = require("./avl-tree");
var red_black_node_1 = require("./red-black-node");
var red_black_tree_1 = require("./red-black-tree");
var bTreeExample = function () {
    var tree = new binary_tree_1.default();
    var array = [
        8,
        7,
        6,
        6,
        4,
        5,
        20,
        25,
        15,
        16,
        14,
        24,
        24,
        23,
        23,
        22,
        22,
    ];
    array.forEach(function (element) {
        tree.add(new binary_node_1.default(element));
    });
    tree.show();
    tree.delete(new binary_node_1.default(25));
    console.log("After deleting: ");
    tree.show();
};
var avlTreeExample = function () {
    var avlTree = new avl_tree_1.default();
    var array = [
        2,
        17,
        16,
        5,
        1,
        13,
        18,
        8,
        4,
        20,
        6,
        14,
        7,
        3,
        12,
        15,
        19,
        9,
        11,
        10,
    ];
    array.forEach(function (element) {
        avlTree.add(new binary_node_1.default(element));
    });
    avlTree.show();
    console.log("\n\n");
    avlTree.delete(new binary_node_1.default(12));
    avlTree.show();
};
var rbTreeExample = function () {
    var rbTree = new red_black_tree_1.default();
    var array = [
        3,
        19,
        11,
        1,
        29,
        18,
        2,
        6,
        28,
        10,
        12,
        9,
        25,
        26,
        14,
        17,
        30,
        21,
        7,
        5,
        27,
        13,
        4,
        8,
        24,
        22,
        16,
        23,
        15,
        20,
    ];
    array.forEach(function (element) {
        rbTree.add(new red_black_node_1.default(element));
    });
    rbTree.show();
    rbTree.delete(new red_black_node_1.default(11));
    console.log("After deleting:\n");
    rbTree.show();
};
bTreeExample();
avlTreeExample();
rbTreeExample();
