import React from "react";

import Canvas from "../canvas/canvas.component";

import { getDrawableTree, drawBNode } from "./tree.utils";

import * as TreeLib from "../../lib/tree/index";

const Tree: React.FC<object> = (props: object): JSX.Element => {
  const tree: TreeLib.BTree<number> = new TreeLib.BTree<number>();
  //const avl_tree: TreeLib.AVLTree<number> = new TreeLib.AVLTree<number>();
  const arr: Array<number> = [
    15,
    19,
    26,
    21,
    25,
    29,
    7,
    2,
    23,
    22,
    11,
    20,
    27,
    12,
    3,
    6,
    5,
    30,
    8,
    4,
    9,
    14,
    18,
    24,
    13,
    1,
    10,
    28,
    16,
    17,
  ];
  arr.forEach((el) => tree.add(new TreeLib.BNode<number>(el)));
  const drawableArr = getDrawableTree(tree);

  return (
    <Canvas data={drawableArr} draw={(ctx, el) => drawBNode<number>(ctx, el)} />
  );
};

export default Tree;
