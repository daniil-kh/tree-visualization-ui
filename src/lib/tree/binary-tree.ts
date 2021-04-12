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

  protected addNode(currentNode: INode, insetrtedNode: INode): void {
    if (currentNode.compare(insetrtedNode) > 0) {
      if (currentNode.left === null) {
        currentNode.left = insetrtedNode;
        insetrtedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.left, insetrtedNode);
      }
    }
    if (currentNode.compare(insetrtedNode) <= 0) {
      if (currentNode.right === null) {
        currentNode.right = insetrtedNode;
        insetrtedNode.parent = currentNode;
      } else {
        this.addNode(currentNode.right, insetrtedNode);
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
    return this.getArrayOfNodes(
      this.root as BNode<T>,
      coordinates,
      this.findHeight(this.root, 0)
    );
  }

  protected findHeight(node: INode, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }

  private getArrayOfNodes(
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
    let leftSubtree = this.getArrayOfNodes(
      node.left,
      {
        x:
          coordinates.x -
          (25 +
            (node.left && node.left.right
              ? nodeOffsets(height - 1)
              : nodeOffsets(0))),
        y: coordinates.y + 50,
      },
      height - 1
    );
    let objToPush: any = { ...coordinates, data: node.data };
    if (node.left !== null) {
      objToPush = {
        ...objToPush,
        left: {
          x:
            coordinates.x -
            (25 + (node.left.right ? nodeOffsets(height - 1) : nodeOffsets(0))),
          y: coordinates.y + 50,
        },
      };
    }
    if (node.right !== null) {
      objToPush = {
        ...objToPush,
        right: {
          x:
            coordinates.x +
            (25 + (node.right.left ? nodeOffsets(height - 1) : nodeOffsets(0))),
          y: coordinates.y + 50,
        },
      };
    }
    accumulator.push(objToPush);
    let rightSubtree = this.getArrayOfNodes(
      node.right,
      {
        x:
          coordinates.x +
          (25 +
            (node.right && node.right.left
              ? nodeOffsets(height - 1)
              : nodeOffsets(0))),
        y: coordinates.y + 50,
      },
      height - 1
    );

    return accumulator;
  }
}

export default BTree;
