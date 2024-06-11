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
  thumbnailUrl: string;
  thumbnailId: number;
}

export interface HistoryProps {
  buyerName: string;
  productDiscountPrice: number;
  productOriginPrice: number;
  productTitle: string;
  sellerName: string;
  tradeHistoryId: number;
  usingCouponIds: string;
  productId: number;
}

export interface ProductDetail {
  id: number;
  title: string;
  content: string;
  location: string;
  price: number;
  productStatus: string;
  categoryId?: number;
  visitedCount: number;
  isMyProduct: boolean;
  createDate: string;
  ownerNickname: string;
  categoryName: string;
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
