import BNode from "./binary-node";
import BTree from "./binary-tree";
import AVLTree from "./avl-tree";
import RBNode from "./red-black-node";
import RBTree from "./red-black-tree";

const bTreeExample = (): void => {
  const tree: BTree<number> = new BTree<number>();
  const array: Array<number> = [
    8,
    7,
    6,
    6,
    4,
    5,
    20,
    25,
    15,
    16,
    14,
    24,
    24,
    23,
    23,
    22,
    22,
  ];
  array.forEach((element: number): void => {
    tree.add(new BNode<number>(element));
  });

  tree.show();
  tree.delete(new BNode<number>(25));
  console.log("After deleting: ");
  tree.show();
};

const avlTreeExample = (): void => {
  const avlTree: AVLTree<number> = new AVLTree<number>();
  const array: Array<number> = [
    2,
    17,
    16,
    5,
    1,
    13,
    18,
    8,
    4,
    20,
    6,
    14,
    7,
    3,
    12,
    15,
    19,
    9,
    11,
    10,
  ];
  array.forEach((element: number): void => {
    avlTree.add(new BNode<number>(element));
  });

  avlTree.show();
  console.log("\n\n");
  avlTree.delete(new BNode<number>(12));
  avlTree.show();
};

const rbTreeExample = (): void => {
  const rbTree: RBTree<number> = new RBTree<number>();
  const array: Array<number> = [
    3,
    19,
    11,
    1,
    29,
    18,
    2,
    6,
    28,
    10,
    12,
    9,
    25,
    26,
    14,
    17,
    30,
    21,
    7,
    5,
    27,
    13,
    4,
    8,
    24,
    22,
    16,
    23,
    15,
    20,
  ];
  array.forEach((element: number): void => {
    rbTree.add(new RBNode<number>(element));
  });

  rbTree.show();
  rbTree.delete(new RBNode<number>(11));
  console.log("After deleting:\n");
  rbTree.show();
};
