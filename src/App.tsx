import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/app.css";


import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";

import Loading from "./components/Loading";
import ContactHeader from "./components/ContactHeader";
import Footer from "./components/Footer";
import Header from "./components/Header"; // Импортируем новый Header
import FavoritesPage from "./components/FavoritesPage";
import CartPage from "./components/CartPage";

import { isAuthenticated } from "./utils/auth";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CartProvider } from "./contexts/CartContext";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [resetFilters, setResetFilters] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <FavoritesProvider>
      <CartProvider>
        <ContactHeader />
        
        {/* Используем вынесенный компонент */}
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          setResetFilters={setResetFilters} 
          isAuth={isAuth} 
        />

        <div className={`main-content ${isMenuOpen ? "shifted" : ""}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route
              path="/catalog"
              element={
                <CatalogPage
                  resetFilters={resetFilters}
                  onResetFilters={setResetFilters}
                />
              }
            />

            <Route
              path="/catalog/double"
              element={
                <CatalogPage
                mattressType="Пружинные"
                  resetFilters={resetFilters}
                  onResetFilters={setResetFilters}
                />
              }
            />

            <Route
              path="/catalog/single"
              element={
                <CatalogPage
                mattressType="Беспружинные"
                  resetFilters={resetFilters}
                  onResetFilters={setResetFilters}
                />
              }
            />

            <Route path="/catalog/:id" element={<ProductPage />} />

            <Route
              path="/login"
              element={<LoginPage onLogin={() => setIsAuth(true)} />}
            />

            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/profile"
              element={<ProfilePage onLogout={() => setIsAuth(false)} />}
            />

            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;