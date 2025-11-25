import BoostRewards from "@/components/BoostReward/page";
import CurrentAppeal from "@/components/CurrentAppeal/CurrentAppeal";
import FeatureInfinityReward from "@/components/FeatureInfinityReward/page";
import HeroSection from "@/components/HeroSection/page";
import React from "react";

const page = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <CurrentAppeal></CurrentAppeal>
      <FeatureInfinityReward></FeatureInfinityReward>
      <BoostRewards></BoostRewards>
    </div>
  );
};

export default page;
