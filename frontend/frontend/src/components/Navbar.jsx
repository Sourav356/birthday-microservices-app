import { motion } from "framer-motion";
import { FaBirthdayCake } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 backdrop-blur-xl 
      bg-white/10 border border-white/20 rounded-full px-10 py-3
      shadow-xl flex items-center gap-3 text-white z-50"
    >
      <FaBirthdayCake />
      Birthday Celebration
    </motion.nav>
  );
}