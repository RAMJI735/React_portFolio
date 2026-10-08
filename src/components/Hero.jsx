import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Hero({ words = ["Full Stack Developer", "MERN Specialist", "Next.js & React Architect", "UI/UX Craftsman"] }) {
  const displayWords = Array.isArray(words) && words.length > 0 ? words : ["Full Stack Developer", "MERN Specialist"];
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200 flex items-center flex-wrap gap-2">
      <span className="text-gray-300 font-light">I am</span>
      <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-bold drop-shadow-sm">
        <Typewriter
          words={displayWords}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={35}
          delaySpeed={1800}
        />
      </span>
    </div>
  );
}

export default Hero;
