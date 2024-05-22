// productApi.js

import axios from 'axios';
import { IProduct } from '@/hooks/product/interface/product.interface';
import { getConfig } from '../../../config/config';

export const getProductById = async (productId: string): Promise<IProduct> => {
  try {
    const response = await axios.get(
      `${getConfig('apiUrl')}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
