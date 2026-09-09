import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { watches } from '@/data/watches';

const ease = [0.22, 1, 0.36, 1];

export default function ProductShowcase() {
  const watch = watches.find((w) => w.id === 'tourbillon-squelette');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const chapters = [
    { k: 'The Apex', t: 'Twelve a year. Each signed by its maker.' },
    {
      k: 'The Movement',
      t: 'A flying tourbillon suspended in a skeletonised movement, every bridge open-worked and anglage-polished by a single hand.',
    },
    {
      k: 'The Promise',
      t: "Produced in a series of twelve per year — the apex of the maison, and the summit of a watchmaker's career.",
    },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-28 md:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)] flex items-center">
          <motion.div
            style={{ y, scale }}
            className="relative w-full aspect-[4/5] overflow-hidden"
          >
            <img
              src={watch.image}
              alt={watch.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>

        <div className="flex flex-col gap-32 md:gap-48 lg:py-10">
          <div>
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">
              {watch.collection}
            </p>
            <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.05] mb-6 text-balance">
              {watch.name}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              {watch.description}
            </p>
          </div>

          {chapters.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.1, ease }}
            >
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                0{i + 1} — {c.k}
              </p>
              <p className="font-heading text-2xl md:text-3xl text-white/90 leading-snug max-w-md">
                {c.t}
              </p>
            </motion.div>
          ))}

          <Link
            to={`/product/${watch.id}`}
            className="group inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.25em] uppercase self-start border-b border-gold/40 pb-2 hover:border-gold transition-colors"
          >
            Discover the {watch.name}
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}