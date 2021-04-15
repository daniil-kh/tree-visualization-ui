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
    //this.positionTree(coordinates);
    //this.show();

    //console.log("--------------------------------------------\n");

    console.log(
      this.getNodeLayer(this.root, this.find(new BNode<T>((1 as unknown) as T)))
    );

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

  protected positionTree(coordinates: Coordinates): boolean {
    if (this.root !== null) {
      this.firstWalk(this.root, 0, this.findHeight(this.root, 0));
      let xTopAdjustment = coordinates.x - this.root.preliminary;
      let yTopAdjustment = coordinates.y;
      let result: boolean = this.secondWalk(
        this.root,
        0,
        0,
        xTopAdjustment,
        yTopAdjustment,
        this.findHeight(this.root, 0)
      );
      return result;
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
      let rightmost: INode = this.getFirstChild(node);
      this.firstWalk(leftmost, level + 1, maxDepth);
      while (this.getRightSibling(rightmost) !== null) {
        rightmost = this.getRightSibling(rightmost);
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
    console.log("SECONDWALK");
    let result = true;
    if (level <= maxDepth) {
      /*if (node.equal(this.root)) {
        if (this.getFirstChild(node) !== null) {
          result = this.secondWalk(
            this.getFirstChild(node),
            level + 1,
            modsum + node.modifier,
            xTopAdjustment,
            yTopAdjustment,
            maxDepth
          );
        }
      } else {*/
      if (this.getFirstChild(node) !== null) {
        result = this.secondWalk(
          this.getFirstChild(node),
          level + 1,
          modsum + node.modifier,
          xTopAdjustment,
          yTopAdjustment,
          maxDepth
        );
      }

      let xTemp: number = xTopAdjustment + node.preliminary + modsum;
      let yTemp: number = yTopAdjustment + level * levelSeparation;

      node.x = xTemp;
      node.y = yTemp;

      if (result && this.getRightSibling(node) !== null) {
        result = this.secondWalk(
          this.getRightSibling(node),
          level, // here the question
          modsum,
          xTopAdjustment,
          yTopAdjustment,
          maxDepth
        );
      }
      //}
    } else result = true;

    return result;
  }

  protected apportion(node: INode, level: number, maxDepth: number): void {
    //console.log();
    let leftmost: INode = this.getFirstChild(node);
    let nodeLayer = this.getNodeLayer(this.root, leftmost);
    let neighbor: INode = this.getLeftNeighbor(
      leftmost.parent,
      leftmost,
      nodeLayer - 1,
      nodeLayer
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
      let ancestorLeftmost = leftmost;
      let ancestorNeighbor = neighbor;
      for (let i: number = 0; i < compareDepth; ++i) {
        ancestorLeftmost = ancestorLeftmost.parent;
        ancestorNeighbor = ancestorNeighbor.parent;

        rightModsum += ancestorLeftmost.modifier;
        leftModsum += ancestorNeighbor.modifier;
      }

      let moveDistance: number =
        neighbor.preliminary +
        leftModsum +
        subtreeSeparation +
        this.meanNodeSize(/* this.getLeftSibling(node), node */) -
        (leftmost.preliminary + rightModsum);

      if (moveDistance > 0) {
        let leftSiblings: number = 0;
        let tempPtr: INode = node;
        while (tempPtr !== null && !tempPtr.equal(ancestorNeighbor)) {
          leftSiblings += 1;
          tempPtr = this.getLeftSibling(tempPtr);
        }

        if (tempPtr !== null) {
          let portion = moveDistance / leftSiblings;
          tempPtr = node;
          while (tempPtr !== null && !tempPtr.equal(ancestorNeighbor)) {
            tempPtr.preliminary += moveDistance;
            tempPtr.modifier += moveDistance;
            moveDistance -= portion;
            tempPtr = this.getLeftSibling(tempPtr);
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
        nodeLayer = this.getNodeLayer(this.root, leftmost);
        neighbor = this.getLeftNeighbor(
          leftmost.parent,
          leftmost,
          nodeLayer - 1,
          nodeLayer
        );
      }
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
    let layer = this.getNodeLayer(this.root, node);
    return this.getRightNeighbor(node.parent, node, layer - 1, layer);
  }

  protected getLeftSibling(node: INode): INode {
    let layer = this.getNodeLayer(this.root, node);
    return this.getLeftNeighbor(node.parent, node, layer - 1, layer);
  }

  protected getNodeLayer(currentNode: INode, node: INode): number {
    if (currentNode === null || node === null) return 0;
    if (currentNode.equal(node)) {
      return 0;
    }
    if (currentNode.compare(node) > 0) {
      return 1 + this.getNodeLayer(currentNode.right, node);
    } else {
      return 1 + this.getNodeLayer(currentNode.left, node);
    }
  }

  protected getRightNeighbor(
    currentNode: INode,
    node: INode,
    currentDepth: number,
    nodeDepth: number
  ): INode {
    console.log("RightNeighbor");
    if (node === null || currentNode === null)
      return (null as unknown) as INode;
    if (currentNode.equal(this.root)) {
      let neighbor = this.getLeftmostOffspring(currentNode.right, 0, nodeDepth);
      if (neighbor && neighbor.equal(node)) return (null as unknown) as INode;
      else return neighbor;
    }

    let neighbor = this.getLeftmostOffspring(
      currentNode.right,
      currentDepth + 1,
      nodeDepth
    );
    //console.log([currentNode, node, neighbor]);
    if (neighbor === null || neighbor.equal(node))
      return this.getRightNeighbor(
        currentNode.parent,
        node,
        currentDepth - 1,
        nodeDepth
      );

    return neighbor;
  }

  protected getLeftNeighbor(
    currentNode: INode,
    node: INode,
    currentDepth: number,
    nodeDepth: number
  ): INode {
    console.log("LeftNeighbor");
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

const siblingSeparation: number = 10;
const levelSeparation: number = 50;
const subtreeSeparation: number = 20;

export default BTree;
