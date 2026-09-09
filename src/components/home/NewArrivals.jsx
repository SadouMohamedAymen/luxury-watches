import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { watches } from '@/data/watches';
import Reveal from '@/components/Reveal';

function Card({ watch }) {
  return (
    <Link
      to={`/product/${watch.id}`}
      className="group block w-[78vw] sm:w-[60vw] md:w-[34vw] lg:w-[26vw] shrink-0"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
        <img
          src={watch.image}
          alt={watch.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
        <div className="absolute top-4 right-4 text-gold text-[10px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
          View <ArrowUpRight size={12} />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-1.5">
            {watch.collection}
          </p>
          <h3 className="font-heading text-2xl text-white group-hover:text-gold transition-colors duration-500">
            {watch.name}
          </h3>
        </div>
        <p className="font-heading text-lg text-white/80 whitespace-nowrap">
          ${watch.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default function NewArrivals() {
  const items = watches.filter((w) => w.newArrival).slice(0, 8);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setDistance(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
        );
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${distance}px + 100vh)` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 lg:px-10 max-w-7xl mx-auto w-full mb-10 md:mb-14">
          <Reveal>
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-4">
              New Arrivals
            </p>
            <h2 className="font-heading text-4xl md:text-6xl text-white">
              The latest from the maison.
            </h2>
          </Reveal>
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 md:gap-10 px-6 lg:px-10 will-change-transform"
        >
          {items.map((w) => (
            <Card key={w.id} watch={w} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}