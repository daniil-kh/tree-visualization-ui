import React, { useRef, useEffect } from "react";

type Props<T> = { draw: DrawFunction<T>; data: Array<any> };
type DrawFunction<T> = (ctx: CanvasRenderingContext2D, element: T) => void;

const Canvas: React.FC<Props<any>> = (props: Props<any>) => {
  const { data, draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    context.restore();

    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

    data.forEach((el) => draw(context, el));

    return () =>
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }, [data, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.5}
      {...rest}
    >
      Sorry, your browser is not supported
    </canvas>
  );
};

export default Canvas;
