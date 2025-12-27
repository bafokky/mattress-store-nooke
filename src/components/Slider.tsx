import React, { useState, useEffect } from 'react';
import slider1 from "../assets/img/slider_1.jpg";
import slider2 from "../assets/img/slider_2.jpg";
import slider3 from "../assets/img/slider_3.jpg";

const Slider: React.FC = () => {
  const images: string[] = [
    slider1, 
    slider2,
    slider3
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleButtonClick = (index: number): void => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]); 

  return (
    <div className="tw-absolute tw-right-0 tw-w-[69%] tw-h-full tw-overflow-hidden tw-mx-auto">
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="tw-w-full tw-h-full tw-object-cover tw-flex-shrink-0"
      />

      <div className="tw-absolute tw-bottom-[100px] tw-left-1/2 tw--translate-x-1/2 
         tw-flex tw-gap-[15px] tw-z-[4]">
        {images.map((_, index: number) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`tw-w-[15px] tw-h-[15px] tw-border-none tw-rounded-full tw-cursor-pointer tw-transition-colors tw-duration-300 after:tw-content-[''] after:tw-block after:tw-w-full after:tw-h-full after:tw-rounded-full tw-bg-[rgba(227,114,67,1)] ] ${
              currentImageIndex === index ? 'active' : ''
            }`}
            aria-label={`Go to slide ${index + 1}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;