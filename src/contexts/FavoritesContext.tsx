import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

//структура товара
export interface FavoriteItem {
  id: number | string;
  name: string;
  price: number;
  img: string;
  type: string;
  material?: string;
  fill?: string;  
  size: string[];  
  [key: string]: any; 
}

//тип контекста
interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (productId: number | string) => void;
  isFavorite: (productId: number | string) => boolean;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

//загрузка избранного из локалсторедж
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Ошибка парсинга избранного:", error);
      }
    }
    setIsLoaded(true);
  }, []);

 //сохранение избранного
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (product: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: number | string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isFavorite = (productId: number | string): boolean => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      isLoaded
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};