import * as TreeLib from "../../lib/tree/index";

import { RawDrawableNode, DrawableNode } from "../../global.types";

export const getDrawableTree = (
  tree: TreeLib.LevelBasedDrawableTree<number>
): Array<DrawableNode<number>> => {
  const nodes: Array<RawDrawableNode<number>> = tree.getNodes();

  return nodes.map(
    (node): DrawableNode<number> => ({ ...node, shape: "circle", fill: false })
  );
};

export const drawBNode = <T>(
  ctx: CanvasRenderingContext2D,
  node: DrawableNode<T>
) => {
  let circleRadius = 20;
  ctx.beginPath();
  ctx.strokeStyle = node.color ? node.color : "#000000";
  ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  //ctx.strokeStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText((node.data as unknown) as string, node.x, node.y + 7);
  if (node.parent) {
    const hypotenuse = Math.sqrt(
      Math.pow(node.x - node.parent.x, 2) + Math.pow(node.y - node.parent.y, 2)
    );
    const X: number = Math.abs(
      ((node.x - node.parent.x) / hypotenuse) * circleRadius
    );
    const Y: number = Math.sqrt(Math.pow(circleRadius, 2) - Math.pow(X, 2));

    ctx.moveTo(
      node.parent.x + (node.x > node.parent.x ? X : -X),
      node.parent.y + Y
    );
    ctx.lineTo(node.x + (node.x > node.parent.x ? -X : X), node.y - Y);
    ctx.stroke();
  }
  ctx.strokeStyle = "#000000";
};
