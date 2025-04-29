/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stage, Layer, Line, Circle, Arrow } from 'react-konva';
import { useRef, useState } from 'react';
import { ToolType, Shape } from './types';
import { usePenTool, useCircleTool, useArrowTool, useEraserTool } from './tools';

interface EditorCanvasProps {
  tool: ToolType;
  color: string;
}

const EditorCanvas = ({ tool, color }: EditorCanvasProps) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const isDrawingRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  // 도구 훅 등록
  const penTool = usePenTool(setShapes, isDrawingRef, color);
  const circleTool = useCircleTool(setShapes, startPosRef, color);
  const arrowTool = useArrowTool(setShapes, startPosRef, color);
  const eraserTool = useEraserTool(setShapes, isDrawingRef);

  const toolMap = {
    pen: penTool,
    eraser: eraserTool,
    circle: circleTool,
    arrow: arrowTool,
    select: {
      handleDown: () => {},
      handleMove: () => {},
      handleUp: () => {},
    },
  };

  const activeTool = toolMap[tool] ?? {
    handleDown: () => {},
    handleMove: () => {},
    handleUp: () => {},
  };

  const onPointerDown = (e: any) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) activeTool.handleDown(pos);
  };

  const onPointerMove = (e: any) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    if ((tool === 'pen' || tool === 'eraser') && !isDrawingRef.current) return;

    activeTool.handleMove(pos);
  };

  const onPointerUp = () => {
    activeTool.handleUp?.();
    startPosRef.current = null;
    isDrawingRef.current = false;
  };

  return (
    <Stage
      width={380}
      height={510}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}>
      <Layer>
        {shapes.map((shape, i) => {
          if (shape.type === 'line') {
            const stroke = shape.tool === 'eraser' ? 'white' : shape.strokeColor;
            return (
              <Line
                key={i}
                points={shape.points}
                stroke={stroke}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  shape.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            );
          }

          if (shape.type === 'circle') {
            return (
              <Circle
                key={i}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={shape.strokeColor}
                strokeWidth={2}
                fillEnabled={false}
              />
            );
          }

          if (shape.type === 'arrow') {
            return (
              <Arrow
                key={i}
                points={shape.points}
                pointerLength={10}
                pointerWidth={10}
                fill={shape.strokeColor}
                stroke={shape.strokeColor}
                strokeWidth={4}
              />
            );
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default EditorCanvas;
