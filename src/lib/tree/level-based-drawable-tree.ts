import { INode } from "./types/node";
import BNode from "./binary-node";
import BTree from "./binary-tree";
import { Coordinates, RawDrawableNode } from "../../global.types";

class LevelBasedDrawableTree<T> extends BTree<T> {
  protected maxDepth: number;
  protected _xAdjustment: number;
  protected _yAdjustment: number;
  protected _layerAdjustment: Array<number>;

  constructor(xAdjustment: number = 0, yAdjustment: number = 0) {
    super();
    this.maxDepth = this.findHeight(this.root, 0);
    this._xAdjustment = xAdjustment;
    this._yAdjustment = yAdjustment;
    this._layerAdjustment = [];
  }

  protected getFirstChild(node: INode): INode {
    if (node === null) return (null as unknown) as INode;
    if (node && node.left) return node.left;
    if (node && node.right) return node.right;

    return (null as unknown) as INode;
  }

  protected getLastChild(node: INode): INode {
    if (node && node.right) return node.right;
    if (node && node.left) return node.left;

    return (null as unknown) as INode;
  }

  protected getRightSibling(node: INode): INode {
    if (node && node.parent) {
      if (node.parent.right && !node.parent.right.equal(node))
        return node.parent.right;
      else return (null as unknown) as INode;
    }

    return (null as unknown) as INode;
  }

  protected getLeftSibling(node: INode): INode {
    if (node && node.parent) {
      if (node.parent.left && !node.parent.left.equal(node))
        return node.parent.left;
      else return (null as unknown) as INode;
    }

    return (null as unknown) as INode;
  }

  protected getNodeLayer(node: INode): number {
    if (node === null) return 0;
    let tempPtr: INode = node;
    let layer = 0;
    while (tempPtr.parent !== null) {
      ++layer;
      tempPtr = tempPtr.parent;
    }

    return layer;
  }

  protected isLeaf(node: INode): boolean {
    if (node === null) return true;
    if (node.left === null && node.right === null) return true;

    return false;
  }

  protected getLeftmostOffspring(
    node: INode,
    level: number,
    depth: number
  ): INode {
    if (level >= depth) return node;
    else if (this.isLeaf(node)) return (null as unknown) as INode;
    else {
      let rightmost = this.getFirstChild(node);
      let leftmost = this.getLeftmostOffspring(rightmost, level + 1, depth);
      while (leftmost === null && this.getRightSibling(rightmost) !== null) {
        rightmost = this.getRightSibling(rightmost);
        leftmost = this.getLeftmostOffspring(rightmost, level + 1, depth);
      }
      return leftmost;
    }
  }

  protected getRightmostOffspring(
    node: INode,
    level: number,
    depth: number
  ): INode {
    if (level >= depth) return node;
    else if (this.isLeaf(node)) return (null as unknown) as INode;
    else {
      let leftmost = this.getLastChild(node);
      let rightmost = this.getRightmostOffspring(leftmost, level + 1, depth);
      while (rightmost === null && this.getLeftSibling(leftmost) !== null) {
        leftmost = this.getLeftSibling(leftmost);
        rightmost = this.getRightmostOffspring(leftmost, level + 1, depth);
      }
      return rightmost;
    }
  }

  protected positionNodes(): void {
    let leftSubtreeModifier: number = 0;
    let rightSubtreeModifier: number = 0;
    this.root.y = this._yAdjustment;
    this.maxDepth = this.findHeight(this.root, 0);
    if (this.root.left !== null) {
      leftSubtreeModifier =
        this.calculateNodesPositions(this.root.left, 0, 1) + subtreeSeparation;
      if (this.root.right !== null) {
        rightSubtreeModifier = this.calculateNodesPositions(
          this.root.right,
          leftSubtreeModifier,
          1
        );

        this.root.x = (this.root.right.x + this.root.left.x) / 2;
      } else {
        this.root.x = this.root.left.x;
      }
    } else {
      rightSubtreeModifier = this.calculateNodesPositions(
        this.root.right,
        0,
        1
      );
      this.root.x = this.root.right.x;
    }

    this.forEachNode(
      this.root,
      (node: INode) => (node.x = node.x + this._xAdjustment)
    );
  }

  protected forEachNode(node: INode, callback: (node: INode) => void) {
    if (node === null) return;

    this.forEachNode(node.left, callback);
    callback(node);
    this.forEachNode(node.right, callback);
  }

  protected calculateNodesPositions(
    node: INode,
    modifier: number,
    layer: number
  ): number {
    if (node === null) return 0;
    node.y = this._yAdjustment + layer * levelSeparation;
    if (!this.isLeaf(node)) {
      let leftSubtreeModifier = 0;
      let rightSubtreeModifier = 0;
      if (node.left !== null) {
        leftSubtreeModifier =
          this.calculateNodesPositions(node.left, modifier, layer + 1) +
          subtreeSeparation;
        if (node.right !== null) {
          rightSubtreeModifier = this.calculateNodesPositions(
            node.right,
            leftSubtreeModifier,
            layer + 1
          );
          node.x = (node.left.x + node.right.x) / 2;
          return rightSubtreeModifier;
        } else {
          node.x = node.left.x;
          return leftSubtreeModifier;
        }
      } else {
        rightSubtreeModifier = this.calculateNodesPositions(
          node.right,
          modifier,
          layer + 1
        );
        node.x = node.right.x;
        return rightSubtreeModifier;
      }
    } else {
      node.x = modifier;
      return modifier + nodeSize;
    }
  }

  protected calculateRightNodesPositions(
    node: INode,
    modifier: number,
    layer: number
  ): number {
    if (node === null) return 0;
    node.y = this._yAdjustment + layer * levelSeparation;
    if (!this._layerAdjustment[layer - 1]) {
      this._layerAdjustment[layer - 1] = 0;
    }
    if (!this.isLeaf(node)) {
      let leftSubtreeModifier = 0;
      let rightSubtreeModifier = 0;
      if (node.left !== null) {
        leftSubtreeModifier =
          this.calculateLeftNodesPositions(node.left, modifier, layer + 1) +
          subtreeSeparation;
        if (node.right !== null) {
          rightSubtreeModifier = this.calculateRightNodesPositions(
            node.right,
            leftSubtreeModifier,
            layer + 1
          );
          node.x =
            (node.left.x + node.right.x) / 2 + this._layerAdjustment[layer - 1];
          this._layerAdjustment[layer - 1] = rightSubtreeModifier - modifier;
          return rightSubtreeModifier;
        } else {
          node.x = node.left.x + nodeSize + this._layerAdjustment[layer - 1];
          return leftSubtreeModifier + nodeSize;
        }
      } else {
        rightSubtreeModifier = this.calculateRightNodesPositions(
          node.right,
          modifier + nodeSize,
          layer + 1
        );
        node.x = node.right.x - nodeSize + this._layerAdjustment[layer - 1];
        this._layerAdjustment[layer - 1] = rightSubtreeModifier - modifier;
        return rightSubtreeModifier;
      }
    } else {
      node.x = modifier;
      return modifier;
    }
  }

  protected calculateLeftNodesPositions(
    node: INode,
    modifier: number,
    layer: number
  ): number {
    if (node === null) return 0;
    if (!this._layerAdjustment[layer - 1]) {
      this._layerAdjustment[layer - 1] = 0;
    }
    node.y = this._yAdjustment + layer * levelSeparation;
    if (!this.isLeaf(node)) {
      let leftSubtreeModifier = 0;
      let rightSubtreeModifier = 0;
      if (node.left !== null) {
        leftSubtreeModifier =
          this.calculateLeftNodesPositions(node.left, modifier, layer + 1) +
          subtreeSeparation;
        if (node.right !== null) {
          rightSubtreeModifier = this.calculateRightNodesPositions(
            node.right,
            modifier + nodeSize,
            layer + 1
          );
          node.x =
            (node.left.x + node.right.x) / 2 + this._layerAdjustment[layer - 1];
          this._layerAdjustment[layer - 1] = rightSubtreeModifier - modifier;
          return rightSubtreeModifier;
        } else {
          node.x = node.left.x + nodeSize + this._layerAdjustment[layer - 1];
          return leftSubtreeModifier + nodeSize;
        }
      } else {
        rightSubtreeModifier = this.calculateRightNodesPositions(
          node.right,
          modifier + nodeSize,
          layer + 1
        );
        node.x = node.right.x - nodeSize + this._layerAdjustment[layer - 1];
        this._layerAdjustment[layer - 1] = rightSubtreeModifier - modifier;
        return rightSubtreeModifier;
      }
    } else {
      node.x = modifier;
      return modifier + nodeSize;
    }
  }

  protected getArrayOfNodes(node: BNode<T>): Array<RawDrawableNode<T>> {
    if (node === null) return [];

    let objToPush: RawDrawableNode<T> = {
      x: node.x,
      y: node.y,
      data: node.data,
      preliminary: node.preliminary,
      modifier: node.modifier,
    };
    if (node.parent) {
      objToPush.parent = { x: node.parent.x, y: node.parent.y };
    }

    return this.getArrayOfNodes(node.left)
      .concat([objToPush])
      .concat(this.getArrayOfNodes(node.right));
  }

  public getNodes(): Array<RawDrawableNode<T>> {
    this.positionNodes();
    let nodes = this.getArrayOfNodes(this.root as BNode<T>);
    console.log(nodes);
    return nodes;
  }
}

const siblingSeparation = 10;
const nodeSize = 40;
const levelSeparation = 50;
const subtreeSeparation = 10;

type Direction = "left" | "right";

export default LevelBasedDrawableTree;
