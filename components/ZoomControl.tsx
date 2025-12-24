
import React from 'react';
import { motion } from 'framer-motion';
import { ZOOM_CONFIG } from '../constants';
import { useZoomStore } from '../stores/zoomStore';
import { usePresenter } from '../contexts/PresenterContext';

const ZoomControl: React.FC = () => {
  const currentZoom = useZoomStore((state) => state.currentLevel);
  const { zoomManager } = usePresenter();

  return (
    <div className="glass px-12 py-5 rounded-full flex items-center gap-8 md:gap-14 zen-shadow border border-white/50 transition-all duration-700 hover:scale-[1.01] hover:bg-white/50">
      {ZOOM_CONFIG.map((item) => {
        const isActive = currentZoom === item.level;
        return (
          <button
            key={item.level}
            onClick={() => zoomManager.changeZoom(item.level)}
            className="relative group flex flex-col items-center py-2"
          >
            <span className={`text-[9px] md:text-[10px] tracking-[0.5em] font-medium uppercase transition-all duration-700 ease-out ${
              isActive ? 'text-slate-800 scale-110' : 'text-slate-300 group-hover:text-slate-500'
            }`}>
              {item.label}
            </span>
            
            {isActive ? (
              <motion.div
                layoutId="active-indicator"
                className="absolute -bottom-3 w-6 h-[1.5px] bg-sky-400/60"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            ) : (
              <div className="absolute -bottom-3 w-1 h-1 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ZoomControl;
