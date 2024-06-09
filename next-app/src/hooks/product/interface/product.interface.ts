import { ICategory } from '@/hooks/category/interface/category.interface';

export interface IProduct {
  uid: string;
  title: string;
  description: string;
  count?: number;
  cost: number;
  subDescription: string;
  images: Array<IProductImg>;
  categories: Array<ICategory>;
}

export interface IProductImg {
  url: string;
  filename: string;
  uid: string;
}
