import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Button from '../Button';
import data from "../../data/data.json";
import '../../styles/catalog/singleProduct.css';

import measureIcon from '../../assets/measure.png';
import degreeIcon from '../../assets/degree.png';
import truckIcon from '../../assets/delivery-truck.png';
import toolsIcon from '../../assets/tools.png';
import viberIcon from '../../assets/viber.png';
import tgIcon from '../../assets/telegram.png';
import heartIcon from '../../assets/heart.png';
import heartFilledIcon from '../../assets/heart-filled.png';

import Email from "../../Email";
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { isAuthenticated } from '../../utils/auth';


interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    img: string;
    material?: string;
    fill?: string;
    orthopedic?: string;
    fabricator?: string;
    size: string[];
    [key: string]: any;
}

const SingleProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); 
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isSizeModalOpen, setIsSizeModalOpen] = useState<boolean>(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string>('');
    
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { toggleCartItem, isInCart, getCartItemBySize } = useCart();

    useEffect(() => {
        const foundProduct = (data as any).find((item: any) => item.id === parseInt(id || "0"));
        if (foundProduct) {
            setProduct(foundProduct);
            if (foundProduct.size && foundProduct.size.length > 0) {
                setSelectedSize(foundProduct.size[0]);
            }
        }
    }, [id]);

    const openEmailModal = () => setIsEmailModalOpen(true);
    const closeEmailModal = () => setIsEmailModalOpen(false);

    const openImageModal = (image: string) => {
        setCurrentImage(image);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setCurrentImage('');
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        setIsSizeModalOpen(false);
    };

    const openSizeModal = () => setIsSizeModalOpen(true);
    const closeSizeModal = () => setIsSizeModalOpen(false);

    const userIsAuth = isAuthenticated();
    
    useEffect(() => {
        const isModalOpen = isEmailModalOpen || isImageModalOpen || isSizeModalOpen;
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    }, [isEmailModalOpen, isImageModalOpen, isSizeModalOpen]);

    const handleFavoriteClick = () => {
        if (product) {
            if (isFavorite(product.id)) {
                removeFromFavorites(product.id);
            } else {
                addToFavorites(product as any);
            }
        }
    };

    //лотгика кнопки добавления в корзину
    const handleCartAction = () => {
        if (product && selectedSize) {
            if (isSizeInCart) {
                navigate('/cart');
            } else {
                const productWithSize = {
                    ...product,
                    selectedSize: selectedSize,
                    displaySize: selectedSize
                };
                toggleCartItem(productWithSize, 1);
            }
        }
    };

    const isSizeInCart = (product && selectedSize) ? isInCart(product.id, selectedSize) : false;
    const cartItemWithSize = (product && selectedSize) ? getCartItemBySize(product.id, selectedSize) : null;
    const cartQuantity = cartItemWithSize ? cartItemWithSize.quantity : 0;

    return (
        <>
            {product ? (
                <div className="single-container-info">
                    <div className="product-information-container">
                        <div className="product-img-container">
                            <div className="single-product-info-name-adapt">
                                <h1>{product.name}</h1>
                            </div>
                            <div className="select-img-product-container">
                                <img 
                                    className="select-img-product" 
                                    src={product.img} 
                                    alt={product.name} 
                                    onClick={() => openImageModal(product.img)}
                                />
                            </div>
                        </div>
                        <div className="single-product-info-container">
                            <h1>{product.name}</h1>
                            {product.price && <div className="info-item"><p className="info-description"><span>Цена:</span> {product.price} BYN</p></div>}
                            {product.type && <div className="info-item"><p className="info-description"><span>Тип:</span> {product.type}</p></div>}
                            {product.material && <div className="info-item"><p className="info-description"><span>Материал:</span> {product.material}</p></div>}
                            {product.fill && <div className="info-item"><p className="info-description"><span>Наполнитель:</span> {product.fill}</p></div>}
                            {product.orthopedic && <div className="info-item"><p className="info-description"><span>Ортопедические свойства:</span> {product.orthopedic}</p></div>}
                            {product.fabricator && <div className="info-item"><p className="info-description"><span>Производитель:</span> {product.fabricator}</p></div>}

                            <div className="size-info-container">
                                <h3>Доступные размеры:</h3>
                                <div className="size-info">
                                    <ul>
                                        {product.size.map((size, index) => {
                                            const isSizeInCartFlag = isInCart(product.id, size);
                                            return (
                                                <li 
                                                    key={index}
                                                    className={`size-option ${selectedSize === size ? 'selected' : ''} ${isSizeInCartFlag ? 'in-cart-size' : ''}`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                    {selectedSize === size && <span className="size-check">✓</span>}
                                                    {isSizeInCartFlag && <span className="size-cart-badge">В корзине</span>}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="selected-size-display">
                                <p><span>Выбранный размер:</span> {selectedSize}</p>
                                {cartQuantity > 0 && (
                                    <p className="size-cart-quantity">
                                        <span>В корзине:</span> {cartQuantity} шт.
                                    </p>
                                )}
                            </div>
                            
                            <div className="text-description-to-button">
                                <p>Наличие товара в магазине или любые другие вопросы уточняйте по номеру телефона или оставьте заявку</p>
                            </div>
                            <div className="button-container">
                                <div className="contact-viber-tg">
                                    <a href="viber://chat?number=%2B375299263712&text=Здравствуйте,%20нужна%20ваша%20консультация%20по%20матрасам." target="_blank" rel="noopener noreferrer">
                                        <img src={viberIcon} className="location-icon" alt="Viber" />
                                        <p><span>Viber:</span>&nbsp;&nbsp;+375-(29)-926-37-12</p>
                                    </a>
                                    <a href="https://t.me/bafokky?text=Здравствуйте,%20нужна%20ваша%20консультация%20по%20матрасам." target="_blank" rel="noopener noreferrer">
                                        <img src={tgIcon} className="location-icon" alt="Telegram" />
                                        <p><span>Telegram:</span>&nbsp;&nbsp;+375-(29)-926-37-12</p>
                                    </a>
                                </div>
                            </div>
                             <div className="single-button">
                                {userIsAuth && (
                                    <Button 
                                        className={`favorite-btn single-favorite-btn ${isFavorite(product.id) ? 'favorite-active' : ''}`}
                                        onClick={handleFavoriteClick}
                                    >
                                        <img 
                                            src={isFavorite(product.id) ? heartFilledIcon : heartIcon} 
                                            alt="Избранное" 
                                            className="favorite-icon tw-w-6 tw-h-6 tw-object-contain tw-block"
                                        />
                                    </Button>
                                )}
                                 {userIsAuth && (
                                     <Button 
                                        className={`add-to-cart-btn ${isSizeInCart ? 'in-cart' : ''}`}
                                        onClick={handleCartAction} 
                                        text={isSizeInCart ? "Перейти в корзину" : "В корзину"} 
                                     />
                                )}
                                </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{padding: "100px", textAlign: "center"}}>Продукт не найден</div>
            )}

            <div className="services-container">
                <div className="services-info-container">
                    <div className="single-services-info">
                        <div className="services-img-cotainer">
                            <img src={measureIcon} className="services-img" alt="Консультация" />
                        </div>
                        <div className="services-text-container">
                            <h3>Консультация:</h3>
                            <p>Наши специалисты помогут подобрать матрас по вашим индивидуальным параметрам и потребностям.</p>
                        </div>
                    </div>
                    <div className="single-services-info">
                        <div className="services-img-cotainer">
                            <img src={truckIcon} className="services-img" alt="Доступка" />
                        </div>
                        <div className="services-text-container">
                            <h3>Доставка:</h3>
                            <p>Мы осуществляем <span>бесплатную</span> доставку в пределах города. При выезде за город доставка <span>от 15 рублей</span>.</p>
                        </div>
                    </div>
                    <div className="single-services-info">
                        <div className="services-img-cotainer">
                            <img src={degreeIcon} className="services-img" alt="Гарантия" />
                        </div>
                        <div className="services-text-container">
                            <h3>Гарантия:</h3>
                            <p>Мы предоставляем гарантию на все матрасы в течение <span>12-24 месяцев</span> в зависимости от производителя.</p>
                        </div>
                    </div>
                    <div className="single-services-info">
                        <div className="services-img-cotainer">
                            <img src={toolsIcon} className="services-img" alt="Установка" />
                        </div>
                        <div className="services-text-container">
                            <h3>Установка:</h3>
                            <p>Наши специалисты осуществляют доставку, подъём на этаж и профессиональную установку матраса на основание кровати.</p>
                        </div>
                    </div>
                    <div className="single-services-info">
                        <div className="services-text-container">
                            <h3>Информация о товаре предоставлена для ознакомления и не является публичной офертой.</h3>
                            <p>Производители оставляют за собой право изменять внешний вид, характеристики и комплектацию товара, предварительно не уведомляя продавцов и потребителей.</p>
                        </div>
                    </div>
                </div>
            </div>


            {isSizeModalOpen && product && (
                <div className="modal-overlay" onClick={closeSizeModal}>
                    <div className="modal-content size-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Выберите размер</h3>
                        <div className="size-options-modal">
                            {product.size.map((size, index) => {
                                const isSizeInCartFlag = isInCart(product.id, size);
                                return (
                                    <button
                                        key={index}
                                        className={`size-option-btn ${selectedSize === size ? 'selected' : ''} ${isSizeInCartFlag ? 'in-cart' : ''}`}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                        <button className="close-modal-btn" onClick={closeSizeModal}>✕</button>
                    </div>
                </div>
            )}

            {isImageModalOpen && (
                <div className="modal-overlay" onClick={closeImageModal}>
                    <div className="modal-content-img" onClick={(e) => e.stopPropagation()}>
                        <img src={currentImage} alt="Full view" style={{maxWidth: '100%'}} />
                        <button className="close-modal-btn" onClick={closeImageModal}>✕</button>
                    </div>
                </div>
            )}

            {isEmailModalOpen && (
                <div className="modal-overlay" onClick={closeEmailModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <Email modalClose={closeEmailModal} />
                        <button onClick={closeEmailModal} className="close-modal-btn">x</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SingleProduct;