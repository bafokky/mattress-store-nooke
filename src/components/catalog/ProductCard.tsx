import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/catalog/productCard.css';
import { useFavorites } from '../../contexts/FavoritesContext';
import heartIcon from '../../assets/heart.png';
import heartFilledIcon from '../../assets/heart-filled.png';

interface ProductData {
    id: number | string;
    name: string;
    type: string;
    img: string;
    material?: string;
    fill?: string;
    size: string[];
    price: number;
}

interface ProductCardProps {
    product: ProductData;
    onClick?: (id: number | string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    onClick 
}) => {
    // Извлекаем поля из объекта product для удобства
    const { id, name, type, img, material, fill, size, price } = product;
    
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorite = isFavorite(id);
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites';

    const handleClick = (): void => {
        if (onClick) onClick(id);
    };

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation(); 
        if (favorite) {
            removeFromFavorites(id);
        } else {
            addToFavorites({ 
                id, 
                name, 
                type, 
                img, 
                material, 
                fill, 
                size,
                price 
            });
        }
    };

    return (  
        <div className="product-card" onClick={handleClick}>
            <div className='product-content'>
                <div className='product-img-container'>
                    <img className='product-img' src={img} alt={name} />

                    {isFavoritesPage && (
                        <button 
                            className={`favorite-btn ${favorite ? 'favorite-active' : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            <img 
                                src={favorite ? heartFilledIcon : heartIcon} 
                                alt="Избранное" 
                            />
                        </button>
                    )}
                </div>

                <div className='text-container'>
                    <h2 className='product-description'>{type}</h2>
                    <h1 className='product-name'>{name}</h1>
                    <h1 className='product-price'>{price} BYN</h1>
                    
                    {material && <p className='product-material'>Материал: {material}</p>}
                    {fill && <p className='product-fill'>Наполнитель: {fill}</p>}
                    <div className='product-sizes'>
                        <span>Размеры: </span>
                        {size.slice(0, 2).map((s, i) => (
                            <span key={i} className='size-item'>{s}</span>
                        ))}
                        {size.length > 2 && <span className='more-sizes'>...</span>}
                    </div>
                </div>
            </div>
            <div className='underline'></div>
        </div>
    );
};

export default ProductCard;