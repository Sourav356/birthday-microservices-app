import React from 'react';
import { motion } from "framer-motion";
import "./Cake.css";

export default function Cake() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="cake-container relative flex justify-center items-center h-64 mt-20"
    >
      <div className="cake-3d">
        <div className="tier tier-bottom"></div>
        <div className="tier tier-middle"></div>
        <div className="tier tier-top">
          <div className="candle">
            <div className="flame"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}