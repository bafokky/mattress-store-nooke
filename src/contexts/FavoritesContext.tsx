import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

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

  //получение ключа текущего пользователя
  const getStorageKey = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.username ? `favorites_${user.username}` : 'favorites_guest';
  }, []);

  //загрузка даных
  const loadFavorites = useCallback(() => {
    setIsLoaded(false);
    const key = getStorageKey();
    const savedFavorites = localStorage.getItem(key);
    
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Ошибка парсинга избранного:", error);
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
    setIsLoaded(true);
  }, [getStorageKey]);

  //инициализация и подписка на смену пользователя
  useEffect(() => {
    loadFavorites();

    const handleAuthChange = () => {
      loadFavorites();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [loadFavorites]);

  //созранение избранного при изменении
  useEffect(() => {
    if (isLoaded) {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded, getStorageKey]);

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