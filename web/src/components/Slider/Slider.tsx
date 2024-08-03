import React, { useState, useEffect } from "react";
import styles from "./Slider.module.scss";

const images = [
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
  "./img/img1.svg",
];

const Slider = () => {
  const [index, setIndex] = useState(12);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        console.log(index);
        if (index <= 0) {
          setIndex(12);
        } else {
          setIndex((prevIndex) => (prevIndex - 1) % images.length);
        }
      }
    }, 2000); // Rotate every 2 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
      }, 2500); // Pause for 2.5 seconds
      return () => clearTimeout(timeout);
    }
  }, [isPaused]);

  useEffect(() => {
    if (index === 3) {
      // Assuming the left-center image is at index 3
      setIsPaused(true);
    }
  }, [index]);

  return (
    <div className={styles.Slider}>
      {images.map((image, i) => {
        const angle = (360 / 12) * i + 90;
        const isActive = index === i;
        return (
          <img
            key={i}
            src={image}
            alt={`Image ${i + 1}`}
            style={{
              position: "absolute",
              transition:
                "transform 0.5s ease, width 0.5s ease, height 0.5s ease",
              left: `${
                50 + 40 * Math.cos(((2 * Math.PI) / images.length) * i)
              }%`,
              top: `${
                50 + 40 * Math.sin(((2 * Math.PI) / images.length) * i)
              }%`,
              transform: `rotate(${angle}deg)`,
              width: isActive ? "200px" : "160px", // Enlarge the active image
              height: isActive ? "200px" : "160px",
            }}
          />
        );
      })}
    </div>
  );
};

export default Slider;
