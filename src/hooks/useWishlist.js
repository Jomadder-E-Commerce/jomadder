import { useState, useEffect } from "react";
import { addNewDataIntoLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage, removeOneDataFromLocalStorage } from "@/utils/localstorage";

// Shared state and listeners across all hook instances
let globalWishlist = [];
const listeners = new Set();

// Update global state and notify listeners
const updateGlobalWishlist = (newWishlist) => {
  globalWishlist = newWishlist;
  listeners.forEach(listener => listener(newWishlist));
};

const getCurrentWishlist = () => {
  return getDataFromLocalStorage("wishlist") || [];
};

const useWishlist = () => {
  const [wishlist, setWishlist] = useState(globalWishlist);

  // Subscribe to global changes and storage events
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedWishlist = getCurrentWishlist();
      updateGlobalWishlist(updatedWishlist);
    };

    // Listen to local state updates
    const listener = (newWishlist) => {
      setWishlist(newWishlist);
    };
    listeners.add(listener);

    // Listen to cross-tab storage changes
    window.addEventListener('storage', handleStorageChange);

    // Initial fetch
    handleStorageChange();

    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Update both localStorage and global state
  const AddIntoWishlist = (item) => {
    addNewDataIntoLocalStorage("wishlist", item);
    updateGlobalWishlist(getCurrentWishlist());
  };

  const RemoveFromWishlist = (id) => {  
    removeOneDataFromLocalStorage("wishlist", id);
    updateGlobalWishlist(getCurrentWishlist());
  };

  const removeAllWishlist = () => {
    removeDataFromLocalStorage("wishlist");
    updateGlobalWishlist([]);
  };

  return { wishlist, AddIntoWishlist, RemoveFromWishlist, removeAllWishlist };
};

export default useWishlist;