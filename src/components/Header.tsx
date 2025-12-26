import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  setResetFilters, 
  isAuth 
}) => {
  
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setResetFilters(true);
  };

  return (
    <header className="header">
      <div className="container-header">
        <Link className="links" to="/" onClick={closeMenu}>
          <div className="logo-container">
            <p className="title-company">NOOKE</p>
          </div>
        </Link>

        <div className="links-button-container">
          <div className="link-container">
            <input
              type="checkbox"
              id="burger-checkbox"
              className="burger-checkbox"
              checked={isMenuOpen}
              onChange={toggleMenu}
            />
            <label htmlFor="burger-checkbox" className="burger"></label>

            <ul className="menu-list">
              <li>
                <Link className="links" to="/" onClick={closeMenu}>
                  Главная
                </Link>
                <div className="line-div" />
              </li>

              <li>
                <Link className="links" to="/about" onClick={closeMenu}>
                  О нас
                </Link>
                <div className="line-div" />
              </li>

              <li className="dropdown">
                <Link
                  className="links dropdown-link"
                  to="/catalog"
                  onClick={closeMenu}
                >
                  Каталог
                  <span className="arrow"></span>
                </Link>

                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to="/catalog/double"
                    onClick={closeMenu}
                  >
                    Пружинные матрасы
                  </Link>

                  <Link
                    className="dropdown-item"
                    to="/catalog/single"
                    onClick={closeMenu}
                  >
                    Беспружинные матрасы
                  </Link>
                </div>
                <div className="line-div" />
              </li>

              <li>
                <Link className="links" to="/contact" onClick={closeMenu}>
                  Контакты
                </Link>
                <div className="line-div" />
              </li>

              <li>
                {isAuth ? (
                  <Link className="links" to="/profile" onClick={closeMenu}>
                    Профиль
                  </Link>
                ) : (
                  <Link className="links" to="/login" onClick={closeMenu}>
                    Войти
                  </Link>
                )}
                <div className="line-div" />
              </li>

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;