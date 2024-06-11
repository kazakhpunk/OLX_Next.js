"use client";

import { useQuery } from 'react-query';
import axios from 'axios';
import ProductItem from './ProductItem';
import ProductType from '../types/types';

const fetchProducts = async (): Promise<ProductType[]> => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
};

const ProductsList = () => {
  const { data, isLoading, error } = useQuery<ProductType[], Error>('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="grid grid-cols-4 gap-4">
      {data?.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </main>
  );
};

export default ProductsList;
