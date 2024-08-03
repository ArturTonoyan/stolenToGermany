import React, { useState, useEffect } from "react";
import styles from "./Slider.module.scss";

const images = [
  "./img/imgSlider/1.png",
  "./img/imgSlider/2.png",
  "./img/imgSlider/3.png",
  "./img/imgSlider/4.png",
  "./img/imgSlider/5.png",
  "./img/imgSlider/6.png",
  "./img/imgSlider/7.png",
  "./img/imgSlider/8.png",
  "./img/imgSlider/9.png",
  "./img/imgSlider/10.png",
  "./img/imgSlider/11.png",
  "./img/imgSlider/12.png",
];

const Slider = () => {
  const [index, setIndex] = useState(12);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => { 
   console.log("index", index);
  }, [index]);

  useEffect(() => {
    console.log("go")
    const interval = setInterval(() => {
      if (!isPaused) {
        console.log('indexISPause', index);
        // if (index === 0) {
        //   setIndex(12);
        // } else {
          setIndex((prevIndex) => (prevIndex - 1) % images.length);
        //}
      }
    }, 2000); // Rotate every 2 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    console.log("paused")
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
      }, 2500); // Pause for 2.5 seconds
      return () => clearTimeout(timeout);
    }
  }, [isPaused]);

  useEffect(() => {
    const slider = document.getElementById("sliderBlock");
    if (slider) {
      slider.style.transition = "transform 0.5s ease";  // Add smooth transition
      slider.style.transform = `rotate(${index * 30}deg)`;  // Smoothly rotate by 30 degree
    }
    if (index === 0) {
      // Assuming the left-center image is at index 3
      // setIsPaused(true);
      setIndex(12)
    }
  }, [index]);
  
  return (
    <div className={styles.Slider} id="sliderBlock">
      {images.map((image, i) => {
        const angle = (360 / 12) * i + 180;
        console.log('angle', angle)
        console.log('index * 30', ( index * 30) + 180)
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
              
              width:  angle - 30  === (180- index * 30) + 150 ? "200px" : "160px",
              height:  angle - 30 === (180-index * 30) + 150 ? "200px" : "160px",
              
            }}
          />
        );
      })}
    </div>
  );
};

export default Slider;
