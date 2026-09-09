import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { watches } from '@/data/watches';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Reveal from '@/components/Reveal';

export default function ProductDetails() {
  const { id } = useParams();
  const watch = watches.find((w) => w.id === id);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
  }, [id]);

  if (!watch) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <p className="text-white/60">This timepiece could not be found.</p>
        <Link
          to="/collection"
          className="text-gold border-b border-gold pb-1 text-xs tracking-[0.25em] uppercase"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(watch, qty);
    toast({
      title: 'Added to your selection',
      description: `${qty} × ${watch.name}`,
    });
  };

  return (
    <div className="bg-black min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-[11px] tracking-[0.25em] uppercase mb-12 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] lg:sticky lg:top-28">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src={watch.image}
                alt={watch.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="lg:py-6">
              <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-4">
                {watch.collection}
              </p>
              <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 leading-[1.05]">
                {watch.name}
              </h1>
              <p className="font-heading text-3xl text-gold mb-8">
                ${watch.price.toLocaleString()}
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-md">
                {watch.description}
              </p>

              <div className="mb-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-4">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-white/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-white/70 hover:text-gold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 text-white text-lg w-12 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-4 py-3 text-white/70 hover:text-gold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full sm:w-auto sm:min-w-[280px] bg-gold text-black py-5 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-soft transition-colors mb-16"
              >
                Add to Selection
              </button>

              <div>
                <h2 className="font-heading text-2xl text-white mb-6">
                  Specifications
                </h2>
                <dl className="divide-y divide-white/10 border-y border-white/10">
                  {Object.entries(watch.specs).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-6 py-4"
                    >
                      <dt className="text-white/50 text-[11px] tracking-[0.15em] uppercase">
                        {k}
                      </dt>
                      <dd className="text-white text-sm text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}