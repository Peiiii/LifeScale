
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const YearView: React.FC = () => {
  const yearTasks = useTaskStore(state => state.yearTasks);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <>
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        {/* Central Content */}
        <div className="absolute text-center z-10">
          <h2 className="text-5xl font-extralight text-slate-800">2024</h2>
          <p className="text-[10px] tracking-[0.4em] text-sky-400 uppercase mt-2">展望未来</p>
        </div>

        {/* Season Rings */}
        <div className="absolute w-full h-full rounded-full border border-slate-100 opacity-50" />
        <div className="absolute w-[80%] h-[80%] rounded-full border border-slate-100 opacity-50" />

        {/* Month Segments */}
        {MONTHS.map((month, i) => {
          const angle = (i * 360) / 12;
          const hasTasks = yearTasks.some(t => t.monthOfYear === i);
          
          return (
            <motion.div
              key={month}
              initial={{ rotate: angle, opacity: 0 }}
              animate={{ rotate: angle, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="absolute h-full w-full flex justify-center py-4 origin-center cursor-pointer group"
              onClick={() => setSelectedMonth(i)}
            >
              <div className="flex flex-col items-center">
                <span 
                  className={`text-[10px] tracking-widest font-medium uppercase mb-2 transition-colors ${
                    i === 3 ? 'text-emerald-500' : 'text-slate-300 group-hover:text-sky-400'
                  }`}
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {month}
                </span>
                <motion.div 
                  whileHover={{ height: 32 }}
                  className={`w-[1px] transition-all duration-500 ${
                    i === 3 ? 'bg-emerald-300 h-8' : (hasTasks ? 'bg-sky-300 h-6' : 'bg-slate-200 h-4')
                  }`} 
                />
                {hasTasks && (
                  <div className="w-1 h-1 bg-sky-300 rounded-full mt-1" style={{ transform: `rotate(${-angle}deg)` }} />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Rotating highlight */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full rounded-full border-t-2 border-sky-200 border-opacity-30 pointer-events-none"
        />
      </div>

      <InputOverlay 
        isOpen={selectedMonth !== null} 
        onClose={() => setSelectedMonth(null)} 
        type={ZoomLevel.YEAR} 
        contextData={selectedMonth}
      />
    </>
  );
};

export default YearView;
