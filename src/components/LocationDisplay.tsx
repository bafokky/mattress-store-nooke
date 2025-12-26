import React from "react";
import "../styles/locDisplay.css";

const LocationDisplay: React.FC = () => {
  return (
    <div className="store-info-container">
      <div className="address-info-container">
        <div className="orange-pill" />
      </div>
      <p className="address-info-section">
        <span className="address-info-heading">
          Адрес магазина:
          <br />
        </span>
        <span className="address-info-text-style">
          г. Минск, ул. Космонавтов 41
          <br />
          <br />
        </span>
        <span className="address-info-heading">Время работы:</span>
        <span className="address-info-text-style">
          <br />
        </span>
        <span className="address-info-text-style">
          Понедельник – пятница: 10:00 – 19:00
          <br />
          Суббота{" "}
        </span>
        <span className="address-details">–</span>
        <span className="address-info-text-style">
          {" "}
          воскресенье: 10:00 – 15:00
          <br />
        </span>
        <span className="address-info-text-style">
          {" "}
          Обед понедельник – пятница: 12:00 – 13:00
          <br />
        </span>
        <span className="address-info-text-style">
          <br />
        </span>
        <span className="address-info-heading">
          Телефон: <br />
        </span>
        <span className="address-info-text-style">
          <a href="tel:+375299263712" style={{ color: "inherit", textDecoration: "none" }}>
            +375-(29)-926-37-12
          </a>
        </span>
      </p>
      <div className="orange-strip"></div>
    </div>
  );
};

export default LocationDisplay;