import { useState, useRef } from 'react';
import ryzentPicture from './assets/ryzent-Kyouma.jpg';
import akaliPicture from './assets/akali.png';
import lynaePicture from './assets/LynaeWaifu.png';

const cards = [
  {
    id: 1,
    image: ryzentPicture,
    title: "Osu",
    description: "ryzent on Osu!",
    link: "https://osu.ppy.sh/users/ryzent",
    containerClass: "osu-container",
    imageClass: "ryzent-image"
  },
  {
    id: 2,
    image: akaliPicture,
    title: "LOL Profile",
    description: "ryzzmc#0101 on League",
    link: "https://op.gg/lol/summoners/sea/ryzmc-0101",
    containerClass: "league-container",
    imageClass: "akali-image"
  },
  {
    id: 3,
    image: lynaePicture,
    title: "Lynae Main on WUWA",
    description: "Lynae Mains on Reddit",
    link: "https://www.reddit.com/r/LynaeMains/",
    containerClass: "lynae-container",
    imageClass: "lynaePicture"
  }
];

function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef(null);

  // 🔽 Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setDragOffset(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setDragOffset(0);
  };

  // 🖱️ Mouse drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If dragged more than 100px, change slide
    if (dragOffset > 100) {
      goToPrevious();
    } else if (dragOffset < -100) {
      goToNext();
    } else {
      // Snap back
      setDragOffset(0);
    }
  };

  return (
    <>
      {/* 🔘 Side Navigation Buttons (fixed to screen edges) */}
      <button 
        className="side-nav prev" 
        onClick={goToPrevious}
        aria-label="Previous card"
      >
        ❮
      </button>
      <button 
        className="side-nav next" 
        onClick={goToNext}
        aria-label="Next card"
      >
        ❯
      </button>

      {/* 🎴 Draggable Slider */}
      <div 
        ref={sliderRef}
        className="card-slider"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="slider-track">
          {cards.map((card, index) => {
            // Calculate position: active = 0, next = +100%, prev = -100%
            let position = 0;
            if (index === currentIndex) {
              position = dragOffset;
            } else if (index === (currentIndex + 1) % cards.length) {
              position = 100 + dragOffset / 10;
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
              position = -100 + dragOffset / 10;
            } else {
              position = index > currentIndex ? 100 : -100;
            }

            return (
              <div
                key={card.id}
                className={`slide ${index === currentIndex ? "active" : ""} ${isDragging ? "dragging" : ""}`}
                style={{ 
                  transform: `translateX(${position}%)`,
                  transition: isDragging ? 'none' : 'transform 0.4s ease-out'
                }}
              >
                <div className={card.containerClass}>
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    <img className={card.imageClass} src={card.image} alt={card.title} />
                  </a>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔘 Dots indicator */}
        <div className="slider-dots">
          {cards.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CardSlider;