import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CelebrationGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('http://celebration-service:3004/celebration')
      .then(res => setPhotos(res.data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl text-white mb-6">🎂 Today’s Celebration</h2>
      <div className="grid grid-cols-2 gap-4">
        {photos.map(photo => (
          <img key={photo.id} src={photo.url} alt="Celebration" className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
}
