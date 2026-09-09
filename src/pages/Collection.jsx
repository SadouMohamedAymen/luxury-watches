import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { watches, collections } from '@/data/watches';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';

export default function Collection() {
const [filter, setFilter] = useState('All');

const filtered = useMemo(
() =>
filter === 'All'
? watches
: watches.filter((w) => w.collection === filter),
[filter]
);

return ( <div className="bg-black min-h-screen pt-32 pb-28 px-6 lg:px-10"> <div className="max-w-7xl mx-auto">
     <Reveal> <div className="text-center mb-14"> <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-4">
The Collection </p>

```
        <h1 className="font-heading text-5xl md:text-6xl text-white">
          Timepieces
        </h1>
      </div>
    </Reveal>

    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {collections.map((c) => (
        <button
          key={c}
          onClick={() => setFilter(c)}
          className={`px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all border ${
            filter === c
              ? 'bg-gold text-black border-gold'
              : 'text-white/70 border-white/20 hover:border-gold hover:text-white'
          }`}
        >
          {c}
        </button>
      ))}
    </div>

    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
    >
      <AnimatePresence mode="popLayout">
        {filtered.map((w, i) => (
          <motion.div
            key={w.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <ProductCard watch={w} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  </div>
</div>


);
}
