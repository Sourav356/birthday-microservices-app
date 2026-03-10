import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center p-10"
    >
      <h1 className="text-5xl font-bold text-white">🎉 Happy Birthday!</h1>
      <p className="mt-4 text-lg text-white">Here’s a special surprise just for you 💖</p>
    </motion.div>
  );
}
