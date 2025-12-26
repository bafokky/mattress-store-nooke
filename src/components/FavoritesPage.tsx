import React from 'react';
import { useFavorites, FavoriteItem } from '../contexts/FavoritesContext';
import ProductCard from './catalog/ProductCard';
import '../styles/favorites.css';
import { useNavigate } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const navigate = useNavigate();

    const handleProductClick = (productId: number | string): void => {
        navigate(`/catalog/${productId}`);
    };

    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <div className="favorites-empty">
                    <h2>В избранном пока ничего нет</h2>
                    <p>Добавляйте товары в избранное, чтобы не потерять</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1>Избранное</h1>
                <p>Товаров: {favorites.length}</p>
            </div>
            <div className="favorites-grid">
                {favorites.map((product: FavoriteItem) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={() => handleProductClick(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;