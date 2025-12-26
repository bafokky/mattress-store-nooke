import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

//структура товара в корзине
export interface CartItem {
    id: number | string;
    price: number;
    quantity: number;
    selectedSize: string;
    displaySize?: string;
    title?: string; 
    image?: string;
    [key: string]: any; 
}

//тип контекста
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (itemId: number | string, size?: string | null) => void;
    toggleCartItem: (product: any, quantity?: number) => void;
    updateQuantity: (itemId: number | string, newQuantity: number, size?: string | null) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    isInCart: (productId: number | string, size?: string | null) => boolean;
    getCartItemBySize: (productId: number | string, size: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  //инициализация состояния из локалсторедж
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
            return [];
        }
    });

    //сохранение
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: any, quantity: number = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.selectedSize === product.selectedSize
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                return [...prevItems, {
                    ...product,
                    quantity,
                    selectedSize: product.selectedSize,
                    displaySize: product.displaySize || product.selectedSize
                }];
            }
        });
    };

    const removeFromCart = (itemId: number | string, size: string | null = null) => {
        setCartItems(prevItems => {
            if (size) {
                return prevItems.filter(item => 
                    !(item.id === itemId && item.selectedSize === size)
                );
            }
            return prevItems.filter(item => item.id !== itemId);
        });
    };

    const toggleCartItem = (product: any, quantity: number = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.selectedSize === product.selectedSize
            );

            if (existingItemIndex !== -1) {
                return prevItems.filter((_, index) => index !== existingItemIndex);
            } else {
                return [...prevItems, {
                    ...product,
                    quantity,
                    selectedSize: product.selectedSize,
                    displaySize: product.displaySize || product.selectedSize
                }];
            }
        });
    };

    const updateQuantity = (itemId: number | string, newQuantity: number, size: string | null = null) => {
        if (newQuantity < 1) {
            removeFromCart(itemId, size);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item => {
                const isMatch = size 
                    ? (item.id === itemId && item.selectedSize === size)
                    : (item.id === itemId);
                
                return isMatch ? { ...item, quantity: newQuantity } : item;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const isInCart = (productId: number | string, size: string | null = null) => {
        if (size) {
            return cartItems.some(item => item.id === productId && item.selectedSize === size);
        }
        return cartItems.some(item => item.id === productId);
    };

    const getCartItemBySize = (productId: number | string, size: string) => {
        return cartItems.find(item => item.id === productId && item.selectedSize === size);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            toggleCartItem,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems,
            isInCart,
            getCartItemBySize
        }}>
            {children}
        </CartContext.Provider>
    );
};