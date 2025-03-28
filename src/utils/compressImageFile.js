export const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Resize image (Reduce to 50% of original size)
      canvas.width = img.width / 2;
      canvas.height = img.height / 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to Blob (JPEG format, 70% quality)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" })); // Convert Blob to File
          } else {
            reject(new Error("Compression failed"));
          }
        },
        "image/jpeg",
        0.7
      );
    };

    img.onerror = () => reject(new Error("Image load error"));
  });
};
