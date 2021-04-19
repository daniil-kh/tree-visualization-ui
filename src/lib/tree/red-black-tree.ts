import BTree from "./binary-tree";
import RBNode, { COLORS } from "./red-black-node";

class RBTree<T> extends BTree<T> {
  protected root: RBNode<T>;
  constructor() {
    super();
    this.root = (null as unknown) as RBNode<T>;
  }

  public add(node: RBNode<T>): void {
    if (this.root === null) {
      this.root = node;
      this.root.color = COLORS.black;
      return;
    }

    this.addNode(this.root, node);
    this.balanceTreeAfterInsertion(this.findNode(this.root, node) as RBNode<T>);
  }
  protected balanceTreeAfterInsertion(node: RBNode<T>): void {
    if (node.equal(this.root)) {
      return;
    }

    let nodeGrandparent = node.parent.parent;
    this.balanceSubTreeAfterInsertion(node);
    if (nodeGrandparent !== null)
      this.balanceTreeAfterInsertion(nodeGrandparent);
    this.root.color = COLORS.black;
  }

  protected balanceSubTreeAfterInsertion(node: RBNode<T>): void {
    if (node.equal(this.root)) {
      this.root.color = COLORS.black;
      return;
    }
    if (node.parent.color === node.color && node.parent.parent !== null) {
      if (node.parent.parent.left?.equal(node.parent)) {
        if (
          node.parent.parent.right !== null &&
          node.parent.parent.right.color === COLORS.red
        ) {
          this.recolor(node);
        } else {
          this.rotateSubtree(node);
        }
      } else {
        if (
          node.parent.parent.left !== null &&
          node.parent.parent.left.color === COLORS.red
        ) {
          this.recolor(node);
        } else {
          this.rotateSubtree(node);
        }
      }
    }
  }

  protected recolor(node: RBNode<T>): void {
    if (node.parent.parent?.left.equal(node.parent)) {
      if (node.parent.parent.right !== null) {
        node.parent.parent.right.color = COLORS.black;
      }
    } else {
      if (node.parent.parent.left !== null) {
        node.parent.parent.left.color = COLORS.black;
      }
    }
    node.parent.color = COLORS.black;
    node.parent.parent.color = COLORS.red;
  }

  protected rotateSubtree(node: RBNode<T>, deletion: boolean = false): void {
    if (node.parent.left?.equal(node)) {
      if (node.parent.parent.left?.equal(node.parent)) {
        this.rightRotation(node.parent.parent);
        if (!deletion) {
          node.parent.colorFlip();
          node.parent.right.colorFlip();
        } else {
          node.parent.colorFlip();
          node.parent.left?.colorFlip();
          node.parent.right.color = COLORS.black;
        }
      } else {
        this.rightLeftRotation(node.parent.parent);
        if (!deletion) {
          node.colorFlip();
          node.left.colorFlip();
        } else {
          node.left.color = COLORS.black;
        }
      }
    } else {
      if (node.parent.parent.left?.equal(node.parent)) {
        this.leftRightRotation(node.parent.parent);
        if (!deletion) {
          node.colorFlip();
          node.right.colorFlip();
        } else {
          node.right.color = COLORS.black;
        }
      } else {
        this.leftRotation(node.parent.parent);
        if (!deletion) {
          node.parent.colorFlip();
          node.parent.left.colorFlip();
        } else {
          node.parent.colorFlip();
          node.parent.right?.colorFlip();
          node.parent.left.color = COLORS.black;
        }
      }
    }
  }

  protected rightRotation(node: RBNode<T>): void {
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

  protected leftRotation(node: RBNode<T>): void {
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

  protected leftRightRotation(node: RBNode<T>): void {
    this.leftRotation(node.left);
    this.rightRotation(node);
  }

  protected rightLeftRotation(node: RBNode<T>): void {
    this.rightRotation(node.right);
    this.leftRotation(node);
  }

  public delete(node: RBNode<T>): void {
    let nodeToDelete = this.find(node);
    let nodeToExchange = this.findNodeToExchange(nodeToDelete);

    this.balanceDeleteNode(nodeToDelete, nodeToExchange);

    this.root.color = COLORS.black;
  }

  protected balanceDeleteNode(
    nodeToDelete: RBNode<T>,
    nodeToExchange: RBNode<T>
  ): void {
    if (nodeToExchange !== null) {
      if (nodeToExchange.color === COLORS.red) {
        let nodeToExchangeBuffer: RBNode<T> = nodeToExchange.clone();
        this.deleteNode(nodeToExchange);
        nodeToDelete.copy(nodeToExchangeBuffer);
        return;
      } else {
        let nodeToExchangeBuffer: RBNode<T> = nodeToExchange.clone();
        this.balanceDeleteNode(
          nodeToExchange,
          this.findNodeToExchange(nodeToExchange)
        );
        nodeToDelete.copy(nodeToExchangeBuffer);
        return;
      }
    } else {
      if (nodeToDelete.color === COLORS.red) {
        this.deleteNode(nodeToDelete);
        return;
      } else {
        let nodeToDeleteParent: RBNode<T> = nodeToDelete.parent;
        this.deleteNode(nodeToDelete);
        this.resolveDoubleBlackCase(
          (null as unknown) as RBNode<T>,
          nodeToDeleteParent
        );
        return;
      }
    }
  }

  protected findNodeToExchange(node: RBNode<T>): RBNode<T> {
    if (node.right === null && node.left === null) {
      return (null as unknown) as RBNode<T>;
    } else if (node.left !== null) {
      return this.findMax(node.left) as RBNode<T>;
    } else if (node.right !== null) {
      return node.right;
    }

    return (null as unknown) as RBNode<T>;
  }

  protected resolveDoubleBlackCase(node: RBNode<T>, parent?: RBNode<T>): void {
    if (node?.equal(this.root)) {
      this.root.color = COLORS.black;
      return;
    }

    let nodePart: RBNode<T> = (null as unknown) as RBNode<T>;

    if (node === null) nodePart = parent as RBNode<T>;
    else nodePart = node.parent;

    const ifNodeNullComparator: Function = (_node: RBNode<T>): boolean =>
      _node === null;
    const ifNodeNotNullComparator: Function = (
      _node1: RBNode<T>,
      _node2: RBNode<T>
    ): boolean => _node1?.equal(_node2);

    const comparator: Function =
      node === null ? ifNodeNullComparator : ifNodeNotNullComparator;

    if (comparator(nodePart.left, node)) {
      if (
        nodePart.right !== null &&
        (nodePart.right.right?.color === COLORS.red ||
          nodePart.right.left?.color === COLORS.red)
      ) {
        if (nodePart.right.right?.color === COLORS.red) {
          this.rotateSubtree(nodePart.right.right, true);
        } else if (nodePart.right.left?.color === COLORS.red) {
          this.rotateSubtree(nodePart.right.left, true);
        }
      } else {
        if (nodePart.right !== null) {
          nodePart.right.color = COLORS.red;
        }
        if (nodePart.color === COLORS.red) {
          nodePart.color = COLORS.black;
        } else {
          this.resolveDoubleBlackCase(nodePart);
        }
      }
    } else {
      if (
        nodePart.left !== null &&
        (nodePart.left.right?.color === COLORS.red ||
          nodePart.left.left?.color === COLORS.red)
      ) {
        if (nodePart.left.left?.color === COLORS.red) {
          this.rotateSubtree(nodePart.left.left, true);
        } else if (nodePart.left.right?.color === COLORS.red) {
          this.rotateSubtree(nodePart.left.right, true);
        }
      } else {
        if (nodePart.left !== null) {
          nodePart.left.color = COLORS.red;
        }
        if (nodePart.color === COLORS.red) {
          nodePart.color = COLORS.black;
        } else {
          this.resolveDoubleBlackCase(nodePart);
        }
      }
    }
  }

  public find(node: RBNode<T>): RBNode<T> {
    return this.findNode(this.root, node) as RBNode<T>;
  }

  protected showTree(node: RBNode<T>, height: number): void {
    if (node === null) {
      return;
    }
    this.showTree(node.left, height + 1);
    let output: string =
      (node.color === COLORS.red ? "\x1b[31m" : "\x1b[37m") +
      "-".repeat(height) +
      ">" +
      node.content() +
      "\x1b[0m";
    console.log(output);
    this.showTree(node.right, height + 1);
  }
}

export default RBTree;
