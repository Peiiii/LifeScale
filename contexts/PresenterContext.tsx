
import React, { createContext, useContext, useMemo } from 'react';
import { AppPresenter } from '../presenter/AppPresenter';

const PresenterContext = createContext<AppPresenter | null>(null);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 确保 presenter 在生命周期内是单例
  const presenter = useMemo(() => new AppPresenter(), []);

  return (
    <PresenterContext.Provider value={presenter}>
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenter = () => {
  const context = useContext(PresenterContext);
  if (!context) {
    throw new Error('usePresenter must be used within a PresenterProvider');
  }
  return context;
};
