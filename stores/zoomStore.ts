
import { create } from 'zustand';
import { ZoomLevel } from '../types';

interface ZoomState {
  currentLevel: ZoomLevel;
  prevLevel: ZoomLevel;
  setZoom: (level: ZoomLevel) => void;
}

export const useZoomStore = create<ZoomState>((set) => ({
  currentLevel: ZoomLevel.DAY,
  prevLevel: ZoomLevel.DAY,
  setZoom: (level) => set((state) => ({ 
    prevLevel: state.currentLevel, 
    currentLevel: level 
  })),
}));
