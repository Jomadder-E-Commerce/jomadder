import SearchImageProduct from "@/components/pages/SearchImageProduct/SearchImageProduct";
import Footer from "@/components/shared/footer/Footer";
import MiddleBar from "@/components/shared/middlebar/MiddleBar";
import Navbar from "@/components/shared/Navbar";
import TopBar from "@/components/shared/TopBar";

const searchImage = ({ params }) => {
  const image = decodeURIComponent(params?.image);
  console.log("params",decodeURIComponent(params?.image))
  return (
    <div>
      {/* <TopBar />
      <MiddleBar /> */}
      <SearchImageProduct image={image} />
      {/* <Footer /> */}
    </div>
  );
};

export default searchImage;
