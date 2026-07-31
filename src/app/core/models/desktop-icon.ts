import { WindowType } from "../types/window-types";

export interface DesktopIcon {
  title: string;
  gridPosX: number;
  gridPosY: number;
  gridSize: 128;
  icon: string;
  wType: WindowType;
  selected: boolean;
}