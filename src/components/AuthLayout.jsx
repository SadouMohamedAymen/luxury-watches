import React from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
      {/* subtle gold ambient glow */}
      <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <p className="font-heading text-3xl tracking-[0.3em] text-white mb-6">
            AURÉL
          </p>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 bg-gold/10 mb-5">
            <Icon className="w-6 h-6 text-gold" aria-hidden="true" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-3xl text-white tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-white/50 mt-2 text-sm">{subtitle}</p>}
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl rounded-sm border border-white/10 p-8">
          {children}
        </div>

        {footer && (
          <p className="text-center text-sm text-white/50 mt-6">{footer}</p>
        )}
      </motion.div>
    </div>
  );
}