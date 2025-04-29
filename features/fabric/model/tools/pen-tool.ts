import { Canvas, PencilBrush } from 'fabric';
import { ToolStrategy } from './tool-strategy';

export class PenTool implements ToolStrategy {
  private color: string;
  private lineWidth: number;
  private saveState?: () => void;

  constructor(color?: string, lineWidth?: number, saveState?: () => void) {
    this.color = color ?? '#000000';
    this.lineWidth = lineWidth ?? 2;
    this.saveState = saveState;
  }

  enable(canvas: Canvas): void {
    const brush = new PencilBrush(canvas);
    brush.color = this.color;
    brush.width = this.lineWidth;
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;

    if (this.saveState) {
      canvas.on('mouse:up', this.saveState);
    }
  }

  disable(canvas: Canvas): void {
    canvas.isDrawingMode = false;
    if (this.saveState) {
      canvas.off('mouse:up', this.saveState);
    }
  }
}
