import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetDivision = () => {
  const [divisiondata, setDivisiondata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    const data = [...division];    
    async function fetchDivision() {      
      await axios
        .get(`https://bdapi.vercel.app/api/v.1/division`)
        .then((res) => {
          setDivisiondata([...res.data?.data]);
        })
        .catch((err) => {
          console.log("error division", err);
        });
    }
    fetchDivision();
    
    setIsLoading(true);
  }, []);

  return { data: divisiondata, isLoading };
};

export default useGetDivision;

export const division = [
  {
    id: "1",
    name: "Chattagram",
    bn_name: "চট্টগ্রাম",
    url: "www.chittagongdiv.gov.bd",
  },
  {
    id: "2",
    name: "Rajshahi",
    bn_name: "রাজশাহী",
    url: "www.rajshahidiv.gov.bd",
  },
  { id: "3", name: "Khulna", bn_name: "খুলনা", url: "www.khulnadiv.gov.bd" },
  { id: "4", name: "Barisal", bn_name: "বরিশাল", url: "www.barisaldiv.gov.bd" },
  { id: "5", name: "Sylhet", bn_name: "সিলেট", url: "www.sylhetdiv.gov.bd" },
  { id: "6", name: "Dhaka", bn_name: "ঢাকা", url: "www.dhakadiv.gov.bd" },
  { id: "7", name: "Rangpur", bn_name: "রংপুর", url: "www.rangpurdiv.gov.bd" },
  {
    id: "8",
    name: "Mymensingh",
    bn_name: "ময়মনসিংহ",
    url: "www.mymensinghdiv.gov.bd",
  },
];
