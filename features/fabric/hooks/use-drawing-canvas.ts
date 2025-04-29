import { FabricImage } from 'fabric';
import { useEffect } from 'react';
import { useCanvas } from './use-canvas';
import { useCanvasExporter } from './use-canvas-exporter';
import { useCanvasHistory } from './use-canvas-history';
import { useDrawingTools } from './use-drawing-tools';
import { ToolType } from '../ui/toolbar/types';

interface UseDrawingCanvasProps {
  imageUrl?: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  tool: ToolType;
  color: string;
  lineWidth: number;
}

export const useDrawingCanvas = ({
  imageUrl,
  canvasRef,
  tool,
  color,
  lineWidth,
}: UseDrawingCanvasProps) => {
  const { canvasRef: internalCanvasRef, initCanvas, clearCanvas } = useCanvas();
  const { saveState } = useCanvasHistory(internalCanvasRef);
  const { setTool } = useDrawingTools(internalCanvasRef, saveState);
  const { exportImage } = useCanvasExporter(internalCanvasRef, imageUrl || '');

  useEffect(() => {
    if (!canvasRef.current) return;
    if (internalCanvasRef.current) return;
    initCanvas(canvasRef.current);
  }, [initCanvas, canvasRef, internalCanvasRef]);

  useEffect(() => {
    const loadImage = async () => {
      if (imageUrl) {
        const canvas = internalCanvasRef.current;
        if (!canvas) return;

        const img = await FabricImage.fromURL(imageUrl, {
          crossOrigin: 'anonymous',
        });
        img.set({ selectable: false, evented: false });
        img.scaleToWidth(canvas.getWidth());
        img.scaleToHeight(canvas.getHeight());
        canvas.backgroundImage = img;
        canvas.requestRenderAll();
      }
    };

    void loadImage(); // 호출
  }, [imageUrl, internalCanvasRef]);

  // 툴 변경될 때마다 적용
  useEffect(() => {
    if (!internalCanvasRef.current) return;
    setTool(tool, color, lineWidth);
  }, [tool, color, lineWidth, setTool, internalCanvasRef]);

  return {
    fabricCanvasRef: internalCanvasRef, // fabric 캔버스 Ref
    handleClear: clearCanvas,
    exportImage,
  };
};
