import { ArrowTool } from './tools/arrow-tool';
import { CircleTool } from './tools/circle-tool';
import { EraserTool } from './tools/eraser-tool';
import { PenTool } from './tools/pen-tool';
import { SelectTool } from './tools/select-tool';
import { ToolStrategy } from './tools/tool-strategy';
import { ToolType } from '../ui/toolbar/types';

export class ToolFactory {
  static create(
    toolType: ToolType,
    color?: string,
    lineWidth?: number,
    saveState?: () => void
  ): ToolStrategy {
    switch (toolType) {
      case 'pen':
        return new PenTool(color, lineWidth, saveState);
      case 'arrow':
        return new ArrowTool(color, lineWidth, saveState);
      case 'circle':
        return new CircleTool(color, lineWidth, saveState);
      case 'eraser':
        return new EraserTool(saveState);
      case 'select':
      default:
        return new SelectTool();
    }
  }
}
