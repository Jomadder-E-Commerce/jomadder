'use client';


const TestRating = ({ totalStars = 5, rating, setRating }) => {
  // Update rating when a star is clicked
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const value = index + 1;

        return (
          <svg
            key={value}
            onClick={() => handleClick(value)}
            xmlns="http://www.w3.org/2000/svg"
            fill={value <= rating ? 'currentColor' : 'transparent'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 mb-2 h-6 cursor-pointer transition-colors ${
              value <= rating ? 'text-[#f59e0b]' : 'text-gray-400'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default TestRating;
