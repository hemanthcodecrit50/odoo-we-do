export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  seller: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}
