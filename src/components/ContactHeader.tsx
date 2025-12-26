import React from "react";
import "../styles/contactHeader.css";
// Импорт изображений
import phoneCallIcon from '../assets/phone-call.png';
import emailIcon from '../assets/mail.png';
import mapFlagIcon from '../assets/maps-and-flags.png';

const ContactHeader: React.FC = () => {
  return (
    <div className="contact-info-section">
      <div className="contact-info-section2">
        <div className="contact-info-section1">
          {/* Группа: Телефон */}
          <div className="contact-info-section1">
            <a href="tel:+375299263712" className="contact-link">
              <img src={phoneCallIcon} className="contact-info-icon" alt="Phone Icon" />
              <p className="phone-number-text-style">+375-(29)-926-37-12</p>
            </a>
          </div>

          {/* Группа: Почта */}
          <div className="contact-info-container">
            <a href="mailto:bafokky@gmail.com" className="contact-link">
              <img src={emailIcon} className="contact-info-icon" alt="Email Icon" />
              <p className="email-info-text-style">bafokky@gmail.com</p>
            </a>
          </div>
        </div>

        {/* Группа: Адрес */}
        <div className="contact-info-section1">
          <a 
            href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82%D0%BE%D0%B2+41/@53.8471485,27.4548969,18.01z/data=!4m7!3m6!1s0x46dbda7820337909:0x688b8187153bb3ae!4b1!8m2!3d53.847109!4d27.4561729!16s%2Fg%2F11c1zsxsnl?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D" 
            className="contact-link" 
            target="_blank" 
            rel="noopener noreferrer" 
          >
            <img src={mapFlagIcon} className="contact-info-icon" alt="Map Location Icon" />
            <p className="address-label">г. Минск, ул. Космонавтов 41</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;