import Image from 'next/image';
import Product from '../types/types';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductItem({ title, image, category, price }: Product) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col w-65 h-96 m-5">
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <img
          src={image}
          alt="Image"
          className="h-32 w-full object-contain"
        />
        <div className="text-sm text-gray-500 flex items-center justify-between space-x-2 mt-2">
          <span className="bg-gray-200 px-2 py-1 rounded">{category}</span>
          <span className="text-lg font-bold text-right">${price}</span>
        </div>
      </div>
    </div>
  );
}
