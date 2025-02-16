// import ColorSelect from '@/components/shared/colorSelect/ColorSelect';
import ColorSelect from "@/components/shared/colorSelect/ColorSelect";
import ProductColor from "./ProductColor";
import ProductSize from './ProductSize';

// const ProductKeyFeatures = ({ colors, size, productDetails, count }) => {
  const ProductKeyFeatures = ({productData, count}) => {
  return (
    <div className="">
      {/* colors & size*/}
      {/* {colors.length > 0 || size.length > 0 ? ( */}
        <div className="flex flex-col gap-2">
          {/* <ProductColor options={colors} count={count} /> */}
          {/* <ProductColor/> */}
          {/* <ColorSelect colors={colors} count={count} /> */}
          <ColorSelect count={count}/>
          {/* <ProductSize options={size} count={count} /> */}
          <ProductSize count={count}/>
        </div>
      {/* ) : null} */}

      {/* key features */}
      <div className="mt-4 mb-2 text-sm">
        {/* {productDetails && ( */}
          <h1 className="mb-2 text-sm font-semibold uppercase text-primary">
            Product Details
          </h1>
        {/* )} */}
        <ol className="my-1 list-disc list-inside ">
          {productData?.service_tags.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ProductKeyFeatures;
