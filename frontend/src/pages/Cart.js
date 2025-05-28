// pages/Cart.js
import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import OutlineButton from '../components/OutlineButton';
import './css/Cart.css';
import DummyImg from '../assets/images/Asset_58x.png'

const dummyCartData = [
  {
    id: 1,
    name: 'Baddie gun',
    price: 150,
    quantity: 2,
    image: {DummyImg},
  },
  {
    id: 2,
    name: 'Vanishing Spray',
    price: 200,
    quantity: 1,
    image:{DummyImg},
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(dummyCartData);
  const [coupon, setCoupon] = useState('');

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon === 'DISCOUNT10' ? 0.1 * subtotal : 0;
  const grandTotal = subtotal - discount;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} onRemove={handleRemove} />
            ))
          ) : (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Your cart is empty.</td></tr>
          )}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="summary-box">
          <h3>Summary</h3>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <label htmlFor="coupon">Coupon:</label>
            <input 
              type="text" 
              id="coupon" 
              placeholder="Enter coupon" 
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
          <div className="summary-line total">
            <span>Grand Total:</span>
            <span>R{grandTotal.toFixed(2)}</span>
          </div>

         <button>BUY</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
