import { Canvas, Group, Line, TEvent, Triangle } from 'fabric';
import { RefObject } from 'react';

export const useArrowTool = (
  canvasRef: RefObject<Canvas | null>,
  saveState: () => void
) => {
  const enableArrowTool = (color: string, lineWidth: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let arrowLine: Line | null = null;
    let triangle: Triangle | null = null;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (opt: TEvent) => {
      const pointer = canvas.getScenePoint(opt.e);
      startX = pointer.x;
      startY = pointer.y;

      arrowLine = new Line([startX, startY, startX, startY], {
        stroke: color,
        strokeWidth: lineWidth,
        selectable: false,
        evented: false,
      });

      triangle = new Triangle({
        left: startX,
        top: startY,
        originX: 'center',
        originY: 'center',
        angle: 0,
        width: 12,
        height: 15,
        fill: color,
        selectable: false,
        evented: false,
      });

      canvas.add(arrowLine, triangle);
    };

    const onMouseMove = (opt: TEvent) => {
      if (!arrowLine || !triangle) return;
      const pointer = canvas.getScenePoint(opt.e);

      arrowLine.set({ x2: pointer.x, y2: pointer.y });

      const angle = Math.atan2(pointer.y - startY, pointer.x - startX);
      triangle.set({
        left: pointer.x,
        top: pointer.y,
        angle: (angle * 180) / Math.PI + 90,
      });

      canvas.renderAll();
    };

    const onMouseUp = () => {
      if (!arrowLine || !triangle) return;

      const group = new Group([arrowLine, triangle], {
        selectable: false,
        hasControls: true,
        hasBorders: true,
        lockScalingFlip: true,
        subTargetCheck: true,
        objectCaching: false,
      });

      group._objects.forEach((obj) => {
        obj.set({ absolutePositioned: true });
      });

      canvas.remove(arrowLine, triangle);
      canvas.add(group);
      canvas.renderAll();

      arrowLine = null;
      triangle = null;

      saveState();
    };

    canvas.on('mouse:down', onMouseDown);
    canvas.on('mouse:move', onMouseMove);
    canvas.on('mouse:up', onMouseUp);
  };

  return { enableArrowTool };
};
