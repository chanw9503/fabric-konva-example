import { useCallback } from 'react';
import { Shape } from '../types';

export const useArrowTool = (
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  startPosRef: React.MutableRefObject<{ x: number; y: number } | null>,
  color: string
) => {
  const handleDown = useCallback(
    (pos: { x: number; y: number }) => {
      startPosRef.current = pos;
      setShapes((prev) => [
        ...prev,
        {
          type: 'arrow',
          points: [pos.x, pos.y, pos.x, pos.y],
          strokeColor: color, // ✅ 색상 포함
        },
      ]);
    },
    [setShapes, startPosRef, color] // ✅ color도 의존성에 포함
  );

  const handleMove = useCallback(
    (pos: { x: number; y: number }) => {
      const start = startPosRef.current;
      if (!start) return;

      setShapes((prevShapes) => {
        const updated = [...prevShapes];
        updated[updated.length - 1] = {
          type: 'arrow',
          points: [start.x, start.y, pos.x, pos.y],
          strokeColor: color, // ✅ 유지
        };
        return updated;
      });
    },
    [setShapes, startPosRef, color]
  );

  const handleUp = useCallback(() => {}, []);

  return { handleDown, handleMove, handleUp };
};
