"use client";

import ProductForm from '../components/ProductForm';
import QueryProvider from '../components/Query';

export default function Home() {
  return (
    <QueryProvider>
        <ProductForm />
    </QueryProvider>
  );
}