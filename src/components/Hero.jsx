import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <div className="text-3xl font-bold text-white">
      I am{" "}
      <span style={{ color: "white", fontWeight:"normal" }}>
        <Typewriter
          words={["Developer", "Designer", "Freelancer"]}
          loop={0} // 0 = infinite
          cursor
          cursorStyle="|"
          typeSpeed={50}    
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </span>
    </div>
  );
}

export default Hero;
