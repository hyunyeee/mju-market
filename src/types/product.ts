export interface Product {
  id: number;
  title: string;
  price: number;
  visitedCount: number;
  createDate: string;
  productStatus: string;
}

export interface ProductDetail {
  title: string;
  content: string;
  price: number;
  visitedCount: number;
  createDate: string;
  ownerNickname: string;
}
