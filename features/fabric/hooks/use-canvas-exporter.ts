import { Canvas } from 'fabric';
import { RefObject } from 'react';

export const useCanvasExporter = (
  canvasRef: RefObject<Canvas | null>,
  imageUrl: string
) => {
  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return '';

    const base64Image = canvas.toDataURL({
      format: 'png',
      multiplier: 1,
    });

    const filename =
      imageUrl.substring(imageUrl.lastIndexOf('/') + 1) || 'canvas.png';

    return base64ToFile(base64Image, filename);
  };

  return { exportImage };
};

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1] ? arr[1] : '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
