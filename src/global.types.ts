import { Color } from "./lib/tree/types/node";

export type Shape = "circle" | "rectangle";

export type DrawableNode<T> = RawDrawableNode<T> & {
  shape: Shape;
  fill: boolean;
};

export type RawDrawableNode<T> = Coordinates & {
  left: Coordinates;
  right: Coordinates;
  data: T;
  color?: Color;
};

export type Coordinates = {
  x: number;
  y: number;
};
