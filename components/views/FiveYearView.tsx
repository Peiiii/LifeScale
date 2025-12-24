
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const FiveYearView: React.FC = () => {
  const milestones = useTaskStore(state => state.milestones);
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-12 overflow-visible">
      {/* 添加按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsInputOpen(true)}
        className="absolute top-10 right-10 glass p-4 rounded-full text-sky-400 shadow-lg z-50 flex items-center gap-2 px-6"
      >
        <Plus size={20} />
        <span className="text-xs tracking-widest uppercase font-bold">Add Milestone</span>
      </motion.button>

      <div className="relative w-full max-w-4xl h-64 flex items-center justify-between">
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 1000 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50C100 50 150 20 250 20C350 20 400 80 500 80C600 80 650 30 750 30C850 30 900 50 1000 50"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E0F2F1" />
              <stop offset="0.5" stopColor="#E3F2FD" />
              <stop offset="1" stopColor="#F3E5F5" />
            </linearGradient>
          </defs>
        </motion.svg>

        <AnimatePresence>
          {milestones.map((milestone, i) => {
            const xPos = (i / (milestones.length - 1 || 1)) * 100;
            const yOffsets = [50, 20, 80, 50, 30, 70]; 
            const yOff = yOffsets[i % yOffsets.length];
            return (
              <motion.div
                key={milestone.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative flex flex-col items-center group z-10"
                style={{ top: `${(yOff - 50)}px` }}
              >
                <div className="w-12 h-12 rounded-full glass border-sky-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
                <div className="absolute top-16 w-32 text-center">
                  <h3 className="text-xs font-bold text-sky-600 mb-1">{milestone.year}</h3>
                  <p className="text-sm font-light text-slate-700">{milestone.title}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <InputOverlay 
        isOpen={isInputOpen} 
        onClose={() => setIsInputOpen(false)} 
        type={ZoomLevel.STRATEGY} 
      />
    </div>
  );
};

export default FiveYearView;
