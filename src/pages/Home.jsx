import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/home/Hero';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import ProductShowcase from '@/components/home/ProductShowcase';
import Craftsmanship from '@/components/home/Craftsmanship';
import NewArrivals from '@/components/home/NewArrivals';
import EditorialImage from '@/components/home/EditorialImage';
import BestSellers from '@/components/home/BestSellers';
import BrandStory from '@/components/home/BrandStory';
import CustomerExperience from '@/components/home/CustomerExperience';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <div className="bg-black">
      <ScrollProgress />
      <Hero />
      <FeaturedCollection />
      <ProductShowcase />
      <Craftsmanship />
      <NewArrivals />
      <EditorialImage />
      <BestSellers />
      <BrandStory />
      <CustomerExperience />
      <FinalCTA />
    </div>
  );
}