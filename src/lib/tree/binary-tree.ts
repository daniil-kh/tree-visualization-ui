import { INode } from "./types/node";
import { ITree } from "./types/tree";
import BNode from "./binary-node";
import { Coordinates, DrawableNode, RawDrawableNode } from "../../global.types";

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
    //this.show();
    //console.log("After positioning");
    this.positionTree(this.root, coordinates);
    //this.show();

    //console.log("--------------------------------------------\n");

    let nodes = this.getArrayOfNodes(this.root as BNode<T>);
    //console.log(nodes);

    return nodes;
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

  protected findHeight(node: INode, height: number): number {
    if (node === null) {
      return height - 1;
    }
    let left = this.findHeight(node.left, height + 1);
    let right = this.findHeight(node.right, height + 1);

    return left >= right ? left : right;
  }

  protected positionTree(node: INode, coordinates: Coordinates): boolean {
    if (node !== null) {
      this.firstWalk(node, 0, this.findHeight(this.root, 0));

      let xTopAdjustment = coordinates.x - node.preliminary;
      let yTopAdjustment = coordinates.y;

      return this.secondWalk(
        node,
        0,
        0,
        xTopAdjustment,
        yTopAdjustment,
        this.findHeight(this.root, 0)
      );
    } else return true;
  }

  protected firstWalk(node: INode, level: number, maxDepth: number): void {
    console.log("FIRSTWALK");
    node.modifier = 0;
    if (this.isLeaf(node) || level === maxDepth) {
      if (this.getLeftSibling(node) !== null) {
        node.preliminary =
          this.getLeftSibling(node).preliminary +
          siblingSeparation +
          this.meanNodeSize(/* this.getLeftSibling(node), node */);
      } else node.preliminary = 0;
    } else {
      let leftmost: INode = this.getFirstChild(node);
      let rightmost: INode = this.getLastChild(node);
      this.firstWalk(leftmost, level + 1, maxDepth);
      while (this.getRightSibling(rightmost) !== null) {
        rightmost = this.getRightSibling(rightmost);
        //rightmost = rightmost
        //  ? rightmost.clone()
        //  : ((null as unknown) as INode);
        this.firstWalk(rightmost, level + 1, maxDepth);
      }
      let midPoint: number = (leftmost.preliminary + rightmost.preliminary) / 2;
      if (this.getLeftSibling(node) !== null) {
        node.preliminary =
          this.getLeftSibling(node).preliminary +
          siblingSeparation +
          this.meanNodeSize(/* this.getLeftSibling(node), node */);
        node.modifier = node.preliminary - midPoint;
        this.apportion(node, level, maxDepth);
      } else node.preliminary = midPoint;
    }
  }

  protected secondWalk(
    node: INode,
    level: number,
    modsum: number,
    xTopAdjustment: number,
    yTopAdjustment: number,
    maxDepth: number
  ): boolean {
    console.log(node);
    let result = true;
    if (level <= maxDepth) {
      let xTemp: number = xTopAdjustment + node.preliminary + modsum;
      let yTemp: number = yTopAdjustment + level * levelSeparation;

      node.x = xTemp;
      node.y = yTemp;
      if (this.hasChild(node)) {
        result = this.secondWalk(
          this.getFirstChild(node),
          level + 1,
          modsum + node.modifier,
          xTopAdjustment,
          yTopAdjustment,
          maxDepth
        );

        if (result && this.getRightSibling(node) !== null) {
          result = this.secondWalk(
            this.getRightSibling(node),
            level,
            modsum,
            xTopAdjustment,
            yTopAdjustment,
            maxDepth
          );
        }
      }
    } else result = true;

    return result;
  }

  protected apportion(node: INode, level: number, maxDepth: number): void {
    let leftmost: INode = this.getFirstChild(node);
    //leftmost = leftmost ? leftmost.clone() : ((null as unknown) as INode);
    let neighbor: INode = this.getLeftNeighbor(
      node.parent,
      node,
      level - 1,
      level
    );
    let compareDepth: number = 1;
    let depthToStop = maxDepth - level;
    while (
      leftmost !== null &&
      neighbor !== null &&
      compareDepth <= depthToStop
    ) {
      let leftModsum = 0;
      let rightModsum = 0;
      let ancestorLeftmost = leftmost; //.clone();
      let ancestorNeighbor = neighbor; //.clone();
      for (let i: number = 0; i < compareDepth; ++i) {
        ancestorLeftmost = ancestorLeftmost.parent;
        //? ancestorLeftmost.parent.clone()
        //: ((null as unknown) as INode);
        ancestorNeighbor = ancestorNeighbor.parent;
        //? ancestorNeighbor.parent.clone()
        //: ((null as unknown) as INode);

        rightModsum = rightModsum + ancestorLeftmost.modifier;
        leftModsum = leftModsum + ancestorNeighbor.modifier;
      }

      let moveDistance: number =
        neighbor.preliminary +
        leftModsum +
        subtreeSeparation +
        this.meanNodeSize(/* this.getLeftSibling(node), node */) -
        (leftmost.preliminary + rightModsum);

      if (moveDistance > 0) {
        let leftSiblings: number = 0;
        let tempPtr: INode = node.clone();
        while (tempPtr !== null && tempPtr !== ancestorNeighbor) {
          leftSiblings += 1;
          tempPtr = this.getLeftSibling(tempPtr);
          //tempPtr = tempPtr ? tempPtr.clone() : ((null as unknown) as INode);
        }

        if (tempPtr !== null) {
          let portion = moveDistance / leftSiblings;
          tempPtr = node.clone();
          while (tempPtr !== ancestorNeighbor) {
            let originalNode: INode = this.find(tempPtr);
            originalNode.preliminary = originalNode.preliminary + moveDistance;
            originalNode.modifier = originalNode.modifier + moveDistance;
            moveDistance -= portion;
            tempPtr = this.getLeftSibling(tempPtr);
            //tempPtr = tempPtr ? tempPtr.clone() : ((null as unknown) as INode);
          }
        } else return;
      }

      ++compareDepth;
      if (this.isLeaf(leftmost)) {
        leftmost = this.getLeftmostOffspring(node, 0, compareDepth);
      } else {
        leftmost = this.getFirstChild(leftmost);
      }
      if (leftmost) {
        neighbor = this.getLeftNeighbor(
          leftmost.parent,
          leftmost,
          level - 1,
          level
        );
      }
      //leftmost = leftmost ? leftmost.clone() : ((null as unknown) as INode);
    }
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
      rightmost = rightmost ? rightmost.clone() : ((null as unknown) as INode);
      let leftmost = this.getLeftmostOffspring(rightmost, level + 1, depth);
      while (leftmost === null && this.getRightSibling(rightmost) !== null) {
        rightmost = this.getRightSibling(rightmost);
        rightmost = rightmost
          ? rightmost.clone()
          : ((null as unknown) as INode);
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
      leftmost = leftmost ? leftmost.clone() : ((null as unknown) as INode);
      let rightmost = this.getRightmostOffspring(leftmost, level + 1, depth);
      while (rightmost === null && this.getLeftSibling(leftmost) !== null) {
        leftmost = this.getLeftSibling(leftmost);
        leftmost = leftmost ? leftmost.clone() : ((null as unknown) as INode);
        rightmost = this.getRightmostOffspring(leftmost, level + 1, depth);
      }
      return rightmost;
    }
  }

  protected getFirstChild(node: INode): INode {
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
      if (node.parent.right && node.parent.right.equal(node))
        return (null as unknown) as INode;
      else return node.parent.right;
    }

    return (null as unknown) as INode;
  }

  protected getLeftSibling(node: INode) {
    if (node && node.parent) {
      if (node.parent.left && node.parent.left.equal(node))
        return (null as unknown) as INode;
      else return node.parent.left;
    }

    return (null as unknown) as INode;
  }

  protected getLeftNeighbor(
    currentNode: INode,
    node: INode,
    currentDepth: number,
    nodeDepth: number
  ): INode {
    if (node === null || currentNode === null)
      return (null as unknown) as INode;
    if (currentNode.equal(this.root)) {
      let neighbor = this.getRightmostOffspring(currentNode.left, 0, nodeDepth);
      if (neighbor && neighbor.equal(node)) return (null as unknown) as INode;
      else return neighbor;
    }

    let neighbor = this.getRightmostOffspring(
      currentNode.left,
      currentDepth + 1,
      nodeDepth
    );
    //console.log([currentNode, node, neighbor]);
    if (neighbor === null || neighbor.equal(node))
      return this.getLeftNeighbor(
        currentNode.parent,
        node,
        currentDepth - 1,
        nodeDepth
      );

    return neighbor;
  }

  protected meanNodeSize(): number {
    //Function MEANNODESIZE. This function returns the mean size of the two
    //passed nodes. It adds the size of the right half of lefthand node to the left
    //half of righthand node. If all nodes are the same size, this is a trivial calculation.
    return 40;
  }

  protected isLeaf(node: INode): boolean {
    if (node === null) return true;
    if (node.right === null && node.left === null) return true;

    return false;
  }

  protected hasChild(node: INode): boolean {
    if (node.right !== null || node.left !== null) return true;

    return false;
  }
}

const siblingSeparation: number = 50;
const levelSeparation: number = 50;
const subtreeSeparation: number = 60;

export default BTree;
