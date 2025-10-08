export interface ICategory {
  image: string;
  name: string;
}

interface IProduct {
  name: string;
  stock: number;
  price: number;
  image: [string];
  description: string;
}
