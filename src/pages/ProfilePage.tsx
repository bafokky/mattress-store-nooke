import React, { useEffect, useState } from "react";
import { logout, isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

interface ProfilePageProps {
  onLogout?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      if (userObj?.username) setUsername(userObj.username);
    }
  }, []);

  const handleLogout = () => {
    logout();
    onLogout?.();
    navigate("/");
  };

  if (!isAuthenticated()) {
    return (
      <div className="main-auth-container">
        <div className="profile-page">
          <h2>Вы не авторизованы</h2>
          <p>
            <a href="/login" className="auth-link">
              Перейти ко входу
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-auth-container">
      <div className="profile-page">
        <div className="profile-header">
          <div>
            <h2 className="profile-title">
              Добро пожаловать{username ? `, ${username}` : ""}!
            </h2>
            <p className="profile-text">Вы успешно вошли в систему.</p>
          </div>
        </div>
        <div className="submit-group">
          <button onClick={handleLogout} className="
    tw-box-border tw-flex tw-items-center tw-justify-center tw-flex-none 
    tw-w-[160px] tw-h-[40px] tw-gap-2 tw-cursor-pointer 
    tw-bg-[#e37243] tw-text-[#f2f2f2] tw-border-none tw-rounded-[5px] 
    tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] 
    tw-font-bold tw-font-['Inter',_sans-serif] 
    tw-text-[calc(12px+2*(100vw/1440))]
    tw-transition-all
    
    hover:tw-bg-[#d86a3e] hover:tw-text-[#dcdcdc]
    
    active:tw-bg-[#c65f34] active:tw-translate-y-[2px] 
    active:tw-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]
">
            Выйти
          </button>
          <button onClick={() => navigate("/favorites")} className="
    tw-box-border tw-flex tw-items-center tw-justify-center tw-flex-none 
    tw-w-[160px] tw-h-[40px] tw-gap-2 tw-cursor-pointer 
    tw-bg-[#e37243] tw-text-[#f2f2f2] tw-border-none tw-rounded-[5px] 
    tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] 
    tw-font-bold tw-font-['Inter',_sans-serif] 
    tw-text-[calc(12px+2*(100vw/1440))]
    tw-transition-all
    
    hover:tw-bg-[#d86a3e] hover:tw-text-[#dcdcdc]
    
    active:tw-bg-[#c65f34] active:tw-translate-y-[2px] 
    active:tw-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]
">
            <span className="btn-icon">❤</span>
            <span>Избранное</span>
          </button>
          <button onClick={() => navigate("/cart")} className="
    tw-box-border tw-flex tw-items-center tw-justify-center tw-flex-none 
    tw-w-[160px] tw-h-[40px] tw-gap-2 tw-cursor-pointer 
    tw-bg-[#e37243] tw-text-[#f2f2f2] tw-border-none tw-rounded-[5px] 
    tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] 
    tw-font-bold tw-font-['Inter',_sans-serif] 
    tw-text-[calc(12px+2*(100vw/1440))]
    tw-transition-all
    
    hover:tw-bg-[#d86a3e] hover:tw-text-[#dcdcdc]
    
    active:tw-bg-[#c65f34] active:tw-translate-y-[2px] 
    active:tw-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]
">
            <span>Корзина</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
