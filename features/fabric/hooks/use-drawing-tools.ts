import { Canvas } from 'fabric';
import { useArrowTool } from './use-arrow-tool';
import { useCircleTool } from './use-circle-tool';
import { useEraserTool } from './use-eraser-tool';
import { usePenTool } from './use-pen-tool';
import { useSelectTool } from './use-select-tool';
import { ToolType } from '../ui/toolbar/types';

export const useDrawingTools = (
  canvasRef: React.RefObject<Canvas | null>,
  saveState: () => void
) => {
  const { enablePenTool } = usePenTool(canvasRef, saveState);
  const { enableArrowTool } = useArrowTool(canvasRef, saveState);
  const { enableCircleTool } = useCircleTool(canvasRef, saveState);
  const { enableSelectTool } = useSelectTool(canvasRef);
  const { enableEraserTool } = useEraserTool(canvasRef, saveState);

  const setTool = (toolType: ToolType, color: string, lineWidth: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 공통 초기화
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    switch (toolType) {
      case 'pen':
        enablePenTool(color, lineWidth);
        break;
      case 'arrow':
        enableArrowTool(color, lineWidth);
        break;
      case 'circle':
        enableCircleTool(color, lineWidth);
        break;
      case 'eraser':
        enableEraserTool();
        break;
      case 'select':
      default:
        enableSelectTool();
    }
  };

  return { setTool };
};
