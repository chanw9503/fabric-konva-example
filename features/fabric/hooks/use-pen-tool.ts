import { Canvas, PencilBrush } from 'fabric';
import { RefObject } from 'react';

export const usePenTool = (
  canvasRef: RefObject<Canvas | null>,
  saveState: () => void
) => {
  const enablePenTool = (color: string, lineWidth: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const brush = new PencilBrush(canvas);
    brush.color = color;
    brush.width = lineWidth;
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;

    canvas.on('mouse:up', saveState);
  };

  return { enablePenTool };
};
