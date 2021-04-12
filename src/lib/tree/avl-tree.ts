import { INode } from "./types/node";
import BTree from "./binary-tree";

class AVLTree<T> extends BTree<T> {
  public add(node: INode) {
    if (this.root === null) {
      this.root = node;
      return;
    }

    this.addNode(this.root, node);
    this.checkBalanceFactor(this.findNode(this.root, node));
  }

  private checkBalanceFactor(node: INode): void {
    if (node.equal(this.root)) {
      this.fixUnbalanceDomain(node);
      return;
    }

    this.fixUnbalanceDomain(node);
    this.checkBalanceFactor(node.parent);
  }

  private fixUnbalanceDomain(node: INode): void {
    let heightLeft: number = this.findHeight(node.left, 1);
    let heightRight: number = this.findHeight(node.right, 1);
    if (Math.abs(heightLeft - heightRight) > 1) {
      if (heightLeft > heightRight) {
        let heightLeftChild: number = this.findHeight(node.left.left, 1);
        let heightRightChild: number = this.findHeight(node.left.right, 1);

        if (heightLeftChild > heightRightChild) {
          this.rightRotation(node);
        } else {
          this.leftRightRotation(node);
        }
      } else {
        let heightLeftChild: number = this.findHeight(node.right.left, 1);
        let heightRightChild: number = this.findHeight(node.right.right, 1);

        if (heightLeftChild > heightRightChild) {
          this.rightLeftRotation(node);
        } else {
          this.leftRotation(node);
        }
      }
    }
  }

  /*private findHeight(node: INode, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }*/

  protected rightRotation(node: INode): void {
    if (node.equal(this.root)) {
      this.root = node.left;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.left;
      } else {
        node.parent.right = node.left;
      }
    }
    node.left.parent = node.parent;
    node.parent = node.left;
    node.left = node.left.right;
    if (node.left !== null) {
      node.left.parent = node;
    }
    node.parent.right = node;
  }

  protected leftRotation(node: INode): void {
    if (node.equal(this.root)) {
      this.root = node.right;
    }
    if (node.parent !== null) {
      if (node.parent.left?.equal(node)) {
        node.parent.left = node.right;
      } else {
        node.parent.right = node.right;
      }
    }
    node.right.parent = node.parent;
    node.parent = node.right;
    node.right = node.right.left;
    if (node.right !== null) {
      node.right.parent = node;
    }
    node.parent.left = node;
  }

  protected leftRightRotation(node: INode): void {
    this.leftRotation(node.left);
    this.rightRotation(node);
  }

  protected rightLeftRotation(node: INode): void {
    this.rightRotation(node.right);
    this.leftRotation(node);
  }

  private checkAllNodes(currentNode: INode): void {
    if (currentNode === null) return;

    this.checkAllNodes(currentNode.left);
    this.checkAllNodes(currentNode.right);

    this.checkBalanceFactor(currentNode);
  }

  public delete(node: INode): void {
    this.deleteNode(node);
    this.checkAllNodes(this.root);
  }
}

export default AVLTree;
