import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Settings, Timer } from 'lucide-react';
import { UserProvider, useUser } from './context/UserContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SnackShop from './pages/SnackShop';
import PizzaBuilder from './pages/PizzaBuilder';
import Dashboard from './pages/Dashboard';
import ProductDescription from './pages/ProductDescription';
import FeedbackForm from './pages/FeedbackForm';
import MemberPage from './pages/MemberPage';

const AppContent = () => {
  const { settings, toggleCalmMode, toggleTimer } = useUser();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (settings.timerActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [settings.timerActive]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`app-wrapper ${settings.calmMode ? 'calm-mode' : ''}`}>
      <NavBar />

      <div className="top-settings" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.8rem',
        background: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: '60px',
        zIndex: 900
      }}>
        <button className="btn btn-secondary" onClick={toggleCalmMode} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
          <Settings size={14} /> {settings.calmMode ? 'Calm Mode: ON' : 'Calm Mode'}
        </button>
        <button className="btn btn-secondary" onClick={toggleTimer} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
          <Timer size={14} /> {settings.timerActive ? `Session: ${formatTime(seconds)}` : 'Timer: OFF'}
        </button>
      </div>

      <div className="container" style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/snack-shop" element={<SnackShop />} />
          <Route path="/pizza-builder" element={<PizzaBuilder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-page" element={<ProductDescription />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/member" element={<MemberPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <UserProvider>
    <Router>
      <AppContent />
    </Router>
  </UserProvider>
);

export default App;
