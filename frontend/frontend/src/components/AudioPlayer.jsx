import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt auto-play on mount
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Auto-play blocked. User interaction required.");
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 backdrop-blur-xl bg-white/20 border border-white/40 px-5 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
    >
      <FaMusic className={`text-white ${isPlaying ? 'animate-pulse text-pink-300' : ''}`} />
      <button 
        onClick={togglePlay}
        className="text-white hover:text-pink-300 transition-colors focus:outline-none flex items-center gap-2"
        title="Play Birthday Music"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
        {!isPlaying && <span className="text-sm font-bold pr-1 tracking-wide">Play Music!</span>}
      </button>
      
      {/* Reliable public domain Happy Birthday track from Wikimedia Commons */}
      <audio 
        ref={audioRef} 
        unselectable="on"
        loop 
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Happy_Birthday_to_You_%28instrumental%29.ogg" 
      />
    </motion.div>
  );
}
