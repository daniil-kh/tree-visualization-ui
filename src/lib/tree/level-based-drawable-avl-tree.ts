import { INode } from "./types/node";
import BNode from "./binary-node";
import AVLTree from "./avl-tree";
import { RawDrawableNode } from "../../global.types";

class LevelBasedDrawableAVLTree<T> extends AVLTree<T> {
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

  set xAdjustment(xAdjustment: number) {
    this._xAdjustment = xAdjustment;
  }
  set yAdjustment(yAdjustment: number) {
    this._yAdjustment = yAdjustment;
  }

  protected isLeaf(node: INode): boolean {
    if (node === null) return true;
    if (node.left === null && node.right === null) return true;

    return false;
  }

  protected positionNodes(): void {
    let leftSubtreeModifier: number = 0;
    this.root.y = this._yAdjustment;
    this.maxDepth = this.findHeight(this.root, 0);
    if (this.root.left !== null) {
      leftSubtreeModifier =
        this.calculateNodesPositions(this.root.left, 0, 1) + subtreeSeparation;
      if (this.root.right !== null) {
        this.calculateNodesPositions(this.root.right, leftSubtreeModifier, 1);

        this.root.x = (this.root.right.x + this.root.left.x) / 2;
      } else {
        this.root.x = this.root.left.x;
      }
    } else if (this.root.right !== null) {
      this.calculateNodesPositions(this.root.right, 0, 1);
      this.root.x = this.root.right.x;
    }
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
    if (this.root === null) return [];
    this.positionNodes();
    this.forEachNode(
      this.root,
      (node: INode) => (node.x = node.x + this._xAdjustment)
    );
    let nodes = this.getArrayOfNodes(this.root as BNode<T>);
    return nodes;
  }

  public applyAdjustment(): void {
    this.forEachNode(this.root, (node: INode) => {
      node.x += this._xAdjustment;
      node.y += this._yAdjustment;
    });
  }
}

//const siblingSeparation = 10;
const nodeSize = 40;
const levelSeparation = 50;
const subtreeSeparation = 10;

export default LevelBasedDrawableAVLTree;
