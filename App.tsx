
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

  // 模拟镜头推进的变焦效果
  const variants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.8 : 1.2,
      opacity: 0,
      filter: 'blur(20px)',
      z: direction > 0 ? -100 : 100,
    }),
    center: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      z: 0,
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1], // Expo out
      }
    },
    exit: (direction: number) => ({
      scale: direction > 0 ? 1.4 : 0.6,
      opacity: 0,
      filter: 'blur(30px)',
      z: direction > 0 ? 150 : -150,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
      }
    })
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center overflow-hidden no-select">
      {/* Background Decor - Floating Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-100/50 rounded-full blur-[140px] floating-blob" style={{ animationDuration: '25s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-emerald-50/50 rounded-full blur-[160px] floating-blob" style={{ animationDelay: '-10s', animationDuration: '30s' }} />
      </div>

      {/* Persistent Header */}
      <header className="relative z-20 w-full h-24 md:h-32 flex flex-col items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={zoom}
            initial={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.6em] text-slate-800 uppercase">
              {ZOOM_CONFIG[zoom].label}
            </h1>
            <div className="h-[1px] w-8 bg-sky-200 mx-auto mt-4 opacity-40" />
          </motion.div>
        </AnimatePresence>
      </header>

      {/* Main Perspective Content */}
      <main className="relative z-10 w-full flex-grow flex items-center justify-center overflow-hidden min-h-0 perspective-[1000px]">
        <div className="w-full h-full max-w-7xl relative flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={zoom}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Lens Control Footer */}
      <footer className="relative z-30 w-full h-32 md:h-40 flex items-center justify-center shrink-0 pb-12">
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
