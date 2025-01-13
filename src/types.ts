export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  price_id: string;
  image: string;
  category: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}