import React, { useRef, useEffect, useState } from "react";

type Props<T> = { draw: DrawFunction<T>; data: Array<any> };
type DrawFunction<T> = (ctx: CanvasRenderingContext2D, element: T) => void;

const Canvas: React.FC<Props<any>> = (props: Props<any>) => {
  const { data, draw } = props;
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth * 0.8);
  const [height, setHeight] = useState(window.innerHeight * 0.5);

  const resize = () => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.5;
    setHeight(window.innerHeight * 0.5);
    setWidth(window.innerWidth * 0.8);

    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", () => resize);
  });

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
    <canvas ref={canvasRef} width={width} height={height}>
      Sorry, your browser is not supported
    </canvas>
  );
};

export default Canvas;
