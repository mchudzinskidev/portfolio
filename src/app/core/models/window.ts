import { Type } from "@angular/core";

export interface Window {
  title: string;
  posX: number;
  posY: number;
  innerH: number;
  innerW: number;
  zIndex: number;
  isFullscreen: boolean;
  isMinimized: boolean;
  icon: string;
  component: Type<any>;
  inputs: Record<string, unknown>;
}