import React, { useEffect, useState } from 'react';
import '../../styles/catalog/filter.css';

//категория фильтра и список опций
interface FilterOption {
    category: string;
    options: string[];
}

//массив выбранных фильтров
interface SelectedFilters {
    [category: string]: string[];
}

interface FilterProps {
    filters: FilterOption[];
    onFilterChange: (filters: SelectedFilters) => void;
    resetFilters: boolean;
    onResetFilters: (state: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ 
    filters, 
    onFilterChange, 
    resetFilters, 
    onResetFilters 
}) => {
    //состояние выбранных фильтров 
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    //состояние открытой категории
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    //сброс фильтров
    useEffect(() => {
        if (resetFilters) {
            setSelectedFilters({});
            sessionStorage.removeItem('selectedFilters');
            onFilterChange({});
            onResetFilters(false);
        }
    }, [resetFilters, onResetFilters, onFilterChange]);

    //восстановление фильтров
    useEffect(() => {
        const isPageReloaded = sessionStorage.getItem('pageReloaded');

        if (!isPageReloaded) {
            const savedFilters = sessionStorage.getItem('selectedFilters');
            if (savedFilters) {
                try {
                    setSelectedFilters(JSON.parse(savedFilters));
                } catch (e) {
                    console.error("Ошибка парсинга фильтров из sessionStorage", e);
                }
            }
        } else {
            setSelectedFilters({});
            sessionStorage.removeItem('selectedFilters');
        }

        sessionStorage.setItem('pageReloaded', 'true');

        return () => {
            sessionStorage.removeItem('pageReloaded');
        };
    }, []);

    const handleCheckboxChange = (category: string, value: string) => {
        const currentCategoryFilters = selectedFilters[category] || [];
        
        const updatedCategoryFilters = currentCategoryFilters.includes(value)
            ? currentCategoryFilters.filter(item => item !== value) 
            : [...currentCategoryFilters, value];

        const updatedFilters = {
            ...selectedFilters,
            [category]: updatedCategoryFilters
        };

        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);

        sessionStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));
    };

    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    const getFilterCount = (category: string): number => {
        return selectedFilters[category]?.length || 0;
    };

    return (
        <div className="filter-container">
            {filters.map(({ category, options }) => (
                <div
                    className={`filter-group ${openCategory === category ? 'open' : ''}`}
                    key={category}>
                    <div
                        className="filter-summary"
                        onClick={() => toggleCategory(category)}>
                        <div className='category-counter'>
                            <p className="filter-counter">
                                {getFilterCount(category) > 0 ? getFilterCount(category) : ''}
                            </p>
                            {category}
                        </div>
                        <p className={`filter-arrow ${openCategory === category ? 'open' : ''}`}></p>
                    </div>
                    <div className="hiden-menu">
                        <ul>
                            {options.map(option => (
                                <li key={option}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={selectedFilters[category]?.includes(option) || false}
                                            onChange={() => handleCheckboxChange(category, option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Filter;