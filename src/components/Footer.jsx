import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 lg:px-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-heading text-3xl tracking-[0.25em] text-white mb-5">
            AURÉL
          </p>
          <p className="text-white/50 max-w-sm leading-relaxed">
            Haute horlogerie since 1874. Hand-finished movements, housed in
            precious metal, crafted in the Vallée de Joux.
          </p>
        </div>
        <div>
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5">
            Maison
          </p>
          <ul className="space-y-3 text-white/60">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/collection"
                className="hover:text-white transition-colors"
              >
                Collection
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5">
            Contact
          </p>
          <ul className="space-y-3 text-white/60">
            <li>concierge@aurel.ch</li>
            <li>+41 21 000 0000</li>
            <li>Vallée de Joux, Switzerland</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-white/40 text-[11px] tracking-[0.15em]">
        <p>© 2026 Maison Aurél. All rights reserved.</p>
        <p className="tracking-[0.25em] uppercase">Crafted in Switzerland</p>
      </div>
    </footer>
  );
}