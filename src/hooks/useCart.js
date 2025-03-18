import { useState, useEffect } from "react";
import {
  addNewDataIntoLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  removeOneDataFromLocalStorage,
  updateLocalStorageCartQuantity
} from "@/utils/localstorage";

// Initialize globalcart with data from localStorage on module load
let globalcart = getDataFromLocalStorage("cart") || [];
const listeners = new Set();

const updateGlobalcart = (newcart) => {
  const safeCart = Array.isArray(newcart) ? newcart : [];
  globalcart = [...safeCart];  // Now safe to spread
  listeners.forEach(listener => listener(globalcart));
};

const getCurrentcart = () => {
  return getDataFromLocalStorage("cart");
};

const useCart = () => {
  const [cart, setCart] = useState(globalcart);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedcart = getCurrentcart();
      if (JSON.stringify(updatedcart) !== JSON.stringify(globalcart)) {
        updateGlobalcart(updatedcart);
      }
    };

    const listener = (newcart) => {
      setCart([...newcart]);
    };

    listeners.add(listener);
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial sync

    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Always update the global cart state
  const updateCartState = () => {
    const updatedCart = getCurrentcart();
    updateGlobalcart(updatedCart);
  };

  const AddIntocart = (item) => {
    addNewDataIntoLocalStorage("cart", item);
    updateCartState();
  };

  const RemoveFromcart = (id) => {  
    removeOneDataFromLocalStorage("cart", id);
    updateCartState();
  };

  const removeAllcart = () => {
    removeDataFromLocalStorage("cart");
    updateGlobalcart([]);
  };

  const UpdateCartQuantity = (id, sku, quantity) => {
    updateLocalStorageCartQuantity("cart", id, sku, quantity);
    updateCartState();
  };

  return { cart, AddIntocart, RemoveFromcart, removeAllcart, UpdateCartQuantity };
};

export default useCart;