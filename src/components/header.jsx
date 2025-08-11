import "../Styles/header.css";
import { useState } from "react";

export default function Header() {
  const [hover, setHover] = useState(false);

  const handleExplore = () => {
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1 className="fade-in">Welcome to <span>Strokes & Stories</span></h1>
        <h2 className="fade-in-delay">
          Where Every canvas whispers. Every color tells a tale.
        </h2>
        <p className="fade-in-delay2">
          Step inside a world where imagination flows freely, and every masterpiece holds a piece of the artist’s soul. From bold, vibrant strokes to delicate, intricate details — here, art speaks louder than words.
        </p>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleExplore}
          className={hover ? "btn-hover" : ""}
        >
          Explore the Gallery {hover ? "🎨" : ""}
        </button>
      </div>
    </div>
  );
}
