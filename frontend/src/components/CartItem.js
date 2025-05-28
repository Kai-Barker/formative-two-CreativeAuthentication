// components/CartItem.js
import React from 'react';
import './css/CartItem.css'; // Create this CSS file for styling

function CartItem({ item, onRemove }) {
  return (
    <tr className="cart-item">
      <td className="cart-product-info">
        <img src={item.image} alt={item.name} className="product-image" />
        <div className="product-details">
          <span>{item.name}</span>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      </td>
      <td>R{item.price}</td>
      <td>{item.quantity}</td>
      <td>R{item.price * item.quantity}</td>
    </tr>
  );
}

export default CartItem;
