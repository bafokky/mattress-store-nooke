import React, { useState, useEffect } from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import '../styles/cart.css';
import Button from './Button';
import Email from '../Email';

const CartPage: React.FC = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        getTotalPrice, 
        getTotalItems,
        clearCart 
    } = useCart();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const modalOpen = (): void => {
        setIsModalOpen(true);
    };

    const modalClose = (): void => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto'; 
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <div className="cart-empty tw-flex tw-flex-col tw-items-center tw-text-center">
                    <h2>Ваша корзина пуста</h2>
                    <p>Добавляйте товары в корзину, чтобы сделать заказ</p>
                    <Link to="/catalog">
                        <Button text="Перейти в каталог" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Корзина</h1>
                    <div className="cart-stats">
                        <p>Товаров: {getTotalItems()}</p>
                        <p>Общая сумма: <strong>{getTotalPrice()} BYN</strong></p>
                    </div>
                </div>

                <div className="cart-items">
                    {cartItems.map((item: CartItem) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.img} alt={item.name} />
                            </div>
                            
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p className="cart-item-type">{item.type}</p>
                                {item.material && <p>Материал: {item.material}</p>}
                                {item.selectedSize && (
                                    <p className="cart-item-size">
                                        Размер: <strong>{item.displaySize || item.selectedSize}</strong>
                                    </p>
                                )}
                                <p className="cart-item-price">{item.price} BYN</p>
                            </div>

                            <div className="cart-item-quantity">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity-value">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>

                            <div className="cart-item-total">
                                <p>{item.price * item.quantity} BYN</p>
                            </div>

                            <button 
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                className="cart-item-remove"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Количество товаров:</span>
                            <span>{getTotalItems()}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Итого:</span>
                            <span className="total-price">{getTotalPrice()} BYN</span>
                        </div>
                    </div>

                    <div className="cart-actions">
                        <button className="checkout-btn"
                        onClick={modalOpen} >
                          Оставить заявку
                          </button> 
                    
                        <button 
                            onClick={clearCart}
                            className="clear-cart-btn"
                        >
                            Очистить корзину
                        </button>
                        <Link to="/catalog">
                            <button className="continue-shopping-btn">
                                Продолжить покупки
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={modalClose}>
                    <div 
                        className="modal-content" 
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <Email 
                            modalClose={modalClose}
                            cartItems={cartItems as any}
                            totalPrice={getTotalPrice()}
                            onSuccess={clearCart}
                        />
                        <button onClick={modalClose} className="close-modal-btn">x</button>
                        <div className="orang-strip"></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartPage;