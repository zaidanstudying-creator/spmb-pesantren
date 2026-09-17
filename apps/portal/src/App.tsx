import React, { useState } from 'react';
import { SPMBProvider } from '@spmb/shared';
import { PublicNavbar } from './components/PublicNavbar';
import { PublicFooter } from './components/PublicFooter';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckStatusPage } from './pages/CheckStatusPage';
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentDashboard } from './pages/StudentDashboard';

type ViewMode = 'landing' | 'register' | 'check-status' | 'login' | 'dashboard';

export const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e]">
      <PublicNavbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentView === 'register' && <RegisterPage onNavigate={handleNavigate} />}
        {currentView === 'check-status' && <CheckStatusPage onNavigate={handleNavigate} />}
        {currentView === 'login' && <StudentLoginPage onNavigate={handleNavigate} />}
        {currentView === 'dashboard' && <StudentDashboard onNavigate={handleNavigate} />}
      </main>

      <PublicFooter />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SPMBProvider>
      <AppContent />
    </SPMBProvider>
  );
};

export default App;
