import * as TreeLib from "../../lib/tree/index";

import { RawDrawableNode, DrawableNode } from "../../global.types";

export const getDrawableTree = (
  tree: TreeLib.BTree<number>
): Array<DrawableNode<number>> => {
  const nodes: Array<RawDrawableNode<number>> = tree.getNodes({
    x: 960,
    y: 50,
  });

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
  ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText((node.data as unknown) as string, node.x, node.y + 7);
  if (node.left) {
    const hypotenuse = Math.sqrt(
      Math.pow(node.left.x - node.x, 2) + Math.pow(node.left.y - node.y, 2)
    );
    const X: number = Math.abs(
      ((node.left.x - node.x) / hypotenuse) * circleRadius
    );
    const Y: number = Math.sqrt(Math.pow(circleRadius, 2) - Math.pow(X, 2));

    ctx.moveTo(node.x - X, node.y + Y);
    ctx.lineTo(node.left.x + X, node.left.y - Y);
    ctx.stroke();
  }
  if (node.right) {
    const hypotenuse = Math.sqrt(
      Math.pow(node.right.x - node.x, 2) + Math.pow(node.right.y - node.y, 2)
    );
    const X: number = Math.abs(
      ((node.right.x - node.x) / hypotenuse) * circleRadius
    );
    const Y: number = Math.sqrt(Math.pow(circleRadius, 2) - Math.pow(X, 2));

    ctx.moveTo(node.x + X, node.y + Y);
    ctx.lineTo(node.right.x - X, node.right.y - Y);
    ctx.stroke();
  }
};
