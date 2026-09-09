import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { editorialImages } from '@/data/watches';
import Reveal from '@/components/Reveal';

export default function Craftsmanship() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={ref} className="relative h-[90vh] md:h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={editorialImages.movement}
          alt="Watch movement components"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <Reveal>
          <p className="text-gold text-[11px] tracking-[0.45em] uppercase mb-6">
            The Atelier
          </p>
          <h2 className="font-heading text-4xl md:text-7xl text-white leading-[1.05] mb-8 text-balance">
            Crafted for generations.
          </h2>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Every component finished by hand. Every anglage polished to a
            mirror. Every dial lacquered in layers measured in microns. This is
            not manufacturing — this is devotion.
          </p>
        </Reveal>
      </div>
    </section>
  );
}