import React from "react";
import check from "@/assets/Stats/check.png";
import calender from "@/assets/Stats/calendar.png";
import cart from "@/assets/Stats/carts.png";
import StatsCard from "@/components/shared/cards/StatsCard";
import FadeUp from "@/components/shared/animation/FadeUp";
const Stats = () => {
  const StatsData = [
    {
      num: 5000,
      Icon: cart,
      text: "Orders Processed",
      suffix: "+",
    },
    {
      num: 10,
      Icon: calender,
      text: "Years of Expertise",
      suffix: "+",
    },
    {
      num: 99,
      Icon: check,
      text: "Customer Satisfaction",
      suffix: "%",
    },
  ];
  return (
    <FadeUp>
      <div className="bg-gray-200 py-14 ">
        <div className="container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 md:gap-0">
          {StatsData?.map((stat, key) => (
            <StatsCard
              label={stat?.text}
              icon={stat?.Icon}
              number={stat?.num}
              key={key}
              suffix={stat?.suffix}
            />
          ))}
        </div>
      </div>
    </FadeUp>
  );
};

export default Stats;
