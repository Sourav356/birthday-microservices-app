import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Aurora from "./components/Aurora";
import Fireworks from "./components/Fireworks";
import Cake from "./components/Cake";
import AudioPlayer from "./components/AudioPlayer";

import LandingPage from "./components/LandingPage";
import BirthdayList from "./components/BirthdayList";
import CelebrationGallery from "./components/CelebrationGallery";
import Notes from "./components/Notes";

function App() {

  const [hasBirthday, setHasBirthday] = useState(false);

  // detect if there are birthdays today
  useEffect(() => {
    const checkBirthday = async () => {
      try {
        const res = await fetch("http://localhost:3002/today");
        const data = await res.json();
        if (data.length > 0) setHasBirthday(true);
      } catch (err) {
        console.error(err);
      }
    };

    checkBirthday();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 -z-20" />

      {/* Aurora Animated Background */}
      <Aurora />

      {/* Fireworks */}
      <Fireworks show={hasBirthday} />

      {/* Navbar */}
      <Navbar />

      {/* Audio Player */}
      <AudioPlayer />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 space-y-24">

        <section className="flex justify-center">
          <Cake />
        </section>

        <section>
          <LandingPage />
        </section>

        <section>
          <BirthdayList />
        </section>

        <section>
          <CelebrationGallery />
        </section>

        <section>
          <Notes
            notes={[
              "Cake cutting at 7 PM 🎂",
              "Surprise gift reveal at 8 PM 🎁",
            ]}
          />
        </section>

      </main>
    </div>
  );
}

export default App;