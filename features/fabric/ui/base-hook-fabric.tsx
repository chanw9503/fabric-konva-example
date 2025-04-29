'use client';

import { useRef, useState } from 'react';

import Toolbar from './toolbar';
import { useDrawingCanvas } from '../hooks/use-drawing-canvas';
import ColorPalette from './toolbar/color-palette';
import EditorToolbar from './toolbar/editor-tool-bar';
import { ToolType } from './toolbar/types';
import { TrashIcon } from '@/shared/icons';

const DEFAULT_LINE_WIDTH = 5;

interface DrawingCanvasProps {
  imageUrl?: string;
}

const BaseHookFabricCanvas = ({ imageUrl }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tool, setTool] = useState<ToolType>('pen');
  const [color, setColor] = useState('#000000');

  const { handleClear } = useDrawingCanvas({
    imageUrl,
    canvasRef,
    tool,
    color,
    lineWidth: DEFAULT_LINE_WIDTH,
  });

  return (
    <div className="space-y-4">
      <div className="border-gray-2 mx-auto flex items-center w-fit justify-center rounded-md border">
        <canvas ref={canvasRef} width={380} height={508} />
      </div>
      <Toolbar>
        <ColorPalette color={color} onChangeColor={(color) => setColor(color)} />
        <div className="mt-6" />
        <div className="flex items-center justify-center gap-4">
          <EditorToolbar selected={tool} onSelect={(tool) => setTool(tool)} />
          <button
            onClick={handleClear}
            className="text-primary-1 flex size-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-100 active:bg-gray-200">
            <TrashIcon />
          </button>
        </div>
        <div className="mt-6" />
      </Toolbar>
    </div>
  );
};

export default BaseHookFabricCanvas;
