import { useState, useEffect, useRef } from "react";
import { usePostCartMutation } from "@/components/Redux/services/cartApi";
import ProductDetailsSkeleton from "@/components/all-skeleton/ProductSkeleton/ProductDetailsSkeleton";
import ProductDetailsTable from "./ProductDetailsTable";
import ProductColor from "./ProductColor";

const ProductDetails = ({
  productData,
  isError,
  selectedColorProduct,
  isLoading,
  handleChooseProductJustText,
  handleChooseSelectedProduct,
  productSku,
  setProductSku,
}) => {

  const {
    item_id = "",
    title = "",
    main_imgs = [],
    price_info = {},
    sku_props = [],
  } = productData || {};

  const skuDataImage = sku_props[0]?.values;
  const [pricingSku, setPricingSku] = useState([]);
  // const [productSku, setProductSku] = useState([]);
  const [adding, setAdding] = useState(false);
  const [postCart] = usePostCartMutation();




  useEffect(() => {
    const pricingSkuTest = [];
    if (
      sku_props?.length > 0 &&
      productData?.skus?.length > 0 &&
      skuDataImage?.length > 0
    ) {
      productData?.skus?.forEach((item) => {
        if (item?.props_names?.includes(selectedColorProduct?.name)) {
          pricingSkuTest.push(item);
        }
      });
    } else {
      productData?.skus?.forEach((item) => {
        pricingSkuTest.push(item);
      });
    }
    setPricingSku([...pricingSkuTest]);
  }, [productData?.skus, selectedColorProduct?.name, skuDataImage?.length, sku_props]);

  //  To make sure by default one image is selected
  useEffect(() => {

    if (sku_props?.length == 0) {
      handleChooseSelectedProduct(main_imgs[0], "All");
    } else if (skuDataImage?.length > 0) {
      if (skuDataImage[0]?.name) {
        handleChooseProductJustText(skuDataImage[0]?.name);
      }
      if (skuDataImage[0]?.name && skuDataImage[0]?.imageUrl) {
        handleChooseSelectedProduct(
          skuDataImage[0]?.imageUrl,
          skuDataImage[0]?.name
        );
      }
    }
  }, [sku_props]);

  // skeleton
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-lg font-semibold text-red-500">
          Error loading product details.
        </p>
      </div>
    );
  }

  const AddToCart = (payload) => {
    let itemFound = false;

    if (payload.quantity == 1) {
      const update = productSku?.map((single) => {
        if (single?.size == payload?.size && single?.color == payload?.color) {
          itemFound = true;
          return {
            ...single,
            quantity: single?.quantity + 1,
          };
        }
        return single;
      });
      if (!itemFound) {
        update?.push({ ...payload, quantity: payload?.quantity || 1 });
      }
      setProductSku([...update]);
    } else if (payload?.quantity == -1) {
      const updateSku = productSku
        ?.map((single) => {
          if (
            single?.size == payload?.size &&
            single?.color == payload?.color
          ) {
            return {
              ...single,
              quantity: single?.quantity - 1,
            };
          } else {
            return single;
          }
        })
        .filter((single) => single?.quantity > 0);

      setProductSku([...updateSku]);
    }
  };


  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-0 ">
        <h1 className=" 2xl:text-xl  md:text-lg font-semibold pb-3">

          {title}
        </h1>
        <ProductColor
          adding={adding}
          setAdding={setAdding}
          productSku={productSku}
          setProductSku={setProductSku}
          data={sku_props[0]?.prop_name}
          handleChooseProductJustText={handleChooseProductJustText}
          handleChooseSelectedProduct={handleChooseSelectedProduct}
          selected={selectedColorProduct}
          skuDataImage={skuDataImage}
        />
        <ProductDetailsTable
          adding={adding}
          setAdding={setAdding}
          productSku={productSku}
          currentSku={selectedColorProduct}
          addToCart={AddToCart}
          pricingSku={pricingSku}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
