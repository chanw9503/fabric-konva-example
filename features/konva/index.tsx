'use client';

import React, { useState } from 'react';
import { ToolType } from './types';
import EditorToolbar from './editor-tool-bar';
import EditorCanvas from './editor-canvas';
import ColorPalette from './tools/color-palette';

const KnovaCanvas = () => {
  const [tool, setTool] = useState<ToolType>('pen');
  const [color, setColor] = useState<string>('#df4b26'); // 기본 색상
  return (
    <div className="space-y-4">
      <div className="border-gray-2 mx-auto w-fit flex items-center justify-center rounded-md border">
        <EditorCanvas tool={tool} color={color} />
      </div>

      <div className="flex items-center justify-center h-[200px] flex-col gap-4">
        <ColorPalette color={color} onChangeColor={setColor} />
        <EditorToolbar selected={tool} onSelect={setTool} />
      </div>
    </div>
  );
};

export default KnovaCanvas;
