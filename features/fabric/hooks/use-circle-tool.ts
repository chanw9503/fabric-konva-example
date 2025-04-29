import { Canvas, Circle, TEvent } from 'fabric';
import { RefObject } from 'react';

export const useCircleTool = (
  canvasRef: RefObject<Canvas | null>,
  saveState: () => void
) => {
  const enableCircleTool = (color: string, lineWidth: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.selection = false;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    let circle: Circle | null = null;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (opt: TEvent) => {
      const pointer = canvas.getScenePoint(opt.e);
      startX = pointer.x;
      startY = pointer.y;

      circle = new Circle({
        left: startX,
        top: startY,
        radius: 1,
        stroke: color,
        strokeWidth: lineWidth,
        fill: 'transparent',
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });

      canvas.add(circle);
    };

    const onMouseMove = (opt: TEvent) => {
      if (!circle) return;
      const pointer = canvas.getScenePoint(opt.e);
      const radius =
        Math.sqrt((pointer.x - startX) ** 2 + (pointer.y - startY) ** 2) / 2;

      circle.set({
        radius,
        left: (pointer.x + startX) / 2,
        top: (pointer.y + startY) / 2,
      });

      canvas.renderAll();
    };

    const onMouseUp = () => {
      if (!circle) return;

      circle.set({
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true,
        lockScalingFlip: true,
      });

      canvas.renderAll();
      circle = null;

      saveState();
    };

    canvas.on('mouse:down', onMouseDown);
    canvas.on('mouse:move', onMouseMove);
    canvas.on('mouse:up', onMouseUp);
  };

  return { enableCircleTool };
};
