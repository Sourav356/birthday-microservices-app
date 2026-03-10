import React from 'react';
import { motion } from 'framer-motion';

function Notes({ notes }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="p-10 backdrop-blur-3xl bg-white/10 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 pointer-events-none"></div>
      <h2 className="text-4xl font-bold text-white mb-6 relative z-10 drop-shadow-lg">📝 Celebration Notes</h2>
      
      {(!notes || notes.length === 0) ? (
        <p className="text-white text-lg relative z-10">No notes yet</p>
      ) : (
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4 text-white relative z-10"
        >
          {notes.map((note, index) => (
            <motion.li 
              variants={itemVariants}
              key={index}
              className="flex items-center gap-4 text-xl p-4 bg-white/5 rounded-2xl border border-white/10"
            >
              <span className="text-2xl">✨</span>
              {note}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

export default Notes;
