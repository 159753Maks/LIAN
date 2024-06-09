import { OrderStatusEnum } from "./order-status-enum";

export interface IOrder {
  uid: string;
  userUid: string;
  status: OrderStatusEnum;
  createdAt: string;
  updatedAt: string;
  products: { productUid: string; count: number }[];
}
