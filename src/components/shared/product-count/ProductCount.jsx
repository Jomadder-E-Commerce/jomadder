'use client';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const ProductCount = ({ count, setCount, stock = 10, className }) => {
  const handleIncrement = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-2/4 gap-10 p-2 bg-white border border-r rounded lg:w-[150px] text-muted-foreground ${className}`}
    >
      <button type="button" onClick={handleDecrement}>
        <HiOutlineMinusSm className="cursor-pointer" />
      </button>
      <span className="text-sm">{count}</span>
      <button type="button" onClick={handleIncrement}>
        <HiOutlinePlusSm className="cursor-pointer" />
      </button>
    </div>
  );
};

export default ProductCount;
