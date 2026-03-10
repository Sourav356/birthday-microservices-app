import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CelebrationGallery() {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/celebration")
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

      <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-md">
        🎂 Celebration Gallery
      </h2>

      {photos.length === 0 ? (

        <p className="text-white">No celebration photos yet 🎂</p>

      ) : (

        <div className="mt-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                key={photo.id}
                src={photo.url}
                alt="Celebration"
                className="rounded-3xl shadow-2xl border border-white/20 w-full h-64 object-cover"
              />
            ))}
          </div>
</div>

      )}

    </motion.div>
  );
}