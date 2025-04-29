import { useCallback } from 'react';
import { Shape } from '../types';

export const usePenTool = (
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  isDrawingRef: React.MutableRefObject<boolean>,
  color: string
) => {
  const handleDown = useCallback(
    (pos: { x: number; y: number }) => {
      isDrawingRef.current = true;
      setShapes((prev) => [
        ...prev,
        { type: 'line', tool: 'pen', points: [pos.x, pos.y], strokeColor: color },
      ]);
    },
    [color, isDrawingRef, setShapes]
  );

  const handleMove = useCallback(
    (pos: { x: number; y: number }) => {
      if (!isDrawingRef.current) return;
      setShapes((prevShapes) => {
        const updated = [...prevShapes];
        const last = updated[updated.length - 1];
        if (last?.type === 'line' && last.tool === 'pen') {
          const newPoints = last.points.concat([pos.x, pos.y]);
          updated[updated.length - 1] = { ...last, points: newPoints };
        }
        return updated;
      });
    },
    [isDrawingRef, setShapes]
  );

  const handleUp = useCallback(() => {
    isDrawingRef.current = false;
  }, [isDrawingRef]);

  return { handleDown, handleMove, handleUp };
};
