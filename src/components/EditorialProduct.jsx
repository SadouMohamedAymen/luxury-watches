import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import WishlistButton from '@/components/WishlistButton';

const ease = [0.22, 1, 0.36, 1];

export default function EditorialProduct({
  watch,
  index = 0,
  className = '',
  imageClass = 'aspect-[4/5]',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: (index % 2) * 0.15, ease }}
      className={className}
    >
      <Link to={`/product/${watch.id}`} className="group block">
        <div className={`relative overflow-hidden bg-[#0a0a0a] ${imageClass}`}>
          <motion.img
            src={watch.image}
            alt={watch.name}
            loading="lazy"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: (index % 2) * 0.15, ease }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

          <div className="absolute top-5 left-5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="block w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <WishlistButton />
            </span>
          </div>

          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white text-[10px] tracking-[0.3em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            Discover <ArrowUpRight size={14} />
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
              {watch.collection}
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-gold transition-colors duration-500 leading-tight">
              {watch.name}
            </h3>
            <p className="text-white/50 text-sm mt-2">{watch.tagline}</p>
          </div>
          <p className="font-heading text-xl text-white/80 whitespace-nowrap">
            ${watch.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}