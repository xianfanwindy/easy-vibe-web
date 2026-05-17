export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: draft | published | archived;
  style?: string;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
