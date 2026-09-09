import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';

export default function FinalCTA() {
  return (
    <section className="py-32 md:py-48 px-6 text-center relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[140px]" />
      <Reveal className="relative z-10 max-w-3xl mx-auto">
        <p className="text-gold text-[11px] tracking-[0.45em] uppercase mb-6">
          Begin
        </p>
        <h2 className="font-heading text-5xl md:text-7xl text-white leading-[1.05] mb-10 text-balance">
          Your collection awaits.
        </h2>
        <MagneticButton
          to="/collection"
          className="bg-gold text-black px-12 py-5 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-gold-soft transition-colors inline-flex items-center justify-center gap-3"
        >
          Explore the Collection
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </MagneticButton>
      </Reveal>
    </section>
  );
}