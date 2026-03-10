import React from 'react';
import LandingPage from './components/LandingPage';
import CelebrationGallery from './components/CelebrationGallery';

function App() {
  return (
    <div className="bg-gradient-to-r from-pink-300 to-purple-400 min-h-screen">
      <LandingPage />
      <CelebrationGallery />
    </div>
  );
}

export default App;
