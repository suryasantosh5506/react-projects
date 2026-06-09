import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const handleAdd = (prod, quantity) => {
    setCart(() => {
      return [...cart, { ...prod, quantity }];
    });
  };

  const handleRemove = (id) => {
    setCart(() => {
      return cart.filter((p) => p.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        cart,
        setCart,
        handleAdd,
        handleRemove,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
