import { useCallback } from 'react';
import { Shape } from '../types';

export const useCircleTool = (
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  startPosRef: React.MutableRefObject<{ x: number; y: number } | null>,
  color: string
) => {
  const handleDown = useCallback(
    (pos: { x: number; y: number }) => {
      startPosRef.current = pos;
      setShapes((prev) => [
        ...prev,
        { type: 'circle', x: pos.x, y: pos.y, radius: 0, strokeColor: color },
      ]);
    },
    [color, setShapes, startPosRef]
  );

  const handleMove = useCallback(
    (pos: { x: number; y: number }) => {
      const start = startPosRef.current;
      if (!start) return;

      const dx = pos.x - start.x;
      const dy = pos.y - start.y;

      const centerX = (start.x + pos.x) / 2;
      const centerY = (start.y + pos.y) / 2;
      const radius = Math.sqrt(dx * dx + dy * dy) / 2;

      setShapes((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: 'circle',
          x: centerX,
          y: centerY,
          radius,
          strokeColor: color,
        };
        return updated;
      });
    },
    [color, setShapes, startPosRef]
  );

  const handleUp = useCallback(() => {}, []);

  return { handleDown, handleMove, handleUp };
};
