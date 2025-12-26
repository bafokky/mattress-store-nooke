import React, { useState } from 'react'; 
import '../../styles/catalog/productCatalog.css';


interface ProductData {
    id: number | string;
    name: string;
    price: number; 
    type: string;
    img: string;
    material?: string;
    fill?: string;
    size: string[];
    orthopedic?: string;
    fabricator?: string;
}

interface ProductCatalogProps {
    product: ProductData;
    onClick?: (id: number | string) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
    product, 
    onClick 
}) => {
    const { 
        id, 
        name,
        price, 
        type,
        img,
        material,
        fill,
        size,
        orthopedic 
    } = product;

    const [loading, setLoading] = useState<boolean>(true);

    const handleClick = (): void => {
        if (onClick) {
            onClick(id);
        }
    };

    const handleImageLoad = (): void => {
        setLoading(false);
    };

    return (  
        <div className="product-card1" onClick={handleClick}>
            <div className='product-content1'>
                <div className='product-img-container1'>
                    {loading && <div className="loading-spinner">Загрузка...</div>}
                    <img
                        className={`product-img1 ${loading ? 'hidden' : ''}`}
                        src={img}
                        alt={name}
                        onLoad={handleImageLoad}
                    />
                </div>
                <div className='text-container1'>
                    <h2 className='product-description1'>{type}</h2>
                    <h1 className='product-name1'>{name}</h1>
                    <h1 className='product-price1'>{price} BYN</h1>
                    {material && <p className='product-material'>Материал: {material}</p>}
                    {fill && <p className='product-fill'>Наполнитель: {fill}</p>}
                    {orthopedic && <p className='product-orthopedic'>Ортопедический: {orthopedic}</p>}
                    <div className='product-sizes'>
                        <span>Размеры: </span>
                        {size.slice(0, 2).map((sizeItem: string, index: number) => (
                            <span key={index} className='size-item'>{sizeItem}</span>
                        ))}
                        {size.length > 2 && <span className='more-sizes'>...</span>}
                    </div>
                </div>
            </div>
            <div className='underline1'></div>
        </div>
    );
};

export default ProductCatalog;