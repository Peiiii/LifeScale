
import { ZoomManager } from '../managers/ZoomManager';
import { TaskManager } from '../managers/TaskManager';

export class AppPresenter {
  public zoomManager: ZoomManager;
  public taskManager: TaskManager;

  constructor() {
    this.zoomManager = new ZoomManager();
    this.taskManager = new TaskManager();
  }

  // 可以在此处添加全局通信或跨模块协调逻辑
  logAction = (msg: string) => {
    console.log(`[Presenter Action]: ${msg}`);
  };
}
