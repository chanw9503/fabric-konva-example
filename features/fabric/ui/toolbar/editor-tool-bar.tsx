'use client';

import {
  ArrowIcon,
  CircleIcon,
  EraserIcon,
  PencilIcon,
  SelectIcon,
} from '@/shared/icons';
import React from 'react';

import { ToolType } from './types';

const tools: { type: ToolType; icon: React.ReactNode }[] = [
  { type: 'select', icon: <SelectIcon /> },
  { type: 'pen', icon: <PencilIcon /> },
  { type: 'circle', icon: <CircleIcon /> },
  { type: 'arrow', icon: <ArrowIcon /> },
  { type: 'eraser', icon: <EraserIcon /> },
];

interface EditorToolbarProps {
  selected: ToolType;
  onSelect?: (tool: ToolType) => void;
}

const EditorToolbar = ({ selected, onSelect }: EditorToolbarProps) => {
  return (
    <div className="flex flex-row gap-x-4">
      {tools.map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => onSelect?.(type)}
          className={`flex size-10 items-center justify-center rounded-full p-2 transition-colors ${
            selected === type
              ? 'bg-pink-100 text-pink-600'
              : 'text-pink-500 hover:bg-gray-100'
          }`}>
          {icon}
        </button>
      ))}
    </div>
  );
};

export default EditorToolbar;
