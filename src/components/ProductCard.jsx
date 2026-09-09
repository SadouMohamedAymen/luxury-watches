import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import WishlistButton from '@/components/WishlistButton';

export default function ProductCard({ watch }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(watch, 1);
    toast({ title: 'Added to your selection', description: watch.name });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/product/${watch.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-5">
          {/* Image — pronounced zoom on hover */}
          <img
            src={watch.image}
            alt={watch.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          {/* Darkening overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

          {/* Gold frame that draws in on hover */}
          <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:inset-2" />

          {/* Wishlist */}
          <div className="absolute top-4 left-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="block w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <WishlistButton />
            </span>
          </div>

          {/* Top-right view badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-gold text-[10px] tracking-[0.25em] uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            View
            <ArrowUpRight size={13} />
          </div>

          {/* Quick add button */}
          <button
            onClick={quickAdd}
            aria-label={`Add ${watch.name} to selection`}
            className="absolute bottom-4 right-4 w-11 h-11 bg-gold text-black flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0">
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-1.5">
              {watch.collection}
            </p>
            <h3 className="font-heading text-2xl text-white group-hover:text-gold transition-colors duration-300 leading-tight">
              {watch.name}
            </h3>
            <p className="text-white/50 text-sm mt-1.5 truncate">
              {watch.tagline}
            </p>
          </div>
          <p className="font-heading text-xl text-white/90 whitespace-nowrap group-hover:text-gold transition-colors duration-300">
            ${watch.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}