
import React from 'react';
import { motion } from 'framer-motion';
import { ZOOM_CONFIG } from '../constants';
import { useZoomStore } from '../stores/zoomStore';
import { usePresenter } from '../contexts/PresenterContext';

const ZoomControl: React.FC = () => {
  const currentZoom = useZoomStore((state) => state.currentLevel);
  const { zoomManager } = usePresenter();

  return (
    <div className="glass px-10 py-6 rounded-full flex items-center gap-6 md:gap-12 shadow-2xl shadow-slate-200/30 transition-all duration-500 hover:scale-[1.02] hover:bg-white/60">
      {ZOOM_CONFIG.map((item) => {
        const isActive = currentZoom === item.level;
        return (
          <button
            key={item.level}
            onClick={() => zoomManager.changeZoom(item.level)}
            className="relative group flex flex-col items-center py-1"
          >
            <span className={`text-[10px] md:text-xs tracking-[0.4em] font-semibold uppercase transition-all duration-500 ${
              isActive ? 'text-sky-600 scale-110' : 'text-slate-300 group-hover:text-slate-500'
            }`}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="active-dot"
                className="absolute -bottom-3 w-2 h-2 bg-sky-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            )}
            {!isActive && (
              <div className="absolute -bottom-3 w-1 h-1 bg-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ZoomControl;
