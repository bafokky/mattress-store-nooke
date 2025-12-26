import React from 'react';
import '../../styles/aboutus/AboutUsPageStyles.css'

function AboutUsPageShablon({ title, subtitle, description, image, reverse }) {
  return (
    <div className={`about-us-shabl ${reverse ? 'reverse' : ''}`}>
      <div className='info'>
            <div className="text-content">
              <h2 className='title'>{title}</h2>
              <h3 className='subtitle'>{subtitle}</h3>
              <p className='description'>{description}</p>
            </div>
          <div className="orange-about-line"></div>
      </div>

      
      <div className="image-content">
        <img src={image} alt="About us" />
      
      </div>
    </div>
  );
}

export default AboutUsPageShablon;
