
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// 季节配色
const getMonthColor = (index: number) => {
  if (index >= 2 && index <= 4) return '#10B981'; // 春: 萌芽绿
  if (index >= 5 && index <= 7) return '#0EA5E9'; // 夏: 晴空蓝
  if (index >= 8 && index <= 10) return '#F59E0B'; // 秋: 麦穗金
  return '#94A3B8'; // 冬: 寒霜灰
};

const YearView: React.FC = () => {
  const yearTasks = useTaskStore(state => state.yearTasks);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <>
      <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] flex items-center justify-center scale-110">
        {/* 背景光晕 */}
        <div className="absolute inset-0 bg-white/20 rounded-full blur-[100px] scale-110" />
        
        {/* 中央年份 */}
        <div className="absolute text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-extralight tracking-tighter text-slate-800"
          >
            2025
          </motion.h2>
          <p className="text-[10px] tracking-[0.8em] text-slate-300 uppercase mt-4 ml-2">岁时更迭</p>
        </div>

        {/* 动态季节环组 */}
        <div className="absolute w-full h-full rounded-full border-[0.5px] border-slate-100 opacity-30" />
        <div className="absolute w-[85%] h-[85%] rounded-full border-[0.5px] border-slate-100 opacity-30" />
        <div className="absolute w-[70%] h-[70%] rounded-full border-[0.5px] border-slate-100 opacity-30" />

        {/* 月份刻度与标记 */}
        {MONTHS.map((month, i) => {
          const angle = (i * 360) / 12;
          const hasTasks = yearTasks.some(t => t.monthOfYear === i);
          const color = getMonthColor(i);
          const isCurrent = i === new Date().getMonth();
          
          return (
            <motion.div
              key={month}
              initial={{ rotate: angle, opacity: 0 }}
              animate={{ rotate: angle, opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 1.5, ease: "easeOut" }}
              className="absolute h-full w-full flex justify-center py-2 origin-center cursor-pointer group"
              onClick={() => setSelectedMonth(i)}
            >
              <div className="flex flex-col items-center">
                <span 
                  className={`text-[9px] tracking-widest font-medium transition-all duration-500 group-hover:scale-125 ${
                    isCurrent ? 'text-slate-800 font-bold scale-110' : 'text-slate-300 group-hover:text-sky-400'
                  }`}
                  style={{ transform: `rotate(${-angle}deg)`, color: isCurrent ? color : undefined }}
                >
                  {month}
                </span>
                
                {/* 动态指针 */}
                <motion.div 
                  whileHover={{ height: 40 }}
                  className={`w-[1.5px] rounded-full transition-all duration-700 mt-2 ${
                    isCurrent ? 'h-10 opacity-100' : (hasTasks ? 'h-6 opacity-60' : 'h-3 opacity-20')
                  }`}
                  style={{ backgroundColor: color }}
                />

                {hasTasks && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1 h-1 rounded-full mt-2" 
                    style={{ backgroundColor: color, transform: `rotate(${-angle}deg)` }} 
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* 极慢旋转的外层光环 */}
        <div className="absolute inset-0 rounded-full border-t-[1px] border-sky-100 rotate-slow pointer-events-none opacity-50" />
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
