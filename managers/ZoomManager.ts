
import { useZoomStore } from '../stores/zoomStore';
import { ZoomLevel } from '../types';

export class ZoomManager {
  changeZoom = (level: ZoomLevel) => {
    useZoomStore.getState().setZoom(level);
  };
}
