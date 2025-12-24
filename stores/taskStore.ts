
import { create } from 'zustand';
import { Task, Milestone, LifeGoal } from '../types';
import { MOCK_TASKS, MOCK_MILESTONES, MOCK_LIFE_GOALS } from '../constants';

interface TaskState {
  tasks: Task[];
  weekTasks: Task[];
  monthTasks: Task[];
  yearTasks: Task[];
  milestones: Milestone[];
  lifeGoals: LifeGoal[];
  setTasks: (tasks: Task[]) => void;
  setWeekTasks: (tasks: Task[]) => void;
  setMonthTasks: (tasks: Task[]) => void;
  setYearTasks: (tasks: Task[]) => void;
  setMilestones: (milestones: Milestone[]) => void;
  setLifeGoals: (lifeGoals: LifeGoal[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: MOCK_TASKS,
  weekTasks: [],
  monthTasks: [],
  yearTasks: [],
  milestones: MOCK_MILESTONES,
  lifeGoals: MOCK_LIFE_GOALS,
  setTasks: (tasks) => set({ tasks }),
  setWeekTasks: (weekTasks) => set({ weekTasks }),
  setMonthTasks: (monthTasks) => set({ monthTasks }),
  setYearTasks: (yearTasks) => set({ yearTasks }),
  setMilestones: (milestones) => set({ milestones }),
  setLifeGoals: (lifeGoals) => set({ lifeGoals }),
}));
