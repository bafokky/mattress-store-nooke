import React, { useState, ChangeEvent } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage("Пожалуйста, заполните все поля!");
      return;
    }

    const result = await loginUser(username, password);

    setMessage(result.message);

    if (result.success) {
      onLogin?.(); // обновляем состояние в App
      navigate("/profile"); // сразу переходим на профиль
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="main-auth-container">
      <div className="auth-container">
        <h2>Авторизация</h2>
        <h3>Введите свои данные для входа в систему</h3>
        <form className="auth-form">
          <div className="text-only">
            <label>Логин</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="text-only">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="submit-group send-btn">
            <button
              type="button"
              onClick={handleLogin}
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
              Войти
            </button>
          </div>
        </form>
        <p className="auth-message">{message}</p>
        <p className="auth-switch">
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
