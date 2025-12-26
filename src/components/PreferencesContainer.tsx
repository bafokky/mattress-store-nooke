import React from "react";
import "../styles/preferences.css";
import PreferencesCard from "./PreferencesCard"; 
import measureImage from '../assets/tape-measure.png';
import materialImage from '../assets/material.png';
import trackImage from '../assets/cargo-truck.png';

const PreferencesContainer: React.FC = () => {
  return (
    <div className="pref-details-container">
      <p className="pref-title-text-style">Нас выбирают за</p>
      <div className="PrefContainer">
        <PreferencesCard
          imageSrc={measureImage}
          title="Точный замер для нестандартных размеров"
          description="Нужен матрас нестандартного размера или формы? Наш замерщик точно измерит ваше спальное место, учтёт все особенности кровати или ниши, и мы изготовим матрас по индивидуальным параметрам с гарантией идеального прилегания."
        />
        <PreferencesCard
          imageSrc={materialImage}
          title="Натуральные материалы и инновационные технологии"
          description="Мы используем только экологически чистые материалы: натуральный латекс, кокосовое волокно, пену с эффектом памяти, независимые пружинные блоки. Каждый матрас создан для здорового сна и максимального комфорта."
        />
        <PreferencesCard
          imageSrc={trackImage}
          title="Доставка прямо к вашему порогу"
          description="Наша команда позаботится о том, чтобы ваш матрас был доставлен в идеальном состоянии и в удобное для вас время, что сэкономит ваше время и силы. Вы можете быть уверены, что ваш матрас прибудет вовремя и без повреждений."
        />
      </div>
    </div>
  );
};

export default PreferencesContainer;