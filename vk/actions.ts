import { Product } from './types';

export const fetchProducts = () => async (dispatch: any) => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data: Product[] = await response.json();
  dispatch({ type: 'FETCH_PRODUCTS', payload: data });
};

export const updateQuantity = (productId: number, quantity: number) => ({
  type: 'UPDATE_QUANTITY',
  payload: { productId, quantity },
});

export const removeFromCart = (productId: number) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const fetchProducts = () => async (dispatch: any) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    
  }
};