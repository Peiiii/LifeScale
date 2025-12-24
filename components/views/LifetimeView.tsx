
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const LifetimeView: React.FC = () => {
  const goals = useTaskStore(state => state.lifeGoals);
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* 添加按钮 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsInputOpen(true)}
          className="absolute top-10 right-10 glass p-4 rounded-full text-sky-400 shadow-lg z-50 flex items-center gap-2 px-6"
        >
          <Plus size={20} />
          <span className="text-xs tracking-widest uppercase font-bold">New Vision</span>
        </motion.button>

        <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-sky-50/40 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-[35%] w-full h-[1px] overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-30"
          />
          <div className="absolute inset-0 bg-slate-200/40" />
        </div>

        <div className="relative w-full max-w-6xl flex justify-around items-start px-12 mb-24 h-[400px] overflow-x-auto no-scrollbar">
          <AnimatePresence>
            {goals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="flex flex-col items-center group cursor-default shrink-0 mx-4"
              >
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mb-16"
                >
                  <div className="absolute inset-0 w-12 h-12 bg-sky-400 rounded-full blur-[30px] opacity-10 group-hover:opacity-40" />
                  <div className="relative w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
                </motion.div>

                <div className="text-center w-40 md:w-56">
                  <h3 className="text-lg md:text-xl font-extralight tracking-[0.4em] text-slate-800 mb-4 uppercase">
                    {goal.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-400 font-light leading-relaxed tracking-wider px-2">
                    {goal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 w-full h-48 flex items-end justify-center pointer-events-none opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0 120 C 300 10 600 100 900 30 C 1100 0 1200 120 1200 120" fill="rgba(226, 232, 240, 0.3)" />
          </svg>
        </div>
      </div>

      <InputOverlay 
        isOpen={isInputOpen} 
        onClose={() => setIsInputOpen(false)} 
        type={ZoomLevel.LIFETIME} 
      />
    </>
  );
};

export default LifetimeView;
