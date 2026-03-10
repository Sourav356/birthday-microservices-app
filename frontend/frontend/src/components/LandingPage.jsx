import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function LandingPage() {

  return (
    <div className="text-center py-20 relative">

      <Confetti numberOfPieces={150} recycle={false} />

      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-3xl bg-white/15 border border-white/30 p-16 rounded-[3rem] shadow-2xl inline-block max-w-2xl"
      >

        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-xl pb-4">
          Happy Birthday 🎉
        </h1>

        <p className="mt-6 text-2xl text-white font-medium drop-shadow-md">
          Today is a special celebration 🎂
        </p>

      </motion.div>

    </div>
  );
}