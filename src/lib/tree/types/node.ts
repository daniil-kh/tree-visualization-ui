export abstract class INode {
  protected abstract _right: INode;
  protected abstract _left: INode;
  protected abstract _parent: INode;

  public abstract clone(): INode;
  public abstract equal(node: INode): boolean;
  public abstract compare(node: INode): number;
  public abstract copy(node: INode): void;
  public abstract content(): unknown;

  public abstract get parent(): INode;
  public abstract set parent(node: INode);

  public abstract get right(): INode;
  public abstract set right(node: INode);

  public abstract get left(): INode;
  public abstract set left(node: INode);
}

export type Color = "RED" | "BLACK" | "DOUBLE BLACK";

export type ColorsConstant = {
  red: Color;
  black: Color;
  double_black: Color;
};
