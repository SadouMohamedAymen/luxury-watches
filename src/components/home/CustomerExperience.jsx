import { Shield, Globe, Gem, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';

const items = [
  {
    icon: Sparkles,
    title: 'Private Concierge',
    body: 'A dedicated advisor for every acquisition, from first enquiry to lifetime service.',
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    body: 'Each timepiece is guaranteed for life by the maison, serviced in our atelier.',
  },
  {
    icon: Globe,
    title: 'Worldwide Delivery',
    body: 'Discreet, insured delivery to your door, anywhere in the world.',
  },
  {
    icon: Gem,
    title: 'Bespoke Commissions',
    body: 'Commission a unique piece, made to your specification by a single watchmaker.',
  },
];

export default function CustomerExperience() {
  return (
    <section className="py-28 md:py-40 px-6 lg:px-10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16 md:mb-24">
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-5">
            The Aurél Experience
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-white">
            A privilege, not a purchase.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1}>
              <div className="bg-[#0a0a0a] h-full p-10 flex flex-col">
                <it.icon size={26} strokeWidth={1.25} className="text-gold mb-8" />
                <h3 className="font-heading text-2xl text-white mb-3">
                  {it.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}