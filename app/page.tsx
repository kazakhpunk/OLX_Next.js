// app/page.tsx
"use client";

import QueryProvider from './components/Query';
import ProductsList from './components/ProductList';
import Link from 'next/link';

export default function Home() {
  return (
    <QueryProvider>
      <header className="flex justify-between items-center mt-6 mb-2">
        <h1 className="text-2xl font-bold ml-6">Product List</h1>
        <Link href='/post'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-5">
            Add Product
          </button>
        </Link>
      </header>
      <ProductsList />
    </QueryProvider>
  );
}
