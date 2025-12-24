
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
      <div className="w-full h-full flex flex-col items-center px-8 overflow-y-auto no-scrollbar mask-fade-v">
        <div className="h-24 shrink-0" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-40 w-full max-w-5xl">
          <AnimatePresence initial={false} mode="popLayout">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                layout
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05, type: "spring", stiffness: 100, damping: 15 } 
                }}
                exit={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 } 
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => taskManager.toggleTask(task.id)}
                className={`
                  relative cursor-pointer glass w-full aspect-[4/5] rounded-[4rem] 
                  flex flex-col items-center justify-center p-10 text-center zen-shadow
                  transition-all duration-1000 ease-out
                  ${task.completed ? 'opacity-40 grayscale-[0.5]' : 'hover:bg-white/90 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.05)]'}
                `}
                style={{ 
                  backgroundColor: task.completed ? 'rgba(255,255,255,0.1)' : task.color || '#FFFFFF',
                }}
              >
                <motion.div 
                  animate={{ 
                    scale: task.completed ? [1, 1.2, 1] : 1,
                    rotate: task.completed ? [0, 10, -10, 0] : 0 
                  }}
                  className={`mb-8 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 ${
                    task.completed ? 'bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]' : 'bg-white shadow-inner border border-slate-50'
                  }`}
                >
                  {task.completed && <Check className="text-white w-10 h-10" />}
                </motion.div>
                
                <h3 className={`text-xl font-light tracking-widest leading-relaxed transition-all duration-700 ${
                  task.completed ? 'line-through text-slate-400' : 'text-slate-700'
                }`}>
                  {task.title}
                </h3>

                {!task.completed && (
                  <div className="absolute bottom-10 w-1.5 h-1.5 rounded-full bg-sky-200/50" />
                )}
              </motion.div>
            ))}

            <motion.div
              layout
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
              onClick={() => setIsInputOpen(true)}
              className="w-full aspect-[4/5] rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-10 cursor-pointer transition-all group bg-white/10"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-all">
                <Plus className="w-8 h-8 text-slate-300 group-hover:text-sky-400 transition-colors" />
              </div>
              <span className="text-[10px] tracking-[0.5em] text-slate-400 uppercase font-light">新增任务</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="h-24 shrink-0" />
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
