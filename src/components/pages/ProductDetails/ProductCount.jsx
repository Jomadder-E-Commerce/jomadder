import { cn } from "@/lib/utils";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

const ProductCount = ({ count, setCount, stock, className }) => {
  const handleIncrement = () => {
    if (stock > count) {
      setCount((prevCount) => prevCount + 1);
    }
  };
  const handleDecrement = () => {
    if (count === 1) {
      setCount(0);
    }else if(count == 0){
     setCount(0);
    }
    
    else {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between w-1/3 gap-3 bg-white border-4 border-sky-600 rounded-full lg:w-[150px]",
        className
      )}
    >
      <button
        type="button"
        className="bg-sky-600 rounded-full text-white h-9 w-9 flex justify-center items-center"
        onClick={handleDecrement}
      >
        <HiOutlineMinusSm className="text-2xl font-bold" />
      </button>

      <span className="text-md text-muted-foreground font-bold text-center ">
        {count}
      </span>

      <button
        type="button"
        className="bg-sky-600 rounded-full text-white h-9 w-9 flex justify-center items-center"
        onClick={handleIncrement}
      >
        <HiOutlinePlusSm className="text-2xl font-bold" />
      </button>
    </div>
  );
};

export default ProductCount;
