import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const HERO_VIDEO = "/src/assets/videos/hero.mp4";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    [1, 0]
  );

  const overlayY = useTransform(
    scrollYProgress,
    [0, 0.45],
    [0, -120]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.12]
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;

    if (!video || !video.duration || Number.isNaN(video.duration)) {
      return;
    }

    targetTimeRef.current = progress * video.duration;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateVideo);
    }
  });

  const updateVideo = () => {
    const video = videoRef.current;

    if (!video || !video.duration) {
      rafRef.current = null;
      return;
    }

    const target = targetTimeRef.current;

    if (Math.abs(video.currentTime - target) > 0.01) {
      video.currentTime = target;
      rafRef.current = requestAnimationFrame(updateVideo);
    } else {
      rafRef.current = null;
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale }}
          className="absolute inset-x-0 top-0 bottom-0"
        >
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover block"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        </motion.div>

        <motion.div
          style={{
            opacity: overlayOpacity,
            y: overlayY
          }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gold text-[11px] tracking-[0.45em] uppercase mb-6"
          >
            Maison Aurél · Est. 1874
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-heading text-5xl md:text-7xl lg:text-[92px] text-white leading-[1.02] max-w-4xl text-balance"
          >
            The Art of{" "}
            <span className="text-gold italic">
              Measured
            </span>{" "}
            Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-white/70 text-lg max-w-xl"
          >
            Hand-finished movements, housed in precious metal.
            A century and a half of haute horlogerie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-5"
          >
            <MagneticButton
              to="/collection"
              className="bg-gold text-black px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-soft transition-colors inline-flex items-center justify-center gap-3"
            >
              Explore the Collection
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </MagneticButton>

            <MagneticButton
              to="/collection"
              className="border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-colors inline-flex items-center justify-center gap-3"
            >
              Discover the Maison
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
