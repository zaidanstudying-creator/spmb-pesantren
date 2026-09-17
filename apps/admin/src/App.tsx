import React, { useState } from 'react';
import { SPMBProvider, useSPMB } from '@spmb/shared';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const AdminAppContent: React.FC = () => {
  const { currentAdmin, logoutAdmin } = useSPMB();
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentAdmin);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {isLoggedIn ? (
        <AdminDashboard
          onLogout={() => {
            logoutAdmin();
            setIsLoggedIn(false);
          }}
        />
      ) : (
        <AdminLoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SPMBProvider>
      <AdminAppContent />
    </SPMBProvider>
  );
};

export default App;
