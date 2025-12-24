
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const MonthView: React.FC = () => {
  const monthTasks = useTaskStore(state => state.monthTasks);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl glass p-8 md:p-12 rounded-[3.5rem] shadow-sm">
          <div className="grid grid-cols-7 gap-3 md:gap-5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((w, i) => (
              <div key={i} className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-4">
                {w}
              </div>
            ))}
            {days.map((day, i) => {
              const isActive = day === 15;
              const hasTasks = monthTasks.some(t => t.dayOfMonth === day);
              return (
                <motion.div
                  key={day}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    relative aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300
                    ${isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'}
                  `}
                >
                  <span className={`text-xs md:text-sm ${isActive ? 'font-medium' : 'text-slate-400 font-light'}`}>
                    {day}
                  </span>
                  {hasTasks && (
                    <div className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-sky-400'}`} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <InputOverlay 
        isOpen={!!selectedDate} 
        onClose={() => setSelectedDate(null)} 
        type={ZoomLevel.MONTH} 
        contextData={selectedDate}
      />
    </>
  );
};

export default MonthView;
