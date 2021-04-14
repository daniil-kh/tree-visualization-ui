class PositionedNode {
  protected _x: number;
  protected _y: number;
  protected _preliminary: number;
  protected _modifier: number;

  constructor() {
    this._x = 0;
    this._y = 0;
    this._preliminary = 0;
    this._modifier = 0;
  }

  get x(): number {
    return this._x;
  }
  set x(x: number) {
    this._x = x;
  }
  get y(): number {
    return this._y;
  }
  set y(y: number) {
    this._y = y;
  }
  get preliminary(): number {
    return this._preliminary;
  }
  set preliminary(preliminary: number) {
    this._preliminary = preliminary;
  }
  get modifier(): number {
    return this._modifier;
  }
  set modifier(modifier: number) {
    this._modifier = modifier;
  }
}

export abstract class INode extends PositionedNode {
  protected abstract _right: INode;
  protected abstract _left: INode;
  protected abstract _parent: INode;
  constructor() {
    super();
  }
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
