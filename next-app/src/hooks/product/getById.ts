// productApi.js

import axios from 'axios';

import { ProductInterface } from '@/hooks/iterfaces/product.interface';

const BASE_URL = 'http://localhost:8000';

export const getProductById = async (
  productId: string
): Promise<ProductInterface> => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
