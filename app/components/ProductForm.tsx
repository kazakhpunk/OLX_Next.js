'use client';

import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Link from 'next/link';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

const getProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(response);

  return response.data.location;
};

const createProduct = async (data: any) => {
  const response = await instance.post('/products', data);
  console.log(response.data);
  return response.data;
};

// ProductForm component
const ProductForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation(uploadImage);

  const createProductMutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleImageUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const uploadedImageUrls = await Promise.all(
      files.map(async file => {
        const imageUrl = await uploadMutation.mutateAsync(file);
        return imageUrl;
      })
    );

    setImageUrls(uploadedImageUrls);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageUrls.length > 0) {
      const productData = {
        title,
        description,
        price,
        category,
        images: imageUrls,
      };

      createProductMutation.mutate(productData);
    } else {
      console.log('No images uploaded');
    }

    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImageUrls([]);
  };

  return (
    <div>
        <div className='flex justify-end mt-10 mr-10'>
            <Link href="/" className="text-blue-500 hover:underline text-end">Home Screen
            </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-4 h-screen">
        <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
            multiple
            />
            <button
            onClick={handleImageUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Upload Images
            </button>
            {imageUrls.length > 0 && (
            <div>
                <p>Uploaded Images:</p>
                <ul>
                {imageUrls.map((imageUrl, index) => (
                    <li key={index}>{imageUrl}</li>
                ))}
                </ul>
            </div>
            )}
        </div>
        <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Submit
        </button>
        </form>
    </div>
  );
};

export default ProductForm;