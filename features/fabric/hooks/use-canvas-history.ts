import { Canvas } from 'fabric';
import { useRef } from 'react';

export const useCanvasHistory = (canvasRef: React.RefObject<Canvas | null>) => {
  const historyStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const maxHistoryLength = 50;

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON());
    historyStack.current.push(json);

    if (historyStack.current.length > maxHistoryLength) {
      historyStack.current.shift();
    }

    redoStack.current = [];
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || historyStack.current.length === 0) return;

    const currentState = JSON.stringify(canvas.toJSON());
    redoStack.current.push(currentState);

    const lastState = historyStack.current.pop();
    if (lastState) {
      canvas.loadFromJSON(lastState, () => {
        canvas.renderAll();
      });
    }
  };

  const redo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const currentState = JSON.stringify(canvas.toJSON());
    historyStack.current.push(currentState);

    const nextState = redoStack.current.pop();
    if (nextState) {
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
      });
    }
  };

  return {
    saveState,
    undo,
    redo,
  };
};
