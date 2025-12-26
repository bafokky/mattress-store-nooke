import React from "react";
import "../styles/preferences.css";

// 1. Описываем интерфейс пропсов
interface PreferencesCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

// 2. Используем типизацию для функционального компонента
const PreferencesCard: React.FC<PreferencesCardProps> = ({ 
  imageSrc, 
  title, 
  description 
}) => {
  return (
    <div className="animate preferences-card">
      {/* В TypeScript/React хорошим тоном считается добавление alt для изображений */}
      <img src={imageSrc} className="preferences-card__image" alt={title} />
      <h3 className="preferences-card__title">{title}</h3>
      <p className="preferences-card__description">{description}</p>
      <div className="orange-strip"></div>
    </div>
  );
};

export default PreferencesCard;