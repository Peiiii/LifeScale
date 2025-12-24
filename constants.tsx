
import React from 'react';
import { ZoomLevel, Task, Milestone, LifeGoal } from './types';

export const ZOOM_CONFIG = [
  { level: ZoomLevel.DAY, label: "今日", sub: "Micro" },
  { level: ZoomLevel.WEEK, label: "本周", sub: "Mini" },
  { level: ZoomLevel.MONTH, label: "本月", sub: "Middle" },
  { level: ZoomLevel.YEAR, label: "今年", sub: "Macro" },
  { level: ZoomLevel.STRATEGY, label: "五年", sub: "Strategy" },
  { level: ZoomLevel.LIFETIME, label: "人生", sub: "Ultimate" },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: '清晨冥想', completed: false, color: '#E3F2FD' },
  { id: '2', title: '完成项目提案', completed: false, color: '#E8F5E9' },
  { id: '3', title: '下午茶与阅读', completed: false, color: '#FFF9C4' },
  { id: '4', title: '整理书桌', completed: true, color: '#F3E5F5' },
];

export const MOCK_MILESTONES: Milestone[] = [
  { id: 'm1', year: 2024, title: '开启新事业' },
  { id: 'm2', year: 2025, title: '环球旅行' },
  { id: 'm3', year: 2027, title: '学会一门新语言' },
  { id: 'm4', year: 2029, title: '完成梦想居所' },
];

export const MOCK_LIFE_GOALS: LifeGoal[] = [
  { id: 'lg1', title: '内心宁静', description: '保持身心灵的平衡与和谐' },
  { id: 'lg2', title: '持续创造', description: '为世界留下独特价值的作品' },
  { id: 'lg3', title: '深厚链接', description: '与家人和朋友建立真挚的关系' },
];
