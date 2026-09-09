import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { atelierImage } from '@/data/watches';
import Reveal from '@/components/Reveal';

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <Reveal>
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">
            The Maison
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.05] mb-8 text-balance">
            Six generations of patience, set in gold.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Since 1874, each Aurél timepiece has passed through the hands of a
            single master watchmaker — from the first turn of the screw to the
            final regulation. We do not measure our output in thousands, but in
            the few hundred movements that leave our atelier each year.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Every component is finished by hand, every anglage polished to a
            mirror, every dial lacquered in layers measured in microns.
          </p>
          <div className="w-16 h-px bg-gold mb-6" />
          <p className="font-heading text-2xl text-white italic">Aurél</p>
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase mt-1">
            Master Watchmaker
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              style={{ y }}
              src={atelierImage}
              alt="A master watchmaker at work"
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}