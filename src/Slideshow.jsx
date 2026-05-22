import { useState, useEffect } from "react";

// Import your images
import slide1 from "./assets/REMMMM.png";
import slide2 from "./assets/Lynae.jpg";
import slide3 from "./assets/akali.jpg";
import slide4 from "./assets/kafka.png";

function Slideshow() {
  // Just an array of images now
  const slides = [slide1, slide2, slide3, slide4];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow-background">
      {slides.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      {/* Dark overlay so your text pops out */}
      <div className="overlay" />
    </div>
  );
}

export default Slideshow;