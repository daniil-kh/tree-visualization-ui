import React from "react";

import Canvas from "../canvas/canvas.component";

import { getDrawableTree, drawBNode } from "./tree.utils";

import * as TreeLib from "../../lib/tree/index";
import { DrawableNode } from "../../global.types";

const Tree: React.FC<object> = (props: object): JSX.Element => {
  const tree: TreeLib.LevelBasedDrawableRBTree<number> = new TreeLib.LevelBasedDrawableRBTree<number>(
    100,
    50
  );
  //const tree: TreeLib.AVLTree<number> = new TreeLib.AVLTree<number>();
  const arr: Array<number> = [
    44,
    1,
    30,
    9,
    42,
    31,
    35,
    28,
    34,
    33,
    47,
    13,
    12,
    5,
    24,
    6,
    45,
    27,
    7,
    20,
    3,
    40,
    8,
    11,
    48,
    26,
    18,
    32,
    43,
    16,
    4,
    36,
    49,
    50,
    19,
    21,
    2,
    15,
    38,
    17,
    25,
    14,
    10,
    29,
    46,
    23,
    37,
    22,
    39,
    41,
  ];
  //const arr : Array<number> = [4, 3, 2, 6, 5, 3]
  arr.forEach((el) => tree.add(new TreeLib.RBNode<number>(el)));
  const drawableArr: Array<DrawableNode<number>> = getDrawableTree(tree);

  return (
    <Canvas data={drawableArr} draw={(ctx, el) => drawBNode<number>(ctx, el)} />
  );
};

export default Tree;
