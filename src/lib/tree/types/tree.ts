import { INode } from "./node";

export interface ITree {
  add(node: INode): void;
  delete(node: INode): void;
  find(node: INode): INode;
}
