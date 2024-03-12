import { CartState, CartAction } from './types';

const initialState: CartState = {
  cart: [],
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        cart: action.payload.map(item => ({ ...item, quantity: 1 })),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;