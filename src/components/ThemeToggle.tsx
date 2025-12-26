import React, { useState, useEffect } from "react";

import lIcon from "../assets/light.svg"; 
import dIcon from "../assets/dark.svg";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  return (
    <button 
      className="theme-toggle tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2" 
      onClick={() => setIsDark(!isDark)}
      aria-label="Переключить тему"
    >
      <img 
        src={isDark ? lIcon : dIcon} 
        alt="" 
        className="tw-w-3.5 tw-h-3.5 tw-mr-1" 
      />
      <span>{isDark ? "Светлая" : "Тёмная"}</span>
    </button>
  );
};

export default ThemeToggle;