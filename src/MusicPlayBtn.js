import React from "react";
import "./MusicPlayBtn"; // Optional: You can extract the styles into an external CSS file.

const AnimatedNeonShape = () => {
  return (
    <div className="container">
      <div className="shape"></div>
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default AnimatedNeonShape;
