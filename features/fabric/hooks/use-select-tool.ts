import { Canvas } from 'fabric';
import { RefObject } from 'react';

export const useSelectTool = (canvasRef: RefObject<Canvas | null>) => {
  const enableSelectTool = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.selection = true;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });
  };

  return { enableSelectTool };
};
