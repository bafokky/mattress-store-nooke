import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import Filter from './Filter';
import { Link, useSearchParams } from 'react-router-dom';
import data from '../../data/data.json';
import ProductCatalog from './ProductCatalog';
import '../../styles/catalog/catalogContainer.css';
import searchsvg from '../../assets/loupe.png';

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    img: string;
    fabricator: string;
    size: string[];
    material?: string;
    fill?: string;
    orthopedic?: string;
    [key: string]: any;
}

interface ActiveFilters {
    [category: string]: string[];
}

interface CatalogContainerProps {
    resetFilters: boolean;
    onResetFilters: (state: boolean) => void;
    mattressType?: string | null;
}

type SortOrder = 'default' | 'asc' | 'desc';

const CatalogContainer: React.FC<CatalogContainerProps> = ({ 
    resetFilters, 
    onResetFilters, 
    mattressType 
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const itemsPerPage = 30;
    
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
    const [sortOrder, setSortOrder] = useState<SortOrder>('default');
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState<boolean>(false);
    
    const scrollPositionRef = useRef<number>(0);
    const urlType = searchParams.get('type');

    useEffect(() => {
        if (resetFilters) {
            setActiveFilters({});
            setSortOrder('default');
            setIsPriceDropdownOpen(false);
            sessionStorage.removeItem('activeFilters');
            sessionStorage.removeItem('sortOrder');
            onResetFilters(false); 
        }
    }, [resetFilters, onResetFilters]);


    useEffect(() => {
        const isPageReloaded = sessionStorage.getItem('pageReloaded');

        if (!isPageReloaded) {
            const savedFilters = sessionStorage.getItem('activeFilters');
            const savedSortOrder = sessionStorage.getItem('sortOrder');
            if (savedFilters) {
                try {
                    setActiveFilters(JSON.parse(savedFilters)); 
                } catch (e) {
                    console.error("Error parsing filters", e);
                }
            }
            if (savedSortOrder) {
                setSortOrder(savedSortOrder as SortOrder);
            }
        } else {
            setActiveFilters({});
            setSearchQuery(''); 
            setSortOrder('default');
            sessionStorage.removeItem('searchQuery'); 
            sessionStorage.removeItem('sortOrder');
        }

        sessionStorage.setItem('pageReloaded', 'true');

        return () => {
            sessionStorage.removeItem('pageReloaded');
        };
    }, []);
    
 //загрузка данных
    useEffect(() => {
        const typedData = data as unknown as Product[];
        setProducts(typedData);
        setFilteredProducts(typedData);
    }, []);

    useEffect(() => {
        const storedSearchQuery = sessionStorage.getItem('searchQuery');
        const storedSortOrder = sessionStorage.getItem('sortOrder');
        if (storedSearchQuery) setSearchQuery(storedSearchQuery);
        if (storedSortOrder) setSortOrder(storedSortOrder as SortOrder);
    }, []);
    
    useEffect(() => {
        if (searchQuery) sessionStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        sessionStorage.setItem('sortOrder', sortOrder);
    }, [sortOrder]);

    //функция для сортировки
    const sortProducts = (productsToSort: Product[]): Product[] => {
        const sorted = [...productsToSort];
        if (sortOrder === 'asc') {
            return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        }
        if (sortOrder === 'desc') {
            return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        }
        return sorted;
    };

    //логика фильтрации
    useEffect(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesFilters = Object.entries(activeFilters).every(([category, values]) => {
                if (!values || !values.length) return true;
                switch (category) {
                    case "Производитель":
                        return values.includes(product.fabricator);
                    case "Размер":
                        return product.size.some(size => values.includes(size));
                    case "Тип матраса":
                        return values.includes(product.type);
                    default:
                        return true;
                }
            });

            const typeToMatch = mattressType || urlType;
            const matchesType = !typeToMatch || product.type === typeToMatch;

            return matchesSearch && matchesFilters && matchesType;
        });

        filtered = sortProducts(filtered);
        setFilteredProducts(filtered);

        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchQuery, activeFilters, products, urlType, mattressType, sortOrder]);
   
    useEffect(() => {
        window.scrollTo(0, scrollPositionRef.current || 0);
    }, []);

    const handleLinkClick = (): void => {
        scrollPositionRef.current = window.scrollY;
    };

    const handleFilterChange = (updatedFilters: ActiveFilters): void => {
        setActiveFilters(updatedFilters);
        sessionStorage.setItem('activeFilters', JSON.stringify(updatedFilters)); 
        if (Object.keys(updatedFilters).length === 0) {
            setSearchQuery('');
        }
    };

    const handleSortChange = (order: SortOrder): void => {
        setSortOrder(order);
        setIsPriceDropdownOpen(false);
    };

    const togglePriceDropdown = (): void => {
        setIsPriceDropdownOpen(!isPriceDropdownOpen);
    };

    const closeDropdownOnClickOutside = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (!target.closest('.price-filter-container')) {
            setIsPriceDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdownOnClickOutside);
        return () => {
            document.removeEventListener('click', closeDropdownOnClickOutside);
        };
    }, []);

    //пагинация
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const visiblePageCount = 5; 
    const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const filterCategories = [
        {
            category: "Производитель",
            options: ["Vegas", "Фабрика Сна", "ЭОС", "Белсон"] 
        },
        {
            category: "Тип матраса",
            options: ["Пружинные", "Беспружинные"]
        },
        {
            category: "Размер",
            options: ["100 x 180", "120 x 180", "120 x 200", "140 x 190", "140 x 200", "160 x 190", "160 x 200", "180 x 190", "180 x 200", "200 x 200"]
        }
    ];

    return (
        <div className='catalog-container-main'>
            <div className='filter-section'>
                <div className='search-bar'>
                    <img src={searchsvg} alt="Search" className="icon-image" /> 
                    <input
                        type='text'
                        placeholder='Поиск...'
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className='search-input' 
                    />
                </div>
                <Filter 
                    filters={filterCategories} 
                    onFilterChange={handleFilterChange} 
                    resetFilters={resetFilters} 
                    onResetFilters={onResetFilters} 
                />
                <div className="section-divider"></div>
                
                <div className="price-filter-container">
                    <div className="price-filter-header" onClick={togglePriceDropdown}>
                        <span className="price-filter-label">Сортировка</span>
                        <span className={`price-filter-arrow ${isPriceDropdownOpen ? 'open' : ''}`}></span>
                    </div>
                    
                    {isPriceDropdownOpen && (
                        <div className="price-dropdown">
                            <div className="price-option">
                                <input
                                    type="radio"
                                    id="sort-default"
                                    name="price-sort"
                                    checked={sortOrder === 'default'}
                                    onChange={() => handleSortChange('default')}
                                />
                                <label htmlFor="sort-default">По умолчанию</label>
                            </div>
                            <div className="price-option">
                                <input
                                    type="radio"
                                    id="sort-asc"
                                    name="price-sort"
                                    checked={sortOrder === 'asc'}
                                    onChange={() => handleSortChange('asc')}
                                />
                                <label htmlFor="sort-asc">Сначала дешевые</label>
                            </div>
                            <div className="price-option">
                                <input
                                    type="radio"
                                    id="sort-desc"
                                    name="price-sort"
                                    checked={sortOrder === 'desc'}
                                    onChange={() => handleSortChange('desc')}
                                />
                                <label htmlFor="sort-desc">Сначала дорогие</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className='catalog-container'>
                <div className="product-list">
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <Link 
                                className='a' 
                                key={product.id} 
                                to={`/catalog/${product.id}`}
                                onClick={handleLinkClick}
                            >
                                <ProductCatalog 
                                    product={product} 
                                    onClick={() => {}} 
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="no-products-message">
                            <p>Товары не найдены</p>
                        </div>
                    )}
                </div>
            </div>

            {filteredProducts.length > itemsPerPage && (
                <div className="pagination">
                    {startPage > 1 && (
                        <button onClick={() => handlePageChange(1)}>1</button>
                    )}
                    {startPage > 2 && <span>...</span>}
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                        const pageNumber = startPage + index;
                        return (
                            <button 
                                key={pageNumber} 
                                onClick={() => handlePageChange(pageNumber)} 
                                className={currentPage === pageNumber ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    {endPage < totalPages - 1 && <span>...</span>}
                    {endPage < totalPages && (
                        <button onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CatalogContainer;
