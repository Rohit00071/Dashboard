import React from "react";

export default function Card({ coinName, amount, currentPrice, totalValue }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>{coinName}</h3>
      <p>Amount: {amount}</p>
      <p>Current Price: ${currentPrice}</p>
      <p>Total Value: ${totalValue.toFixed(2)}</p>
    </div>
  );
}
