
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WeekView: React.FC = () => {
  const weekTasks = useTaskStore(state => state.weekTasks);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <>
      <div className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden px-12 md:px-24 no-scrollbar mask-fade-h">
        <div className="flex gap-8 py-12">
          {DAYS.map((day, i) => {
            const dayTasks = weekTasks.filter(t => t.dayOfWeek === day);
            return (
              <motion.div
                key={day}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedDay(day)}
                className={`
                  glass min-w-[220px] h-[450px] rounded-[3rem] p-10 flex flex-col items-center cursor-pointer
                  transition-shadow duration-500 hover:shadow-2xl hover:bg-white/60
                  ${i === 2 ? 'ring-2 ring-sky-100 ring-offset-4 ring-offset-transparent' : ''}
                `}
              >
                <span className={`text-xs font-bold tracking-[0.3em] uppercase mb-10 ${i === 2 ? 'text-sky-500' : 'text-slate-300'}`}>
                  {day}
                </span>
                
                <div className="flex-1 flex flex-col gap-4 w-full overflow-y-auto no-scrollbar">
                  {dayTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-200 shrink-0" />
                      <p className="text-xs text-slate-600 font-light truncate">{task.title}</p>
                    </div>
                  ))}
                  {dayTasks.length === 0 && (
                    <div className="flex-1 flex flex-col gap-6 w-full opacity-10">
                      <div className="h-1.5 w-1/3 rounded-full bg-slate-400" />
                      <div className="h-1.5 w-3/4 rounded-full bg-slate-400" />
                      <div className="h-1.5 w-1/2 rounded-full bg-slate-400" />
                    </div>
                  )}
                </div>

                {i === 2 && (
                  <div className="mt-auto flex flex-col items-center gap-2 pt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <p className="text-[10px] text-sky-400 font-bold tracking-widest uppercase">Now</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <InputOverlay 
        isOpen={!!selectedDay} 
        onClose={() => setSelectedDay(null)} 
        type={ZoomLevel.WEEK} 
        contextData={selectedDay}
      />
    </>
  );
};

export default WeekView;
