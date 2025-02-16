// lib/fetchImage.js
import { getPlaiceholder } from 'plaiceholder';

export const PlaceholderImage = async (imageUrl) => {
  try {
    // Generate blurDataURL using plaiceholder
    const { base64 } = await getPlaiceholder(imageUrl);

    // Return the original image URL and the blurDataURL
    return {
      src: imageUrl,
      blurDataURL: base64,
    };
  } catch (error) {
    console.error('Error fetching image with placeholder:', error);
    return {
      src: imageUrl,
      blurDataURL: '', // Fallback to no blur if error occurs
    };
  }
};
