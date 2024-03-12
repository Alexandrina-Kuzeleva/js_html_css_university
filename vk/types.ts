export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
  }
  
  export interface CartState {
    cart: Product[];
  }
  
  export interface CartAction {
    type: string;
    payload: any;
  }