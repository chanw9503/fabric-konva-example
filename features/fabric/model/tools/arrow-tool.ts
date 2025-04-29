import { Canvas, Group, Line, TEvent, Triangle } from 'fabric';
import { ToolStrategy } from './tool-strategy';

export class ArrowTool implements ToolStrategy {
  private color: string;
  private lineWidth: number;
  private saveState?: () => void;

  private onMouseDown?: (opt: TEvent) => void;
  private onMouseMove?: (opt: TEvent) => void;
  private onMouseUp?: () => void;

  constructor(color?: string, lineWidth?: number, saveState?: () => void) {
    this.color = color ?? '#000000';
    this.lineWidth = lineWidth ?? 2;
    this.saveState = saveState;
  }

  enable(canvas: Canvas) {
    let arrowLine: Line | null = null;
    let triangle: Triangle | null = null;
    let startX = 0;
    let startY = 0;

    // ✅ Tool 변경 시, 기존 오브젝트 선택 못하게
    canvas.selection = false;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    // ✅ 핸들러를 this에 저장
    this.onMouseDown = (opt: TEvent) => {
      const pointer = canvas.getScenePoint(opt.e);
      startX = pointer.x;
      startY = pointer.y;

      arrowLine = new Line([startX, startY, startX, startY], {
        stroke: this.color,
        strokeWidth: this.lineWidth,
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
        fill: this.color,
        selectable: false,
        evented: false,
      });

      canvas.add(arrowLine, triangle);
    };

    this.onMouseMove = (opt: TEvent) => {
      if (!arrowLine || !triangle) return;
      const pointer = canvas.getScenePoint(opt.e);

      arrowLine.set({ x2: pointer.x, y2: pointer.y });

      const angle = Math.atan2(pointer.y - startY, pointer.x - startX);
      triangle.set({
        left: pointer.x,
        top: pointer.y,
        angle: (angle * 180) / Math.PI + 90,
      });

      canvas.requestRenderAll();
    };

    this.onMouseUp = () => {
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
      canvas.requestRenderAll();

      arrowLine = null;
      triangle = null;

      this.saveState?.();
    };

    canvas.on('mouse:down', this.onMouseDown);
    canvas.on('mouse:move', this.onMouseMove);
    canvas.on('mouse:up', this.onMouseUp);
  }

  disable(canvas: Canvas) {
    if (this.onMouseDown) canvas.off('mouse:down', this.onMouseDown);
    if (this.onMouseMove) canvas.off('mouse:move', this.onMouseMove);
    if (this.onMouseUp) canvas.off('mouse:up', this.onMouseUp);

    // 선택 끄기
    canvas.selection = false;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
  }
}
