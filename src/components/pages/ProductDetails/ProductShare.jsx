import { FaWhatsapp } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";
import { BsPrinter } from "react-icons/bs";

const ProductShare = () => {
  return (
    <div>
      <div className="flex justify-start items-center gap-3 text-primary">
        <span className="text-sm font-semibold text-black">Share:</span>
        <FaWhatsapp/>
        <CiFacebook/>
        <MdOutlineMailOutline/>
        <RiTwitterXLine/>
        <BsPrinter/>
      </div>
    </div>
  );
};

export default ProductShare;
