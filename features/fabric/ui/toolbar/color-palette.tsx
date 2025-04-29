import { CheckmarkIcon, PlusIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import React from 'react';

interface ColorPaletteProps {
  color: string;
  onChangeColor: (color: string) => void;
}

const COLORS = [
  '#ffffff',
  '#1c1c1c',
  '#f44336',
  '#ffca28',
  '#ffeb3b',
  '#4caf50',
  '#3f51b5',
  '#9c27b0',
];

const ColorPalette = ({ color, onChangeColor }: ColorPaletteProps) => {
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeColor(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      {COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onChangeColor(c)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-150'
          )}
          style={{ backgroundColor: c }}>
          {color === c && (
            <CheckmarkIcon
              width={14}
              height={14}
              className={cn('text-black', c === '#1c1c1c' ? 'text-white' : 'text-black')}
            />
          )}
        </button>
      ))}

      <label className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-300">
        <PlusIcon width={14} height={14} className="pointer-events-none text-gray-600" />
        <input
          type="color"
          onChange={handleCustomColorChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
};

export default ColorPalette;
