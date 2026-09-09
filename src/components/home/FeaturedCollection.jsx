import { watches } from '@/data/watches';
import EditorialProduct from '@/components/EditorialProduct';
import Reveal from '@/components/Reveal';

export default function FeaturedCollection() {
  const featured = watches.filter((w) => w.featured).slice(0, 4);
  const spans = [
    'md:col-span-7',
    'md:col-span-5',
    'md:col-span-5',
    'md:col-span-7',
  ];

  return (
    <section className="py-28 md:py-40 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end mb-16 md:mb-24">
        <Reveal className="md:col-span-7">
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">
            Featured Timepieces
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.05] text-balance">
            A curated selection of the maison’s most distinguished.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-5 md:pb-3">
          <p className="text-white/50 leading-relaxed">
            Each piece is chosen by our master watchmakers — the few that most
            fully express the spirit of the maison.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {featured.map((w, i) => (
          <EditorialProduct
            key={w.id}
            watch={w}
            index={i}
            className={spans[i] || 'md:col-span-6'}
          />
        ))}
      </div>
    </section>
  );
}