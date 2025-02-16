import { cn } from "@/lib/utils";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, className }) => {

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star, key) => (
        <span
          key={key}
          className={cn("text-amber-500 text-sm", className)}
        >
          {star <= value ? (
            <FaStar />
          ) : star - 0.5 <= value ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;