'use client';

import { useEffect, useRef, useState } from 'react';
import Toolbar from './toolbar';
import ColorPalette from './toolbar/color-palette';
import EditorToolbar from './toolbar/editor-tool-bar';
import { ToolType } from './toolbar/types';
import { DrawingCanvas } from '../model/fabric-canvas';
import { TrashIcon } from '@/shared/icons';

const DEFAULT_LINE_WIDTH = 5;

interface DrawingCanvasProps {
  imageUrl?: string;
}

const BaseClassFabricCanvas = ({ imageUrl }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingCanvasRef = useRef<DrawingCanvas | null>(null);

  const [tool, setTool] = useState<ToolType>('pen');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    if (!canvasRef.current) return;

    // DrawingCanvas 클래스 인스턴스 생성
    drawingCanvasRef.current = new DrawingCanvas(imageUrl);
    drawingCanvasRef.current.init(canvasRef.current);

    return () => {
      drawingCanvasRef.current?.dispose();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!drawingCanvasRef.current) return;
    drawingCanvasRef.current.setTool(tool, color, DEFAULT_LINE_WIDTH);
  }, [tool, color]);

  const handleClear = () => {
    drawingCanvasRef.current?.clear();
  };

  const handleExport = () => {
    const result = drawingCanvasRef.current?.exportImage();
    console.log('exportImage', result);
  };

  const handleUndo = () => {
    drawingCanvasRef.current?.undo();
  };

  const handleRedo = () => {
    drawingCanvasRef.current?.redo();
  };

  return (
    <div className="space-y-4">
      <div className="border-gray-2 mx-auto flex items-center justify-center rounded-md border">
        <canvas ref={canvasRef} width={380} height={508} />
      </div>
      <Toolbar>
        <ColorPalette color={color} onChangeColor={setColor} />
        <div className="mt-6" />
        <div className="flex items-center justify-center gap-4">
          <EditorToolbar selected={tool} onSelect={setTool} />
          <button
            onClick={handleClear}
            className="text-primary-1 flex size-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-100 active:bg-gray-200">
            <TrashIcon />
          </button>
          <button onClick={handleUndo} className="rounded-md border p-2">
            Undo
          </button>
          <button onClick={handleRedo} className="rounded-md border p-2">
            Redo
          </button>
        </div>
        <div className="mt-6" />
      </Toolbar>
      <button onClick={handleExport}>extract</button>
    </div>
  );
};

export default BaseClassFabricCanvas;
