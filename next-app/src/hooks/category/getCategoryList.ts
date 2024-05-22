import axios from 'axios';

import { getConfig } from '../../../config/config';
import { ICategory } from '@/hooks/category/interface/category.interface';

export const getCategoryList = async (): Promise<Array<ICategory>> => {
  try {
    const response = await axios.get(`${getConfig('apiUrl')}/category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
