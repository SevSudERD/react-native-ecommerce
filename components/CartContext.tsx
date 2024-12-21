import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface CartContextProps {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Course[]>([]);

  const addToCart = (course: Course) => {
    setCart((prevCart) => [...prevCart, course]);
  };

  const removeFromCart = (courseId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== courseId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
