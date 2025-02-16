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
import { addNewDataIntoLocalStorage, findDataFromLocalStorage } from "@/utils/localstorage";

const ProductPage = ({ params }) => {
  const router = useRouter();
  const id = params?.id;
  const userData = typeof window !== 'undefined' && window.localStorage.getItem('user');
  const user = JSON.parse(userData);
  
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [postCart] = usePostCartMutation();
  const [type,setType] = useState("image");
  const [selectedImage, setSelectedImage] = useState("");
  const [productSku, setProductSku] = useState([]);
  const [selectedColorProduct, setSelectedColorProduct] = useState({image: "", name: ""});
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
    setSelectedColorProduct({ name: prop, image: ""});
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
        checked:true
      };
      const find = findDataFromLocalStorage("cart",cartData?.id);
       if(find){
        toast.error("Already added to cart")
        return;
       };
         addNewDataIntoLocalStorage("cart", cartData);
           

        toast.success("Added to cart");
        setProductSku([]);

    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const handleBuyNow = () => {
    if (productSku.length === 0) {
      toast.info("Please select product!");
      return;
    }

    const buyNowData = {
      productId: String(data?.data?.item_id),
      userId: user._id,
      productTitle: data?.data?.title,
      productImage: data?.data?.main_imgs[0],
      skus: [...productSku],
    };

    localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
    router.push('/buyNow');
  };
  return (
      <div className=" pb-4 pt-2 container">
        {/* Breadcrumb */}
        <nav className="flex items-center  mb-5 text-sm  gap-1 relative left-1 container no-padding">
          <Link className="hover:text-primary text-gray-600" href="/"><span className=" font-bold">Home</span></Link>
          <span className="text-gray-400 font-bold">{">"}</span>
         <Link className="hover:text-primary text-gray-600" href={`/product-details/${id}`}><span className=" font-bold">Product Details</span></Link> 
        </nav>

        {/* Main Content */}
        {
          !isLoading && !data?.data ? <ProductNotFound/> 
          :
          <div className="flex flex-col xl:flex-row xl:gap-6  container no-padding">
          {/* Product Info Container */}
          <div className="flex-1 ">
            {/* Product Gallery and Details Container */}
            <div className=" rounded-lg  overflow-hidden">
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
              <div className="xl:hidden mt-10 border-t border-gray-100">
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
            <div className="bg-white rounded-lg shadow-sm mt-6">
              <DetailsTab isLoading={isLoading} productData={data?.data} isError={isError} />
            </div>
          </div>

          {/* Right Sidebar - Shipping Details */}
          <div className="hidden xl:block   flex-shrink-0 ">
            <div className="sticky top-20  rounded-lg shadow-sm">
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

