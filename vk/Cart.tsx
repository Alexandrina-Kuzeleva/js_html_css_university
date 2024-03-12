import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateQuantity, removeFromCart } from './actions';
import { CartState, Product } from './types';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: CartState) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity >= 1 && quantity <= 10) {
      dispatch(updateQuantity(productId, quantity));
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const total = cart.reduce((sum: number, item: Product) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: '1' }}>
        {cart.map((item: Product) => (
          <div key={item.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity === 10}>+</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: '1', border: '1px solid #ccc', padding: '10px' }}>
        <h2>Итого: {total.toFixed(2)} руб.</h2>
      </div>
    </div>
  );
};

export default Cart;