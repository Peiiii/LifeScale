
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStore';
import InputOverlay from '../InputOverlay';
import { ZoomLevel } from '../../types';

const LifetimeView: React.FC = () => {
  const goals = useTaskStore(state => state.lifeGoals);
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/10">
        {/* 右上角极简添加按钮 */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsInputOpen(true)}
          className="absolute top-10 right-10 glass px-6 py-4 rounded-full text-slate-400 shadow-sm z-50 flex items-center gap-3 transition-all"
        >
          <Sparkles size={16} className="text-sky-300" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-light">锚定愿景</span>
        </motion.button>

        {/* 艺术地平线 */}
        <div className="absolute bottom-[40%] w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
        <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-sky-50/20 to-transparent pointer-events-none" />
        
        {/* 动态光束 */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], x: ['-20%', '20%', '-20%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[40%] w-[60%] h-[200px] bg-sky-100/30 blur-[100px] rounded-full"
        />

        {/* “北极星”愿景列表 */}
        <div className="relative w-full max-w-7xl flex justify-center items-start px-20 mb-32 h-[500px] overflow-x-auto no-scrollbar gap-24">
          <AnimatePresence>
            {goals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ y: -60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  delay: 0.3 + i * 0.2, 
                  duration: 2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="flex flex-col items-center group cursor-default shrink-0 mx-4"
              >
                {/* 漂浮的发光点 */}
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mb-24"
                >
                  <div className="absolute inset-0 w-16 h-16 bg-sky-200/30 rounded-full blur-[40px] group-hover:bg-sky-400/20 transition-colors" />
                  <div className="relative w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_25px_rgba(56,189,248,1)] border border-sky-100" />
                </motion.div>

                {/* 愿景文字 */}
                <div className="text-center w-64 md:w-80 group-hover:translate-y-[-5px] transition-transform duration-700">
                  <h3 className="text-xl md:text-2xl font-extralight tracking-[0.8em] text-slate-800 mb-6 uppercase">
                    {goal.title}
                  </h3>
                  <div className="w-8 h-[0.5px] bg-slate-200 mx-auto mb-6 opacity-40" />
                  <p className="text-[11px] md:text-xs text-slate-400 font-light leading-[2] tracking-[0.3em] px-4 max-w-xs mx-auto">
                    {goal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 底部远景装饰线 */}
        <div className="absolute bottom-10 w-full flex justify-center opacity-10 pointer-events-none">
          <div className="text-[80px] font-thin tracking-[0.5em] text-slate-300 whitespace-nowrap select-none">
            E T E R N I T Y
          </div>
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
