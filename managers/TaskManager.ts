
import { useTaskStore } from '../stores/taskStore';
import { Task, LifeGoal, Milestone } from '../types';

export class TaskManager {
  toggleTask = (id: string, listName: 'tasks' | 'weekTasks' | 'monthTasks' | 'yearTasks' = 'tasks') => {
    const store = useTaskStore.getState();
    const list = store[listName];
    const setter = (store as any)[`set${listName.charAt(0).toUpperCase() + listName.slice(1)}`];
    
    const newList = list.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setter(newList);
  };

  addTask = (title: string) => {
    const { tasks, setTasks } = useTaskStore.getState();
    const newTask = this.createBaseTask(title);
    setTasks([...tasks, newTask]);
  };

  addWeekTask = (title: string, dayOfWeek: string) => {
    const { weekTasks, setWeekTasks } = useTaskStore.getState();
    const newTask = { ...this.createBaseTask(title), dayOfWeek };
    setWeekTasks([...weekTasks, newTask]);
  };

  addMonthTask = (title: string, dayOfMonth: number) => {
    const { monthTasks, setMonthTasks } = useTaskStore.getState();
    const newTask = { ...this.createBaseTask(title), dayOfMonth };
    setMonthTasks([...monthTasks, newTask]);
  };

  addYearTask = (title: string, monthOfYear: number) => {
    const { yearTasks, setYearTasks } = useTaskStore.getState();
    const newTask = { ...this.createBaseTask(title), monthOfYear };
    setYearTasks([...yearTasks, newTask]);
  };

  addLifeGoal = (title: string, description: string) => {
    const { lifeGoals, setLifeGoals } = useTaskStore.getState();
    const newGoal: LifeGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description
    };
    setLifeGoals([...lifeGoals, newGoal]);
  };

  addMilestone = (year: number, title: string) => {
    const { milestones, setMilestones } = useTaskStore.getState();
    const newMilestone: Milestone = {
      id: Math.random().toString(36).substr(2, 9),
      year,
      title
    };
    const updated = [...milestones, newMilestone].sort((a, b) => a.year - b.year);
    setMilestones(updated);
  };

  private createBaseTask(title: string): Task {
    return {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      color: this.getRandomZenColor()
    };
  }

  private getRandomZenColor() {
    const colors = ['#F0F9FF', '#F0FDF4', '#FEFCE8', '#FAF5FF', '#FFF7ED'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
