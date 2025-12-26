import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom"; 
import "../styles/breadcrumbs.css";

interface BreadcrumbsProps {
  title: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ title }) => {
  const location = useLocation();
  const [resetFilters, setResetFilters] = useState<boolean>(false);
  const handleFilterEmpty = (): void => {
    setResetFilters(true);
  };

  const translations: Record<string, string> = {
    catalog: " Каталог",
    products: " Продукты",
    about: " О нас",
    contact: " Контакты",
    "double": " Пружинные",
    "single": " Беспружинные",
  };

  const translate = (segment: string): string => translations[segment] || segment;
//генерация хлебных крошек
  const generateBreadcrumbs = (): React.ReactNode[] => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbs = [
      <span key="home">
        <Link to="/">Главная</Link> /
      </span>,
      ...pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            {!isLast ? (
              <>
                <Link to={to}>{translate(value)}</Link> /
              </>
            ) : (
              <span>{translate(value)}</span>
            )}
          </span>
        );
      }),
    ];

    return breadcrumbs;
  };

  return (
    <div className="transparent-overlay-container">
      <div className="shadow">
        <p className="product-title-text-style">{title}</p>
        <p className="product-info-heading">{generateBreadcrumbs()}</p>
      </div>
    </div>
  );
};

export default Breadcrumbs;