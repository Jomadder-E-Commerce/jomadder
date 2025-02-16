import FadeUp from "@/components/shared/animation/FadeUp";
import ChooseCard from "@/components/shared/cards/ChooseCard";
import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";
import { whychooseData } from "@/data/whychoose";
import React from "react";

const WhyChoose = () => {
  return (
    <div className="flex flex-col gap-6 my-12 lg:my-20 container">
      <div className="flex flex-col w-full gap-2">
        <h3 className="mb-2 text-xl font-semibold text-center md:text-2xl">
          <SectionHeader text="Why Choose Us" />
        </h3>
        <p className="max-w-[700px] mx-auto text-sm text-center">
          We&apos;re here to make dropshipping easy. With reliable suppliers,
          quick shipping, and 24/7 support, we’re all about helping your
          business grow smoothly. Let us handle the details while you focus on
          success!
        </p>
      </div>
      <FadeUp>
        <div className="grid grid-cols-1 md:mt-10 lg:grid-cols-3 md:grid-cols-2 gap-3 ">
          {whychooseData.map((data, key) => (
            <ChooseCard data={data} key={key} />
          ))}
        </div>
      </FadeUp>
    </div>
  );
};

export default WhyChoose;
