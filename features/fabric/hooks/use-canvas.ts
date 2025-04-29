import { Canvas } from 'fabric';
import { useRef } from 'react';

export const useCanvas = () => {
  const canvasRef = useRef<Canvas | null>(null);

  const initCanvas = (element: HTMLCanvasElement) => {
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    const canvas = new Canvas(element, {
      isDrawingMode: false,
      selection: false,
    });
    canvasRef.current = canvas;
  };

  const disposeCanvas = () => {
    canvasRef.current?.dispose();
    canvasRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (obj !== canvas.backgroundImage) {
        canvas.remove(obj);
      }
    });
    canvas.renderAll();
  };

  return {
    canvasRef,
    initCanvas,
    disposeCanvas,
    clearCanvas,
  };
};
