export interface IProduct {
  uid: string;
  title: string;
  description: string;
  cost: number;
  subDescription: string;
  images: Array<{ url: string; filename: string; uid: string }>;
}
