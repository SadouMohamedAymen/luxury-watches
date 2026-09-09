import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function WishlistButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive((a) => !a);
      }}
      aria-label="Save to wishlist"
      aria-pressed={active}
      className="flex items-center justify-center"
    >
      <motion.span
        key={active ? 'on' : 'off'}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 16 }}
        className="block"
      >
        <Heart
          size={18}
          strokeWidth={1.5}
          className={active ? 'fill-gold text-gold' : 'text-white'}
        />
      </motion.span>
    </button>
  );
}