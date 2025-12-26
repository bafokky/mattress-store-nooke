import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import ProductCard from '../components/catalog/ProductCard';
import data from '../data/data.json';
import '../styles/CatalogSection.css';

interface Product {
    id: number | string;
    name: string;
    type: string;
    img: string;
    price: number;
    material: string;
    fill: string;
    size: string[]; 
    orthopedic?: string;
    fabricator?: string;
    [key: string]: any; 
}

const CatalogSection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(data as unknown as Product[]);
    }, []);

    const springlessProducts = products
        .filter(product => product.type === "Беспружинные")
        .slice(0, 5);
    
    const springProducts = products
        .filter(product => product.type === "Пружинные")
        .slice(0, 5);

    return (
        <div>
            <div className='home-page-catalog-section'>
                <div className='home-page-catalog-container'>
                    <div>
                        <h1 className='title-section'>Наши предложения</h1>
                    </div>
                    
                    <div className='info-with-lines'>
                        <div className='first-line'></div>
                        <h2 className='formal-title'>Беспружинные</h2>
                        <div className='second-line'></div>
                    </div>
                    <div className='catalog'>
                        <div className="product-list">
                            {springlessProducts.map(product => (
                                <Link key={product.id} to={`/catalog/${product.id}`} className="product-link">
                                    <ProductCard 
                                        product={product} 
                                        onClick={() => {}} 
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='link-to-catalog'>
                        <p>Перейти к полному каталогу</p>
                        <Link to='/catalog?type=Беспружинные'>
                            <Button text="Каталог" className="call-to-catalog-link" />
                        </Link>
                    </div>

                    <div className='info-with-lines'>
                        <div className='first-line'></div>
                        <h2 className='formal-title'>Пружинные</h2>
                        <div className='second-line'></div>
                    </div>
                    <div className='catalog'>
                        <div className="product-list">
                            {springProducts.map(product => (
                                <Link key={product.id} to={`/catalog/${product.id}`} className="product-link">
                                    <ProductCard 
                                        product={product} 
                                        onClick={() => {}} 
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='link-to-catalog'>
                        <p>Перейти к полному каталогу</p>
                        <Link to='/catalog?type=Пружинные'>
                            <Button text="Каталог" className="call-to-catalog-link" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogSection;