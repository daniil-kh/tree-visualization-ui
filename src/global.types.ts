import { Color } from "./lib/tree/types/node";

export type Shape = "circle" | "rectangle";

export type DrawableNode<T> = RawDrawableNode<T> & {
  shape: Shape;
  fill: boolean;
};

export type RawDrawableNode<T> = Coordinates & {
  parent?: Coordinates;
  data: T;
  color?: Color;
  preliminary: number;
  modifier: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type TreeType = "binary" | "avl" | "red-black";
