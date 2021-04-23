import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

type Props<T> = { draw: DrawFunction<T>; data: Array<any> };
type DrawFunction<T> = (
  ctx: CanvasRenderingContext2D,
  element: T,
  adj: number
) => void;

const Canvas: React.FC<Props<any>> = (props: Props<any>) => {
  const { data, draw } = props;
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth * 0.8);
  const [height, setHeight] = useState(window.innerHeight * 0.5);

  const drawAll = useCallback(
    (context: CanvasRenderingContext2D, width: number) =>
      data.forEach((el) => {
        requestAnimationFrame(() => {
          let widthAdjustment =
            (width - (data[data.length - 1].x - data[0].x)) / 2;
          draw(context, el, widthAdjustment);
        });
      }),
    [data, draw, width]
  );

  const resize = useCallback(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    requestAnimationFrame(() =>
      context.clearRect(0, 0, canvas.width, canvas.height)
    );

    const prevWidth = canvas.width;
    const prevHeight = canvas.height;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.5;
    context.scale(canvas.width / prevWidth, canvas.height / prevHeight);

    setHeight(window.innerHeight * 0.5);
    setWidth(window.innerWidth * 0.8);

    requestAnimationFrame(() =>
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height)
    );
    drawAll(context, window.innerWidth * 0.8);
  }, [drawAll]);

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", () => resize);
    };
  }, [resize]);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    requestAnimationFrame(() =>
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height)
    );
    drawAll(context, context.canvas.width);

    return () => {
      requestAnimationFrame(() =>
        context.clearRect(0, 0, canvas.width, canvas.height)
      );
    };
  }, [data, drawAll]);

  return (
    <canvas ref={canvasRef} width={width} height={height}>
      Sorry, your browser is not supported
    </canvas>
  );
};

export default Canvas;
