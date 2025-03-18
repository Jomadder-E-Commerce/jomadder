import { pricing } from "@/data/pricing";

export const getPricingData = async (price) => {
  let percentage = 0;

  // Ensure correct price matching
  const find = pricing?.forEach((element, index) => {
      if (price >= element?.limit && (!pricing[index + 1] || price < pricing[index + 1]?.limit)) {
          percentage = element?.percentage;
      }
  });

  console.log(((percentage / 100) + 1) * price);

  return ((percentage / 100) + 1) * price;
};

export function getPercentageForPrice(price) {
  // Sort categories by limit in ascending order
  const sortedCategories = [...pricing]?.sort((a, b) => a.limit - b.limit);
  // Iterate through the sorted categories
  for (let i = 0; i < sortedCategories.length; i++) {
    const currentCategory = sortedCategories[i];
    const nextCategory = sortedCategories[i + 1]; // Undefined for the last category

    // Check if the price falls in the current range
    if (Number(price) >= currentCategory.limit && (!nextCategory || Number(price) < nextCategory.limit)) {
      return (((currentCategory.percentage / 100) + 1) * Number(price)) * 17;
    }
  }

  // If no category matches, return null or an error
  return null;
}


export function GetfullPricing(price){
   return price * 17 * 1.2
}
