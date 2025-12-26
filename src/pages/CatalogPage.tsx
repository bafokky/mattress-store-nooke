import Breadcrumbs from "../components/Breadcrumbs";
import CatalogContainer from "../components/catalog/CatalogContainer";
import { useEffect } from "react";

export interface CatalogPageProps {
  mattressType?: string;               
  resetFilters: boolean;
  onResetFilters: (value: boolean) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({
  mattressType,
  resetFilters,
  onResetFilters
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPageTitle = () => {
    switch (mattressType) {
      case "Пружинные":
        return "Пружинные матрасы";
      case "Беспружинные":
        return "Беспружинные матрасы";
      default:
        return "Каталог матрасов";
    }
  };

  return (
    <>
      <Breadcrumbs title={getPageTitle()} />

      <CatalogContainer
        mattressType={mattressType}
        resetFilters={resetFilters}
        onResetFilters={onResetFilters}
      />
    </>
  );
};

export default CatalogPage;
