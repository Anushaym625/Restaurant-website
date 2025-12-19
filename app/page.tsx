import { HeroSection } from "@/components/home/HeroSection";
import { BestDelivered } from "@/components/home/BestDelivered";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationSection } from "@/components/home/LocationSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BestDelivered />
      <FeaturedMenu />
      <Testimonials />
      <LocationSection />
    </div>
  );
}

