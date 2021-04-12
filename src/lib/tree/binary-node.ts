import { INode } from "./types/node";

class BNode<T> extends INode {
  protected _parent: BNode<T>;
  protected _right: BNode<T>;
  protected _left: BNode<T>;
  protected _data: T;

  constructor(data: T = (null as unknown) as T) {
    super();
    this._parent = (null as unknown) as BNode<T>;
    this._right = (null as unknown) as BNode<T>;
    this._left = (null as unknown) as BNode<T>;
    this._data = data;
  }

  public get parent(): BNode<T> {
    return this._parent;
  }
  public set parent(node: BNode<T>) {
    this._parent = node;
  }

  public get left(): BNode<T> {
    return this._left;
  }
  public set left(node: BNode<T>) {
    this._left = node;
  }

  public get right(): BNode<T> {
    return this._right;
  }
  public set right(node: BNode<T>) {
    this._right = node;
  }

  public get data(): T {
    return this._data;
  }
  public set data(data: T) {
    this._data = data;
  }

  public clone(): BNode<T> {
    let newNode = new BNode<T>(this._data);
    newNode._parent = this._parent;
    newNode._left = this._left;
    newNode._right = this._right;

    return newNode;
  }

  public equal(node: BNode<T>): boolean {
    return this._data === node._data;
  }

  public compare(node: BNode<T>): number {
    if (this._data > node._data) {
      return 1;
    } else if (this._data < node._data) {
      return -1;
    } else {
      return 0;
    }
  }

  public copy(node: BNode<T>): void {
    this._data = node._data;
  }

  public content(): T {
    return this._data;
  }
}

export default BNode;
