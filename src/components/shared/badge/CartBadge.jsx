const CartBadge = ({ count, show }) => {
    if (!show || count <= 0) return null;
  
    return (
      <span
        className={`absolute md:-top-2 top-1 right-[26%] sm:right-[28%] md:-right-2  text-white text-center h-4 font-medium bg-red-500 rounded-full px-1 text-xs ${
          count >= 10 ? "w-5" : "w-4"
        }`}
      >
        {count}
      </span>
    );
  };
  
  export default CartBadge;