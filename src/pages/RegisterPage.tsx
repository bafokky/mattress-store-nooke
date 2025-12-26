import React, { useState } from "react";
import { registerUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage("Пожалуйста, заполните все поля!");
      return;
    }

    const result = await registerUser(username, password);
    setMessage(result.message);
    if (result.success) navigate("/login");
  };

  return (
    <div className="main-auth-container">
      <div className="auth-container">
        <h2>Регистрация</h2>
        <h3>Создайте учётную запись</h3>
        <form className="auth-form">
          <div className="text-only">
            <label>Логин</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="text-only">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="submit-group send-btn">
            <button
              type="button"
              onClick={handleRegister}
              className="
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
"
            >
              Регистрация
            </button>
          </div>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
