import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [birthdays, setBirthdays] = useState([]); // Added birthdays state

  // detect if there are birthdays today
  useEffect(() => {
    const checkBirthday = async () => {
      try {
        const res = await axios.get('/api/today'); // Prefix with /api
        setBirthdays(res.data); // Set birthdays state
        if (res.data.length > 0) {
          setHasBirthday(true);
          // 🔔 Trigger notification for each birthday
          res.data.forEach(user => {
            axios.post('/api/notify', { // Prefix with /api
              email: user.email,
              link: window.location.origin + '/#celebration' // Redirect to anchor
            })
            .catch(err => console.error("Error sending notification:", err)); // Added error handling for post
          });
        }
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

        <section id="celebration">
          <CelebrationGallery />
        </section>

        <section>
          <Notes
            notes={[
              "Happy Birthday AMAR PUCCHHKKUU SONA! 🎉",
              "Many Many Happy Returns of the Day! 🎂",
              "Wishing you a day filled with love, laughter, and unforgettable memories! 🎈",
              "May all your dreams come true in the year ahead! 🌟",
              "Here's to another year of amazing adventures and cherished moments! 🥳",
              "I am here always for you, from your every down to your every up as your partner! 🫂❤️",
              "I am so grateful to have you in my life, and I look forward to celebrating many more birthdays together! 🎊",
              "I am praying that next year we will be celebrating your birthday in a beautiful place together and cherish many more moments! 🌴",
              "I am praying for your good health, happiness, and success in the coming years! 🙏",
              "You are my everything and I am so so so thankful to GOD that HE brought you into my life! and make me the happiest person in the world!😁",
              "I Loooooovvvvvveeeee Yooooooooouuuuuuuuuuuu ammmaaaarrr PUCCCCCHHHHKKKKUUUU SOOOOONNNNNAAAAAAA ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️🫂🫂🫂🫂🫂🫂🫂🫂🫂🫂",
              "Again Happy Birthday to My LOOOVVEEE ❤️❤️❤️🫂🫂🫂! My Wife 😘😘😘🫂🫂🫂!! My World 😍😍😍🫂🫂🫂🫂❤️❤️❤️🤗🤗🤗!!! My EVERYTHING❤️❤️❤️❤️🫂🫂🫂🫂!!!",
            ]}
          />
        </section>

      </main>
    </div>
  );
}

export default App;