export type ToolType = 'select' | 'pen' | 'eraser' | 'circle' | 'arrow';

export type Shape =
  | { type: 'line'; tool: 'pen' | 'eraser'; points: number[]; strokeColor: string }
  | { type: 'circle'; x: number; y: number; radius: number; strokeColor: string }
  | { type: 'arrow'; points: number[]; strokeColor: string };
