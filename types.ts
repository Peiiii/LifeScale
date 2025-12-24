
export enum ZoomLevel {
  DAY = 0,
  WEEK = 1,
  MONTH = 2,
  YEAR = 3,
  STRATEGY = 4, // 5 Years
  LIFETIME = 5
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  color?: string;
  // 新增：用于定位计划所属的时间段
  dayOfWeek?: string;   // 'Mon', 'Tue'...
  dayOfMonth?: number;  // 1-31
  monthOfYear?: number; // 0-11
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
}

export interface LifeGoal {
  id: string;
  title: string;
  description: string;
}
