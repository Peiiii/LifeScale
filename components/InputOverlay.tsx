
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { usePresenter } from '../contexts/PresenterContext';
import { ZoomLevel } from '../types';

interface InputOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  type: ZoomLevel;
  contextData?: any; // 用于传递选中的周几、日期或月份
}

const InputOverlay: React.FC<InputOverlayProps> = ({ isOpen, onClose, type, contextData }) => {
  const { taskManager } = usePresenter();
  const [title, setTitle] = useState('');
  const [extra, setExtra] = useState(''); 
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setTitle('');
      setExtra('');
    }
  }, [isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim()) return;

    switch(type) {
      case ZoomLevel.DAY:
        taskManager.addTask(title);
        break;
      case ZoomLevel.WEEK:
        taskManager.addWeekTask(title, contextData);
        break;
      case ZoomLevel.MONTH:
        taskManager.addMonthTask(title, contextData);
        break;
      case ZoomLevel.YEAR:
        taskManager.addYearTask(title, contextData);
        break;
      case ZoomLevel.STRATEGY:
        taskManager.addMilestone(parseInt(extra) || new Date().getFullYear(), title);
        break;
      case ZoomLevel.LIFETIME:
        taskManager.addLifeGoal(title, extra || '未设定描述');
        break;
    }
    
    onClose();
  };

  const getTitle = () => {
    switch(type) {
      case ZoomLevel.WEEK: return `为 ${contextData} 设定计划`;
      case ZoomLevel.MONTH: return `设定 ${contextData} 日的目标`;
      case ZoomLevel.YEAR: return `规划 ${contextData + 1} 月`;
      case ZoomLevel.STRATEGY: return '设定里程碑';
      case ZoomLevel.LIFETIME: return '书写愿景';
      default: return '记录新任务';
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass p-10 rounded-[3rem] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-500 transition-colors">
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-light tracking-[0.3em] text-slate-800 mb-8 uppercase">
              {getTitle()}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="在这里输入..."
                  className="w-full bg-transparent border-b border-slate-100 py-3 text-2xl font-light focus:outline-none focus:border-sky-300 transition-colors placeholder:text-slate-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {(type === ZoomLevel.LIFETIME || type === ZoomLevel.STRATEGY) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <input
                    type={type === ZoomLevel.STRATEGY ? "number" : "text"}
                    placeholder={type === ZoomLevel.STRATEGY ? "年份 (如: 2025)" : "简短的描述..."}
                    className="w-full bg-transparent border-b border-slate-100 py-3 text-lg font-light focus:outline-none focus:border-sky-300 transition-colors placeholder:text-slate-200"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                  />
                </motion.div>
              )}

              <div className="pt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="flex items-center gap-3 px-8 py-3 bg-sky-500 text-white rounded-full font-medium tracking-widest hover:bg-sky-600 transition-all disabled:opacity-30 disabled:grayscale"
                >
                  <Check size={18} />
                  <span>确认添加</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InputOverlay;
