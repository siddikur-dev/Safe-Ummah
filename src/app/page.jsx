import BoostRewards from "@/components/BoostReward/page";
import CurrentAppeal from "@/components/CurrentAppeal/CurrentAppeal";
import FeatureInfinityReward from "@/components/FeatureInfinityReward/page";
import Footer from "@/components/Footer/page";
import HeroSection from "@/components/HeroSection/page";
import Newsletter from "@/components/Newsletter/page";
import React from "react";

const page = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <CurrentAppeal></CurrentAppeal>
      <FeatureInfinityReward></FeatureInfinityReward>
      <BoostRewards></BoostRewards>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
  );
};

export default page;
