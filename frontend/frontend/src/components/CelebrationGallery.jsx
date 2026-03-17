import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CelebrationGallery() {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos for today from celebration-service
    axios.get("/api/celebration")
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Error fetching photos:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="p-10 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-white drop-shadow-md">
          🎂 Celebration Gallery
        </h2>
      </div>

      {photos.length === 0 ? (
        <p className="text-white text-center text-xl mt-10 drop-shadow-md">No celebration photos yet 🎂</p>
      ) : (
        <div className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                key={photo.id}
                src={photo.url}
                alt="Celebration"
                className="rounded-3xl shadow-xl border border-white/20 w-full h-64 object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}