import { Canvas } from 'fabric';

export interface ToolStrategy {
  enable(canvas: Canvas): void;
  disable(canvas: Canvas): void;
}
