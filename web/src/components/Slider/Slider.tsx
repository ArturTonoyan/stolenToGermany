import React, { useState, useEffect } from 'react';
import styles from "./Slider.module.scss";

const images = ['./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg','./img/img1.svg',];

const Slider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log(index)
    }, [index]);
  
    return (
      <div className={styles.Slider}>
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Image ${i + 1}`}
            // id={ i === index && styles.active}
            style={{
              position: 'absolute',
              transition: 'transform 0.5s ease',
            //   transform: `scale(${index === i ? 1.1 : 1})`,
              left: `${50 + 40 * Math.cos(((2 * Math.PI) / images.length) * i)}%`,
              top: `${50 + 40 * Math.sin(((2 * Math.PI) / images.length) * i)}%`,
            }}
          />
        ))}
      </div>
    );
  };

export default Slider;

