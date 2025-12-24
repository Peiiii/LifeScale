
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import { usePresenter } from '../../contexts/PresenterContext';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const DayView: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const { taskManager } = usePresenter();
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center px-6 overflow-y-auto no-scrollbar mask-fade-v">
        <div className="h-16 shrink-0 w-full" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-32 w-full max-w-5xl place-items-center">
          <AnimatePresence initial={false} mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => taskManager.toggleTask(task.id)}
                className={`
                  relative cursor-pointer glass w-full aspect-square max-w-[260px] rounded-[3.8rem] 
                  flex flex-col items-center justify-center p-10 text-center shadow-xl shadow-slate-200/20
                  transition-all duration-700
                  ${task.completed ? 'opacity-30 grayscale-[0.8]' : 'hover:shadow-2xl hover:bg-white/80'}
                `}
                style={{ 
                  backgroundColor: task.completed ? 'rgba(255,255,255,0.1)' : task.color,
                  borderRadius: task.completed ? '50%' : '3.8rem'
                }}
              >
                <div className={`mb-8 w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  task.completed ? 'bg-sky-400 border-sky-400' : 'bg-white border-slate-50'
                }`}>
                  {task.completed ? <Check className="text-white w-8 h-8" /> : null}
                </div>
                <p className={`text-xl font-light tracking-wider leading-relaxed ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {task.title}
                </p>
              </motion.div>
            ))}

            <motion.div
              layout
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)', borderColor: '#BAE6FD' }}
              onClick={() => setIsInputOpen(true)}
              className="w-full aspect-square max-w-[260px] rounded-[3.8rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-10 cursor-pointer transition-all group bg-white/20"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-all">
                <Plus className="w-8 h-8 text-slate-300 group-hover:text-sky-400 transition-colors" />
              </div>
              <span className="text-[10px] tracking-[0.4em] text-slate-400 uppercase font-bold opacity-60">Add Task</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="h-16 shrink-0 w-full" />
      </div>

      <InputOverlay 
        isOpen={isInputOpen} 
        onClose={() => setIsInputOpen(false)} 
        type={ZoomLevel.DAY} 
      />
    </>
  );
};

export default DayView;
