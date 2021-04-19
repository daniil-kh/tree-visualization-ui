import React from "react";

import Canvas from "../canvas/canvas.component";

import { getDrawableTree, drawBNode } from "./tree.utils";

import * as TreeLib from "../../lib/tree/index";
import { DrawableNode } from "../../global.types";

interface TreeProps {
  data: Array<number>;
}

const Tree: React.FC<TreeProps> = ({ data }): JSX.Element => {
  const tree: TreeLib.LevelBasedDrawableRBTree<number> = new TreeLib.LevelBasedDrawableRBTree<number>(
    0,
    50
  );

  if (data.length > 0)
    data.forEach((el) => tree.add(new TreeLib.RBNode<number>(el)));
  const drawableArr: Array<DrawableNode<number>> = getDrawableTree(tree);

  return (
    <Canvas data={drawableArr} draw={(ctx, el) => drawBNode<number>(ctx, el)} />
  );
};

export default Tree;
