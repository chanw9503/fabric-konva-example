import { Canvas, TEvent } from 'fabric';
import { RefObject } from 'react';

export const useEraserTool = (
  canvasRef: RefObject<Canvas | null>,
  saveState: () => void
) => {
  const enableEraserTool = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.selection = true;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });

    const onMouseDown = (opt: TEvent) => {
      const target = canvas.findTarget(opt.e);
      if (target && target !== canvas.backgroundImage) {
        const toRemove = target.group ?? target;
        canvas.remove(toRemove);
        canvas.discardActiveObject();
        canvas.renderAll();

        saveState();
      }
    };

    canvas.on('mouse:down', onMouseDown);
  };

  return { enableEraserTool };
};
