import BannerLayout from "../banner/BannerLayout";
import Categories from "./components/Categories";
import Products from "./Products";
import WhyChoose from "./WhyChoose";
import Stats from "./Stats";
import SpeedDial from "./SpeedDial";
import CostOption from "./CostOption";

const HomePage = () => {
  return (
    <>
      <div className="container  no-padding">
        <BannerLayout />
      </div>
      <CostOption/>
      <div className="container no-padding">
      <Categories />
        {/* <PopularNew button={"View All Products"} /> */}
   
      </div>
      <div className="container no-padding">
      <Products />   
      </div>
      <Stats />
      <div className="container no-padding">
        <WhyChoose />
      </div>
      {/* <div className="fixed md:bottom-4 bottom-12 md:right-12 right-9 z-50">
        <SpeedDial className=''/>
      </div> */}
    </>
  );
};

export default HomePage;
