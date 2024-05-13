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
  location: string;
  price: number;
  categoryId?: number;
  visitedCount: number;
  isMyProduct: boolean;
  createDate: string;
  ownerNickname: string;
}

export interface ProductFormValues {
  title: string;
  price: number | string;
  content: string;
  location: string;
  categoryId?: number;
}
