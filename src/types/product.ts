export interface Product {
  id: number;
  title: string;
  price: number;
  visitedCount: number;
  createDate: string;
  productStatus: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  content: string;
  price: number;
  visitedCount: number;
  createDate: string;
  ownerNickname: string;
}

export interface ProductFormValues {
  title: string;
  price: number | string;
  content: string;
  categoryId?: number;
}
