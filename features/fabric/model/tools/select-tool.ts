import { Canvas, Circle, TEvent } from 'fabric';
import { ToolStrategy } from './tool-strategy';

export class SelectTool implements ToolStrategy {
  private onMouseDown?: (opt: TEvent) => void;

  enable(canvas: Canvas) {
    canvas.selection = true;

    this.onMouseDown = (opt) => {
      const pointer = canvas.getScenePoint(opt.e);

      // 1. 먼저 원을 수동 거리 비교로 찾음
      const manualTarget = canvas.getObjects().find((obj) => {
        if (obj.type !== 'circle') return false;

        const circle = obj as Circle;
        const dx = pointer.x - (circle.left ?? 0);
        const dy = pointer.y - (circle.top ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = (circle.radius ?? 0) * (circle.scaleX ?? 1);

        return Math.abs(dist - radius) <= 5;
      });

      if (manualTarget) {
        manualTarget.selectable = true;
        manualTarget.evented = true;
        canvas.setActiveObject(manualTarget);
        canvas.renderAll();
        return;
      }
    };

    canvas.getObjects().forEach((obj) => {
      obj.selectable = true;
      obj.evented = true;
    });

    canvas.on('mouse:down', this.onMouseDown);
  }

  disable(canvas: Canvas) {
    if (this.onMouseDown) {
      canvas.off('mouse:down', this.onMouseDown);
    }

    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    canvas.selection = false;
  }
}
