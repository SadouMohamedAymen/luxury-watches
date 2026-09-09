import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { editorialImages } from '@/data/watches';
import Reveal from '@/components/Reveal';

export default function EditorialImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[120vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <img
            src={editorialImages.wrist}
            alt="An Aurél timepiece on the wrist"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: fade }}
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
        />
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-black" />

        <motion.div style={{ opacity: fade }} className="relative z-10 h-full flex items-center justify-center px-6">
          <Reveal>
            <p className="font-heading text-3xl md:text-5xl text-white text-center max-w-3xl leading-snug text-balance">
              “A watch is not a machine that tells time. It is a promise,
              handed from one generation to the next.”
            </p>
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase mt-8 text-center">
              — Aurél, 1874
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}