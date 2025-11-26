import Faqs from "@/components/Faqs";

import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import FeaturesProducts from "@/components/FeaturesProducts";

export default function Home() {
  return (
    <div className="font-sans b-18">
      <Hero />
      <FeaturesProducts/>
      <CallToAction />
      <Faqs/>
    </div>
  );
}
