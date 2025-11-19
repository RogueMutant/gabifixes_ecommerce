export interface ICategory {
  image: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
  image: string[];
  description: string;
  ingredients: string;
  howToUse: string;
  reviews: IReview[];
}

export interface IReview {
  image: string;
  name: string;
  review: string;
  rating: number;
  created_at: string;
}

export enum InfoEnum {
  description = "description",
  howToUse = "howToUse",
  ingredients = "ingredients",
}

export interface CartItem {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  image: string;
}
