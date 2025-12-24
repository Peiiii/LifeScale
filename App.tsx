
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomLevel } from './types';
import { ZOOM_CONFIG } from './constants';
import { useZoomStore } from './stores/zoomStore';
import { PresenterProvider } from './contexts/PresenterContext';
import DayView from './components/views/DayView';
import WeekView from './components/views/WeekView';
import MonthView from './components/views/MonthView';
import YearView from './components/views/YearView';
import FiveYearView from './components/views/FiveYearView';
import LifetimeView from './components/views/LifetimeView';
import ZoomControl from './components/ZoomControl';

const MainLayout: React.FC = () => {
  const { currentLevel: zoom, prevLevel } = useZoomStore();

  const renderView = () => {
    switch (zoom) {
      case ZoomLevel.DAY: return <DayView />;
      case ZoomLevel.WEEK: return <WeekView />;
      case ZoomLevel.MONTH: return <MonthView />;
      case ZoomLevel.YEAR: return <YearView />;
      case ZoomLevel.STRATEGY: return <FiveYearView />;
      case ZoomLevel.LIFETIME: return <LifetimeView />;
      default: return <DayView />;
    }
  };

  const direction = zoom > prevLevel ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.92 : 1.08,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: (direction: number) => ({
      scale: direction > 0 ? 1.15 : 0.85,
      opacity: 0,
      filter: 'blur(15px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center overflow-hidden no-select">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[45vw] h-[45vw] bg-sky-100 rounded-full blur-[120px] opacity-25 floating-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[50vw] h-[50vw] bg-emerald-50 rounded-full blur-[140px] opacity-25 floating-blob" style={{ animationDelay: '-7s' }} />
      </div>

      {/* 固定 Header */}
      <header className="relative z-20 w-full h-32 md:h-40 flex flex-col items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={zoom}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-8"
          >
            <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.4em] text-slate-800">
              {ZOOM_CONFIG[zoom].label}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.6em] font-semibold mt-4 text-slate-300">
              {ZOOM_CONFIG[zoom].sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </header>

      {/* 独立滚动的内容区域：flex-grow + overflow-hidden + min-h-0 是修复被挤出的关键 */}
      <main className="relative z-10 w-full flex-grow flex items-center justify-center overflow-hidden min-h-0">
        <div className="w-full h-full max-w-6xl relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={zoom}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 固定 Footer */}
      <footer className="relative z-20 w-full h-32 md:h-40 flex items-center justify-center shrink-0 pb-10">
        <ZoomControl />
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PresenterProvider>
      <MainLayout />
    </PresenterProvider>
  );
};

export default App;
