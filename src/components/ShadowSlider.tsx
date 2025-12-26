import React from "react";
import "../styles/shadow.css";
import Slider from './Slider'; 
import Button from './Button';
import { Link } from 'react-router-dom';

const ShadowSlider: React.FC = () => {
  return (
    <div className="container">
      <div className="shadow-overlay">
        <div className="mattress-both">
          <div className="shadow-container">
            <div className="mattress-sales-section">
              <div className="mattress-description-container">
                <div className="mattress-divider" />
                <h1 className="mattress-text-block">
                 Качественные матрасы от ведущих Белорусских производителей
                </h1>
              </div>
              <h3 className="product-description-text-style">
                Анатомическая поддержка, натуральные материалы и долговечность в каждой детали. Ваш комфорт - наша работа.
              </h3>
              <div className="mattress-button-container">
                <Link to='/about'>
                  <Button className="detail-button" text="Подробнее" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-rounded-[10px] 
         tw-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
        <Slider />
      </div>
    </div>
  );
};

export default ShadowSlider;