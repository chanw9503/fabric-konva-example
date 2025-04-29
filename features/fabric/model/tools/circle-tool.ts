import { Canvas, Circle, TEvent } from 'fabric';
import { ToolStrategy } from './tool-strategy';

export class CircleTool implements ToolStrategy {
  private color: string;
  private lineWidth: number;
  private onMouseDown?: (opt: TEvent) => void;
  private onMouseMove?: (opt: TEvent) => void;
  private onMouseUp?: () => void;
  private saveState?: () => void;

  constructor(color?: string, lineWidth?: number, saveState?: () => void) {
    this.color = color ?? '#000000';
    this.lineWidth = lineWidth ?? 2;
    this.saveState = saveState;
  }

  enable(canvas: Canvas) {
    let circle: Circle | null = null;
    let startX = 0;
    let startY = 0;

    canvas.selection = false;

    this.onMouseDown = (opt: TEvent) => {
      const pointer = canvas.getScenePoint(opt.e);
      startX = pointer.x;
      startY = pointer.y;

      circle = new Circle({
        left: startX,
        top: startY,
        radius: 1,
        stroke: this.color,
        strokeWidth: this.lineWidth,
        fill: 'rgba(0,0,0,0.001)',
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });

      canvas.add(circle);
    };

    this.onMouseMove = (opt: TEvent) => {
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

    this.onMouseUp = () => {
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

      this.saveState?.();
    };

    canvas.on('mouse:down', this.onMouseDown);
    canvas.on('mouse:move', this.onMouseMove);
    canvas.on('mouse:up', this.onMouseUp);
  }

  disable(canvas: Canvas) {
    canvas.selection = false;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    if (this.onMouseDown) canvas.off('mouse:down', this.onMouseDown);
    if (this.onMouseMove) canvas.off('mouse:move', this.onMouseMove);
    if (this.onMouseUp) {
      this.saveState?.();
      canvas.off('mouse:up', this.onMouseUp);
    }
  }
}
