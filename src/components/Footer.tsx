import "../styles/footer.css";
import viberIcon from '../assets/viber.png';
import tgIcon from '../assets/telegram.png';
import instaIcon from '../assets/instagram.png';
import phoneIcon from '../assets/phone-call.png';
import mapIcon from '../assets/maps-and-flags.png';
import clockIcon from '../assets/clock.png';
import whatsappIcon from '../assets/whatsapp.png';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="main-content-container">
      <div className="company-info-section">
        <div className="exclusive-mattress-firm-section"> 
          <div className="flex-container-with-text">
            <div className="company-title-container">
              <p className="company-title-style">О нас</p>
            </div>
            <div className="company-header-separator" />
          </div>
          <div className="exclusive-mattress-styles"> 
            <h1 className="exclusive-mattress-text">
             Салон матрасов NOOKE предлагает эксклюзивные модели матрасов для жителей Сморгони, Молодечно, Ошмян, Островца, Минска и других городов Беларуси. Мы
специализируемся на подборе ортопедических матрасов премиум-класса, которые идеально сочетают инновационные технологии, анатомическую поддержку и экологичные материалы. Наши специалисты гарантируют профессиональную консультацию, бесплатную доставку и установку, а также доступные цены для комфортного сна всей семьи.
            </h1>
              <div className="exclusive-mattress-gallery"> 
                <a href="https://wa.me/3752992сюда?" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} className="location-icon" alt="Whatsapp" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instaIcon} className="location-icon" alt="Instagram" />
                </a>
                <a href="viber://chat?number=%2B375сюда" target="_blank" rel="noopener noreferrer">
                    <img src={viberIcon} className="location-icon" alt="Viber" />
                </a>
                <a href="https://t.me/сюда" target="_blank" rel="noopener noreferrer">
                    <img src={tgIcon} className="location-icon" alt="Telegram" />
                </a>
              </div>
          </div>
          <div className="under-separator" />
        </div>
        <div className="contact-info-container1">
            <div className="simple-contact-info">
                <div className="title-contact-container">
                    <img src={mapIcon} className="title-icon" alt="mapIcon" />
                    <p className="title-contact">Локация</p>
                </div>
                <a
                href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82%D0%BE%D0%B2+41/@53.8471485,27.4548969,18.01z/data=!4m7!3m6!1s0x46dbda7820337909:0x688b8187153bb3ae!4b1!8m2!3d53.847109!4d27.4561729!16s%2Fg%2F11c1zsxsnl?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
                >
                <p className="contact-info-style">г. Минск, ул Космонавтов 41</p>
                </a>
            </div>
            <div className="simple-contact-info">
                <div className="title-contact-container">
                    <img src={phoneIcon} className="title-icon" alt="phoneIcon" />
                    <p className="title-contact">Связаться с нами</p>
                </div>
                <a href="tel:80299263712" className="email-link">
                  <p className="contact-info-style">Тел: +375-(29)-92-637-12</p>
                </a>
                <a href="mailto:bafokky@gmail.com" className="email-link">
                    <span className="email-label-text-style">Email: </span>
                    <span className="email-link-text-style">&nbsp;bafokky@gmail.com</span>
                </a>
            </div>
            <div className="simple-contact-info">
                <div className="title-contact-container">
                    <img src={clockIcon} className="title-icon" alt="clockIcon" />
                    <p className="title-contact">График работы</p>
                </div>
                <p className="contact-info-style">
                  Понедельник – пятница:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10:00 – 19:00
                </p>
                <p className="contact-info-style">
                  Суббота – воскресенье:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10:00 – 15:00
                </p>
                <p className="contact-info-style">
                  Обед понедельник – пятница:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:00 – 13:00
                </p>
            </div>
        </div>
      </div>
      <div className="orange-line"/>
    </div>
  );
}
export default Footer;