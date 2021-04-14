import { INode } from "./types/node";
import { ITree } from "./types/tree";
import BNode from "./binary-node";
import { Coordinates, RawDrawableNode } from "../../global.types";

class BTree<T> implements ITree {
  protected root: INode;
  constructor() {
    this.root = (null as unknown) as BNode<T>;
  }
  public add(node: INode): void {
    if (this.root === null) {
      this.root = node;
      node.parent = this.root;
      return;
    }

    this.addNode(this.root, node);
  }

  protected addNode(currentNode: INode, insertedNode: INode): void {
    if (currentNode.compare(insertedNode) > 0) {
      if (currentNode.left === null) {
        currentNode.left = insertedNode;
        insertedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.left, insertedNode);
      }
    }
    if (currentNode.compare(insertedNode) <= 0) {
      if (currentNode.right === null) {
        currentNode.right = insertedNode;
        insertedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.right, insertedNode);
      }
    }
  }

  protected deleteNode(node: INode): void {
    let nodeToDelete: INode = this.findNode(this.root, node);
    if (nodeToDelete.equal(this.root)) {
      let nodeToExchange = this.findMax(nodeToDelete.left);
      if (nodeToExchange.left !== null) {
        nodeToExchange.parent.left = nodeToExchange.left;
      }
      if (nodeToExchange.parent.right.equal(nodeToExchange)) {
        nodeToExchange.parent.right = nodeToExchange.right;
      } else {
        nodeToExchange.parent.left = nodeToExchange.left;
      }
      nodeToDelete.copy(nodeToExchange);

      return;
    }

    if (nodeToDelete === null) return;
    if (nodeToDelete.right === null && nodeToDelete.left === null) {
      if (nodeToDelete.parent.right?.equal(nodeToDelete)) {
        nodeToDelete.parent.right = (null as unknown) as BNode<T>;
      } else {
        nodeToDelete.parent.left = (null as unknown) as BNode<T>;
      }
    } else if (nodeToDelete.left !== null) {
      let nodeToExchange = this.findMax(nodeToDelete.left);
      nodeToDelete.copy(nodeToExchange);
      if (nodeToDelete.left.equal(nodeToExchange)) {
        nodeToDelete.left = nodeToExchange.left;
        if (nodeToExchange.left !== null) {
          nodeToExchange.left.parent = nodeToExchange.parent;
        }
        nodeToExchange.parent = (null as unknown) as BNode<T>;
      } else {
        nodeToExchange.parent.right = nodeToExchange.left;
      }
    } else if (nodeToDelete.right !== null) {
      nodeToDelete.parent.right = nodeToDelete.right;
      nodeToDelete.right.parent = nodeToDelete.parent;
    }
  }

  public delete(node: INode): void {
    this.deleteNode(node);
  }

  public find(node: INode): INode {
    return this.findNode(this.root, node) as BNode<T>;
  }
  protected findNode(currentNode: INode, findedNode: INode): INode {
    if (currentNode === null) return (null as unknown) as INode;
    if (currentNode.equal(findedNode)) {
      return currentNode;
    } else if (currentNode.compare(findedNode) > 0) {
      return this.findNode(currentNode.left, findedNode);
    } else if (currentNode.compare(findedNode) <= 0) {
      return this.findNode(currentNode.right, findedNode);
    }

    return (null as unknown) as INode;
  }

  protected findMax(currentNode: INode): INode {
    if (currentNode.right === null) {
      return currentNode;
    }

    return this.findMax(currentNode.right);
  }

  protected findMin(currentNode: INode): INode {
    if (currentNode.left === null) {
      return currentNode;
    }

    return this.findMin(currentNode.left);
  }

  public show(): void {
    this.showTree(this.root, 1);
  }

  protected showTree(node: INode, height: number): void {
    if (node === null) {
      return;
    }
    this.showTree(node.left, height + 1);
    let output: string = "-".repeat(height) + ">" + node.content();
    console.log(output);
    this.showTree(node.right, height + 1);
  }

  public getNodes(coordinates: Coordinates): Array<RawDrawableNode<T>> {
    /*let nodesToDrawArr = this.getArrayOfNodes(
      this.root as BNode<T>,
      coordinates,
      this.findHeight(this.root, 0)
    );
    let countOfNodesOfEachLayer = this.getNodeGapArray();*/

    let tree = this.getArrayOfLeftSubtreeNodes(
      this.root.left as BNode<T>,
      coordinates,
      1
    )
      .concat([{ data: (this.root as BNode<T>).data, ...coordinates }])
      .concat(
        this.getArrayOfRightSubtreeNodes(
          this.root.right as BNode<T>,
          coordinates,
          1
        )
      );

    return tree;
  }

  protected findHeight(node: INode, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }

  protected findLayersFullness(node: INode, height: number): Array<number> {
    if (node === null) return [];

    let nodeArrayLeft: Array<number> = this.findLayersFullness(
      node.left,
      height + 1
    );
    let nodeArrayRight: Array<number> = this.findLayersFullness(
      node.right,
      height + 1
    );
    let nodeArray = nodeArrayLeft.concat([height]).concat(nodeArrayRight);

    return nodeArray;
  }

  protected getNodeGapArray(): Array<number> {
    let fullnessArray: Array<number> = this.findLayersFullness(this.root, 0);
    let treeHeight: number = this.findHeight(this.root, 0);
    let countOfElementsOnEachLayer: Array<number> = [];
    for (let i = 0; i <= treeHeight; ++i) {
      countOfElementsOnEachLayer[
        i
      ] = fullnessArray.reduce((accumulator, currentValue) =>
        currentValue === i ? accumulator + 1 : 0
      );
    }

    return countOfElementsOnEachLayer;
  }

  protected checkIfMirrorNodeExists(
    target: INode,
    left: INode,
    right: INode
  ): boolean {
    if (target === null) return false;
    if (target.equal(this.root)) return true;
    if (left === null || right === null) return false;
    if (left.equal(target)) return right !== null;
    if (right.equal(target)) return left !== null;

    let checkResult = this.checkIfMirrorNodeExists(
      target,
      left.left,
      right.right
    );

    if (checkResult) return checkResult;

    return this.checkIfMirrorNodeExists(target, left.right, right.left);
  }

  protected findHeightCorrection(
    node: INode,
    heightCorrection: number,
    direction: SubtreeDirection
  ): number {
    if (!node) return heightCorrection;
    if (node.left === null && node.right === null) return heightCorrection;

    let correction = heightCorrection;

    let correctionPrime = this.findHeightCorrection(
      node[direction],
      correction,
      direction
    );

    correction = correctionPrime;

    if (node[direction] !== null) return correction + 1;
    return correction;
  }

  protected getArrayOfLeftSubtreeNodes(
    node: BNode<T>,
    coordinates: Coordinates,
    height: number
  ): Array<RawDrawableNode<T>> {
    if (node === null) {
      return [];
    }
    const nodeOffsets = (amount: number): number => {
      if (amount <= 0) {
        return 0;
      }

      return Math.pow(5, 2) * Math.pow(2, amount - 1) + nodeOffsets(amount - 1);
    };

    let accumulator: Array<RawDrawableNode<T>> = [];
    let objToPush: RawDrawableNode<T> = {
      parent: { ...coordinates },
      data: node.data,
      x: coordinates.x - 50,
      y: coordinates.y + 50,
    };

    let ifMirrorNodeExist = this.checkIfMirrorNodeExists(
      node,
      node.parent?.parent?.left,
      node.parent?.parent?.right
    );

    let leftSubtree = this.getArrayOfLeftSubtreeNodes(
      node.left,
      {
        x: objToPush.x,
        y: objToPush.y,
      },
      height - 1
    );
    let rightSubtree = this.getArrayOfRightSubtreeNodes(
      node.right,
      {
        x: objToPush.x,
        y: objToPush.y,
      },
      height - 1
    );

    return accumulator
      .concat(leftSubtree)
      .concat([objToPush])
      .concat(rightSubtree);
  }

  protected getArrayOfRightSubtreeNodes(
    node: BNode<T>,
    coordinates: Coordinates,
    height: number
  ): Array<RawDrawableNode<T>> {
    if (node === null) {
      return [];
    }
    const nodeOffsets = (amount: number): number => {
      if (amount <= 0) {
        return 0;
      }

      return Math.pow(5, 2) * Math.pow(2, amount - 1) + nodeOffsets(amount - 1);
    };

    let accumulator: Array<RawDrawableNode<T>> = [];
    let objToPush: RawDrawableNode<T> = {
      parent: { ...coordinates },
      data: node.data,
      x: coordinates.x + 50,
      y: coordinates.y + 50,
    };
    let leftSubtree = this.getArrayOfLeftSubtreeNodes(
      node.left,
      {
        x: objToPush.x,
        y: objToPush.y,
      },
      height - 1
    );
    let rightSubtree = this.getArrayOfRightSubtreeNodes(
      node.right,
      {
        x: objToPush.x,
        y: objToPush.y,
      },
      height - 1
    );

    return accumulator
      .concat(leftSubtree)
      .concat([objToPush])
      .concat(rightSubtree);
  }
}

type SubtreeDirection = "right" | "left";

export default BTree;
