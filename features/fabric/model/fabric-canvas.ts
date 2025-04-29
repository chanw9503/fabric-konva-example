import { Canvas, FabricImage } from 'fabric';
import { ToolFactory } from './tool-factory';
import { ToolStrategy } from './tools/tool-strategy';
import { ToolType } from '../ui/toolbar/types';

export class DrawingCanvas {
  private canvas: Canvas | null = null;
  private currentTool: ToolStrategy | null = null;
  private historyStack: string[] = [];
  private redoStack: string[] = [];
  private imageUrl?: string;
  private MAX_HISTORY = 50;

  constructor(imageUrl?: string) {
    this.imageUrl = imageUrl;
  }

  init(element: HTMLCanvasElement) {
    this.canvas = new Canvas(element, {
      isDrawingMode: true,
      selection: false,
    });

    requestAnimationFrame(async () => {
      await this.loadBackgroundImage();
      this.saveState();
    });
  }

  setTool(toolType: ToolType, color?: string, lineWidth?: number) {
    if (!this.canvas) return;
    this.currentTool?.disable(this.canvas);
    const newTool = ToolFactory.create(
      toolType,
      color,
      lineWidth,
      this.saveState.bind(this)
    );
    newTool.enable(this.canvas);
    this.currentTool = newTool;
  }

  clear() {
    if (!this.canvas) return;
    this.canvas.getObjects().forEach((obj) => {
      if (obj !== this.canvas?.backgroundImage) {
        this.canvas?.remove(obj);
      }
    });
    this.saveState();
    this.canvas.renderAll();
  }

  exportImage() {
    if (!this.canvas) return '';
    return this.canvas.toDataURL({ format: 'png', multiplier: 1 });
  }

  dispose() {
    this.currentTool?.disable(this.canvas!);
    this.canvas?.dispose();
    this.canvas = null;
    this.currentTool = null;
  }

  async undo() {
    if (!this.canvas || this.historyStack.length <= 1) return;

    const currentState = JSON.stringify(this.canvas.toDatalessJSON());
    this.redoStack.push(currentState);

    this.historyStack.pop();

    if (this.historyStack.length === 1) {
      // ✨ 초기 상태만 남으면 clear만 해버려
      this.clear();
    } else {
      const prevState = this.historyStack[this.historyStack.length - 1];
      if (prevState) {
        await this.loadCanvasState(prevState);
      }
    }
  }

  async redo() {
    if (!this.canvas || this.redoStack.length === 0) return;

    const currentState = JSON.stringify(this.canvas.toDatalessJSON());
    this.historyStack.push(currentState);

    const nextState = this.redoStack.pop();
    if (nextState) {
      await this.loadCanvasState(nextState);
    }
  }

  private saveState() {
    if (!this.canvas) return;

    const json = JSON.stringify(this.canvas.toDatalessJSON());

    const last = this.historyStack[this.historyStack.length - 1];

    if (json !== last) {
      this.historyStack.push(json);
      if (this.historyStack.length > this.MAX_HISTORY) {
        this.historyStack.shift();
      }
    }

    this.redoStack = [];
  }

  private async loadCanvasState(state: string) {
    if (!this.canvas) return;

    await new Promise<void>((resolve) => {
      this.canvas!.loadFromJSON(state, () => resolve());
    });

    await this.reapplyBackgroundImage();
    this.canvas.renderAll();
  }

  private async loadBackgroundImage() {
    if (!this.imageUrl || !this.canvas) return;

    const img = await FabricImage.fromURL(this.imageUrl, {
      crossOrigin: 'anonymous',
    });

    this.canvas.calcOffset();

    img.set({ selectable: false, evented: false });
    const canvasWidth =
      this.canvas.getWidth() || this.canvas.lowerCanvasEl.width;
    const canvasHeight =
      this.canvas.getHeight() || this.canvas.lowerCanvasEl.height;

    img.scaleToWidth(canvasWidth);
    img.scaleToHeight(canvasHeight);

    this.canvas.backgroundImage = img;
    this.canvas.renderAll();
  }

  private async reapplyBackgroundImage() {
    if (!this.canvas || !this.imageUrl) return;

    const img = await FabricImage.fromURL(this.imageUrl, {
      crossOrigin: 'anonymous',
    });

    this.canvas.calcOffset();

    const canvasWidth =
      this.canvas.getWidth() || this.canvas.lowerCanvasEl.width;
    const canvasHeight =
      this.canvas.getHeight() || this.canvas.lowerCanvasEl.height;

    img.set({ selectable: false, evented: false });
    img.scaleToWidth(canvasWidth);
    img.scaleToHeight(canvasHeight);

    this.canvas.backgroundImage = img;
  }
}
