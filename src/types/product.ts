export interface Product {
  id: number;
  location: string;
  title: string;
  price: number;
  visitedCount: number;
  productStatus: string;
  ownerName: string;
  productLikesCount: number;
  isAlreadyLikedByMe: boolean;
  createDate: string;
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
  ownerId: number;
  likedCount: number;
  isLikedAlreadyByMe: boolean;
}

export interface ProductFormValues {
  title: string;
  price: number | string;
  content: string;
  location: string;
  categoryId?: number;
  images: File[];
}

export interface Images {
  id: number;
  url: string;
}

export interface ImagesArr {
  original: string;
  thumbnail: string;
  originalClass: string;
  thumbnailClass: string;
}
