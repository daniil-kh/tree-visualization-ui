import React, { useRef, useEffect } from "react";

type Props<T> = { draw: DrawFunction<T>; data: Array<any> };
type DrawFunction<T> = (ctx: CanvasRenderingContext2D, element: T) => void;

const Canvas: React.FC<Props<any>> = (props: Props<any>) => {
  const { data, draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

    data.forEach((el) => draw(context, el));

    return () =>
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }, [data, draw]);

  return (
    <canvas ref={canvasRef} width={1920} height={720} {...rest}></canvas>
  );
};

export default Canvas;
