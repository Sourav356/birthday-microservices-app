import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function BirthdayList() {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    axios.get('/api/today') // Prefix with /api
      .then(res => {
        setBirthdays(res.data);

        // 🔔 Trigger notification for each birthday
        res.data.forEach(user => {
          axios.post('/api/notify', { // Prefix with /api
            email: user.email,
            link: '/#celebration'
          })
          .catch(err => console.error("Error sending notification:", err));
        });
      })
      .catch(err => console.error("Error fetching birthdays:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="p-10 backdrop-blur-3xl bg-white/10 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none"></div>
      <h2 className="text-4xl font-bold text-white mb-8 relative z-10 drop-shadow-lg">🎉 Today’s Birthdays</h2>
      {birthdays && birthdays.length === 0 ? (
        <p className="text-white text-lg relative z-10">No birthdays today 🎂</p>
      ) : (
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 relative z-10"
        >
          {birthdays.map((user) => (
            <motion.li
              variants={itemVariants}
              whileHover={{ scale: 1.05, translateY: -5 }}
              key={user.id}
              className="p-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl"
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200 drop-shadow-md">{user.name}</div>
              <div className="text-md opacity-80 text-white mt-1">{user.email}</div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
