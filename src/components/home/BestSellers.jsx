import { watches } from '@/data/watches';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';

export default function BestSellers() {
  const items = watches.filter((w) => w.bestSeller).slice(0, 4);

  return (
    <section className="relative z-10 py-28 md:py-40 px-6 lg:px-10 max-w-7xl mx-auto bg-black">
      <Reveal className="text-center mb-16 md:mb-24">
        <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">
          Most Desired
        </p>
        <h2 className="font-heading text-4xl md:text-6xl text-white">
          Best Sellers
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {items.map((w, i) => (
          <Reveal key={w.id} delay={i * 0.1}>
            <ProductCard watch={w} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}