import React, { useEffect } from 'react';
import SingleProduct from '../components/catalog/SingleProduct';

const ProductPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SingleProduct />
    </>
  );
};

export default ProductPage;
