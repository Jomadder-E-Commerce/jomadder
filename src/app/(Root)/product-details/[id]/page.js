"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";

import ProductSlider from "@/components/pages/ProductDetails/ProductSlider";
import ProductDetails from "@/components/pages/ProductDetails/ProductDetails";
import DetailsTab from "@/components/pages/ProductDetails/DetailsTab";
import ShippingDetails from "@/components/pages/ProductDetails/ShippingDetails";
import ShopDetailsBar from "@/components/pages/ProductDetails/shopDetails/ShopDetailsBar";
import { useGetSingleProductQuery } from "@/components/Redux/services/productApi/productApi";
import { usePostCartMutation } from "@/components/Redux/services/cartApi";
import { getLocalStorage } from "@/components/shared/LocalStorage/LocalStorage";
import ProductNotFound from "@/components/pages/ProductDetails/Not-found/ProductNotFound";
import { addNewDataIntoLocalStorage, findDataFromLocalStorage, saveDataIntoLocalStorage } from "@/utils/localstorage";
import useUser from "@/hooks/useUser";
import useCart from "@/hooks/useCart";

const ProductPage = ({ params }) => {
  const { cart, AddIntocart, RemoveFromcart, removeAllcart, UpdateCartQuantity } = useCart()
  const router = useRouter();
  const id = params?.id;
  // const userData = typeof window !== 'undefined' && window.localStorage.getItem('user');
  // const user = JSON.parse(userData);
  const { user, loading } = useUser()

  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  // const [postCart] = usePostCartMutation();
  const [type, setType] = useState("image");
  const [selectedImage, setSelectedImage] = useState("");
  const [productSku, setProductSku] = useState([]);
  const [selectedColorProduct, setSelectedColorProduct] = useState({ image: "", name: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const handleChooseSelectedProduct = (imageUrl, prop) => {
    setSelectedColorProduct({ image: imageUrl, name: prop });
    setSelectedImage(imageUrl);
    setType("image")
  };

  const handleChooseImage = (image) => {
    setSelectedImage(image);
    // setSelectedColorProduct({ type:"image",...selectedColorProduct });

  };

  const handleChooseProductJustText = (prop) => {
    setSelectedColorProduct({ name: prop, image: "" });
  };

  useEffect(() => {
    let price = 0;
    let quantity = 0;

    productSku.forEach(sku => {
      quantity += sku.quantity;
      price += sku.quantity * parseFloat(sku.price);
    });

    setTotalPrice(Math.round(price));
    setTotalQuantity(quantity);
  }, [productSku]);

  const CompleteTheAddtoCart = async () => {
    // const token = getLocalStorage("token");

    // if (!token) {
    //   toast.info("Please login to add product");
    //   return;
    // }

    if (productSku.length === 0) {
      toast.info("Please select product!");
      return;
    }

    try {
      const cartData = {
        id: String(data?.data?.item_id),
        productTitle: data?.data?.title,
        productImage: data?.data?.main_imgs[0],
        skus: [...productSku],
        checked: true
      };
      const find = findDataFromLocalStorage("cart", cartData?.id);
      if (find) {
        toast.error("Already added to cart")
        return;
      };
      //  addNewDataIntoLocalStorage("cart", cartData);
      AddIntocart(cartData);


      toast.success("Added to cart");
      setProductSku([]);

    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      saveDataIntoLocalStorage("redirect", window.location.pathname);
      window.location.href = "/login"
    }
    if (productSku.length === 0) {
      toast.info("Please select product!");
      return;
    }

    const buyNowData = {
      id: String(data?.data?.item_id),
      userId: user._id,
      productTitle: data?.data?.title,
      productImage: data?.data?.main_imgs[0],
      skus: [...productSku],
    };

    localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
    router.push('/buyNow');
  };
  return (
    <div className="container pt-2 pb-4 ">
      {/* Breadcrumb */}
      <nav className="container relative flex items-center gap-1 mb-5 text-sm left-1 no-padding">
        <Link className="text-gray-600 hover:text-primary" href="/"><span className="font-bold ">Home</span></Link>
        <span className="font-bold text-gray-400">{">"}</span>
        <Link className="text-gray-600 hover:text-primary" href={`/product-details/${id}`}><span className="font-bold ">Product Details</span></Link>
      </nav>

      {/* Main Content */}
      {
        !isLoading && !data?.data ? <ProductNotFound />
          :
          <div className="container flex flex-col xl:flex-row xl:gap-6 no-padding">
            {/* Product Info Container */}
            <div className="flex-1 ">
              {/* Product Gallery and Details Container */}
              <div className="overflow-hidden rounded-lg ">
                <div className="flex flex-col md:flex-row">
                  {/* Product Gallery */}
                  <div className="md:w-[40%] ">
                    <ProductSlider
                      productData={data?.data}
                      isError={isError}
                      isLoading={isLoading}
                      handleChooseImage={handleChooseImage}
                      selectedImage={selectedImage}
                      type={type}
                      setType={setType}

                    />
                  </div>

                  {/* Product Details */}
                  <div className="md:w-[60%]  sm:px-4 px-0">
                    <ProductDetails
                      productData={data?.data}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      isError={isError}
                      isLoading={isLoading}
                      selectedColorProduct={selectedColorProduct}
                      handleChooseProductJustText={handleChooseProductJustText}
                      handleChooseSelectedProduct={handleChooseSelectedProduct}
                      productSku={productSku}
                      setProductSku={setProductSku}
                    />
                  </div>
                </div>

                {/* Mobile Shipping Details */}
                <div className="mt-10 border-t border-gray-100 xl:hidden">
                  <ShippingDetails
                    CompleteTheAddtoCart={CompleteTheAddtoCart}
                    handleBuyNow={handleBuyNow}
                    data={data?.data}
                    quantity={totalquantity}
                    price={totalPrice}
                    productSku={productSku}
                    setProductSku={setProductSku}
                  />
                </div>
              </div>

              {/* Product Description Tabs */}
              <div className="mt-6 bg-white rounded-lg shadow-sm">
                <DetailsTab isLoading={isLoading} productData={data?.data} isError={isError} />
              </div>
            </div>

            {/* Right Sidebar - Shipping Details */}
            <div className="flex-shrink-0 hidden xl:block ">
              <div className="sticky rounded-lg shadow-sm top-20">
                <ShippingDetails
                  CompleteTheAddtoCart={CompleteTheAddtoCart}
                  handleBuyNow={handleBuyNow}
                  data={data?.data}
                  quantity={totalquantity}
                  price={totalPrice}
                  productSku={productSku}
                  setProductSku={setProductSku}
                />
              </div>
            </div>
          </div>
      }

    </div>
  );
};

export default ProductPage;

