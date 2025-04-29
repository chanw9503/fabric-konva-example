import { Canvas, Circle, TEvent } from 'fabric';
import { ToolStrategy } from './tool-strategy';

export class EraserTool implements ToolStrategy {
  private onMouseDown?: (opt: TEvent) => void;
  private saveState?: () => void;

  constructor(saveState?: () => void) {
    this.saveState = saveState;
  }

  enable(canvas: Canvas) {
    canvas.selection = false;

    canvas.getObjects().forEach((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });

    this.onMouseDown = (opt) => {
      const pointer = canvas.getScenePoint(opt.e);

      const circleTarget = canvas.getObjects().find((obj) => {
        if (obj.type !== 'circle') return false;

        const circle = obj as Circle;
        const dx = pointer.x - (circle.left ?? 0);
        const dy = pointer.y - (circle.top ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = (circle.radius ?? 0) * (circle.scaleX ?? 1);

        return Math.abs(dist - radius) <= 5;
      });

      if (circleTarget) {
        canvas.remove(circleTarget);
        this.saveState?.();
      }

      const target = canvas.findTarget(opt.e);
      if (
        target &&
        target !== canvas.backgroundImage &&
        target.type !== 'circle'
      ) {
        const toRemove = target.group ?? target;
        canvas.remove(toRemove);
        this.saveState?.();
      }

      canvas.discardActiveObject();
      canvas.renderAll();
    };

    canvas.on('mouse:down', this.onMouseDown);
  }

  disable(canvas: Canvas) {
    canvas.selection = false;

    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    if (this.onMouseDown) {
      canvas.off('mouse:down', this.onMouseDown);
    }
  }
}
