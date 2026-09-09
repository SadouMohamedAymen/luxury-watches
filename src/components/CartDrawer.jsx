import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeFromCart,
    total,
    clearCart,
  } = useCart();
  const { toast } = useToast();
  const [placed, setPlaced] = useState(false);

  const close = () => setIsOpen(false);

  const handleCheckout = () => {
    setPlaced(true);
    clearCart();
    toast({
      title: 'Request received',
      description: 'A private concierge will be in touch shortly.',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <h2 className="font-heading text-2xl text-white">Your Selection</h2>
              <button
                onClick={close}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {placed ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5">
                  <p className="font-heading text-3xl text-white text-balance">
                    Thank you.
                  </p>
                  <p className="text-white/60 max-w-xs">
                    Your request has been received. A private concierge will
                    contact you to arrange the details of your acquisition.
                  </p>
                  <Link
                    to="/collection"
                    onClick={close}
                    className="text-gold text-xs tracking-[0.25em] uppercase border-b border-gold pb-1 mt-2"
                  >
                    Continue Exploring
                  </Link>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5">
                  <p className="text-white/50">Your selection is empty.</p>
                  <Link
                    to="/collection"
                    onClick={close}
                    className="text-gold text-xs tracking-[0.25em] uppercase border-b border-gold pb-1"
                  >
                    Discover the Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-7">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover bg-white/5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg text-white leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-gold text-sm mt-1">
                            ${item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="inline-flex items-center border border-white/15">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="px-2.5 py-1.5 text-white/70 hover:text-gold transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="text-white text-sm w-7 text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="px-2.5 py-1.5 text-white/70 hover:text-gold transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-white/40 hover:text-red-400 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {!placed && items.length > 0 && (
              <div className="border-t border-white/10 px-8 py-6 space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                    Total
                  </span>
                  <span className="font-heading text-3xl text-gold">
                    ${total.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gold text-black py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-soft transition-colors"
                >
                  Request Acquisition
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors py-1"
                >
                  Clear selection
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}