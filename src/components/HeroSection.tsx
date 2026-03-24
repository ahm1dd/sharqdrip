"use client";

import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { useState } from "react";

const TOPS = [
  { id: 1, name: "Nike Repel Miler Set – Stone",        price: "$189", tag: "NEW DROP",      src: "/clothing/1.jpg" },
  { id: 2, name: "Asics Windbreaker Set – Navy",        price: "$199", tag: "LIMITED",       src: "/clothing/2.jpg" },
  { id: 3, name: "Nike Windrunner 3pc – Blue/White",    price: "$249", tag: "BESTSELLER",    src: "/clothing/3.jpg" },
  { id: 4, name: "Asics Fleece Tracksuit – Grey",       price: "$169", tag: "EXCLUSIVE",     src: "/clothing/4.jpg" },
  { id: 5, name: "Nike Repel Miler Set – Khaki",        price: "$189", tag: "SOLD OUT SOON", src: "/clothing/5.jpg" },
  { id: 6, name: "Nike Windrunner Set – Silver/White",  price: "$219", tag: "HOT",           src: "/clothing/6.jpg" },
  { id: 7, name: "Nike Repel Miler 3pc – Navy",         price: "$249", tag: "MUST HAVE",     src: "/clothing/7.jpg" },
];

const RIPPED_PANTS = [
  { id: 8,  name: "Ripped Slim Jeans – Washed Black",       price: "$139", tag: "NEW DROP",      src: "/clothing/10.avif" },
  { id: 9,  name: "Ripped Slim Jeans – Ice Blue",            price: "$139", tag: "HOT",           src: "/clothing/11.avif" },
  { id: 10, name: "Ripped Slim Jeans – Dark Navy",            price: "$149", tag: "LIMITED",       src: "/clothing/12.avif" },
  { id: 11, name: "Ripped Slim Jeans – Jet Black",            price: "$149", tag: "EXCLUSIVE",     src: "/clothing/13.avif" },
  { id: 12, name: "Heavily Ripped Jeans – Faded Black",       price: "$159", tag: "BESTSELLER",    src: "/clothing/14.avif" },
  { id: 13, name: "Splatter Ripped Jeans – Black/Red Liner",  price: "$179", tag: "MUST HAVE",     src: "/clothing/15.avif" },
  { id: 14, name: "Ripped Slim Jeans – Stone Grey",           price: "$145", tag: "SOLD OUT SOON", src: "/clothing/16.avif" },
  { id: 15, name: "Stretchy Ripped Jeans – Pure Black",       price: "$155", tag: "EXCLUSIVE",     src: "/clothing/17.avif" },
];

type Product = { id: number; name: string; price: string; tag: string; src: string };

const CARD_W = 280;
const CARD_H = 420;
const STEP = CARD_W + 20;

// ── Focus Carousel ─────────────────────────────────────────────────────────
const FocusCarousel = ({ products }: { products: Product[] }) => {
  const len = products.length;
  const [active, setActive] = useState(0);
  const mod = (n: number) => ((n % len) + len) % len;
  const prev = () => setActive((a) => mod(a - 1));
  const next = () => setActive((a) => mod(a + 1));

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  return (
    <div className="relative">
      {/* Carousel drag zone */}
      <motion.div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: CARD_H + 72 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.06}
        onDragEnd={handleDragEnd}
      >
        {products.map((product, i) => {
          const dist = ((i - active) % len + len) % len;
          const offset = dist > len / 2 ? dist - len : dist;
          const isCenter = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;

          return (
            <motion.div
              key={product.id}
              className="absolute top-1/2 left-1/2 rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10"
              style={{ width: CARD_W, height: CARD_H, marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2 }}
              animate={{
                x: offset * STEP,
                scale: isCenter ? 1.04 : 0.88,
                opacity: isCenter ? 1 : isAdjacent ? 0.2 : 0,
                filter: isCenter ? "blur(0px)" : "blur(3px)",
                zIndex: isCenter ? 20 : Math.max(0, 10 - Math.abs(offset)),
                boxShadow: isCenter ? "0 0 50px rgba(255,255,255,0.07)" : "0 0 0px transparent",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              onTap={() => { if (offset < 0) prev(); else if (offset > 0) next(); }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
              <Image src={product.src} alt={product.name} fill className="object-cover object-top" sizes="280px" />
              <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[8px] font-black tracking-[0.2em] uppercase bg-white text-black px-2.5 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 z-20 px-5 pb-5">
                <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase mb-0.5">BnsDrip</p>
                <div className="flex items-end justify-between gap-2">
                  <h3 className="text-base font-black tracking-tighter leading-tight">{product.name}</h3>
                  <span className="text-sm font-black text-white/70 shrink-0">{product.price}</span>
                </div>
                <button
                  className="mt-3 w-full py-2.5 bg-white/10 hover:bg-white hover:text-black text-white text-[9px] font-black tracking-widest uppercase rounded-xl border border-white/10 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Dots nav */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40 pointer-events-none">
          <button className="pointer-events-auto w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white text-xs transition-all" onClick={prev}>←</button>
          <div className="flex gap-1.5 items-center">
            {products.map((_, i) => (
              <button
                key={i}
                className={`pointer-events-auto rounded-full transition-all duration-300 ${i === active ? "w-3.5 h-1 bg-white" : "w-1 h-1 bg-white/20"}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button className="pointer-events-auto w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white text-xs transition-all" onClick={next}>→</button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <main className="w-full bg-[#050505] text-white relative pb-20">

      {/* Grain noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top gradient mask */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 inset-x-0 h-20 z-30"
        style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }}
      />

      {/* Vertical watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none fixed right-2 top-1/2 -translate-y-1/2 z-20 text-stone-700 text-[10px] tracking-[0.5em] font-medium uppercase"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        BnsDrip • Est. 2026
      </span>

      {/* ── HEADER ── */}
      <header className="w-full sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="px-6 py-3 md:py-4 flex flex-col items-center gap-2">
          <span className="text-xl md:text-2xl font-[1000] tracking-tighter uppercase text-white">BnsDrip</span>
          <nav className="flex gap-8 md:gap-12">
            {["Home", "Shop", "Collections"].map((link) => (
              <a key={link} href="#" className="text-[9px] text-stone-500 tracking-[0.3em] uppercase hover:text-white transition-colors duration-200">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/clothing/hero1.jpg" alt="BnsDrip Hero" fill priority className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] z-[2]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
          <motion.h1
            className="text-[9vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] md:leading-[0.85] uppercase"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Street Cred,
            <br />
            <span className="text-white/25">Defined.</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-[9px] text-stone-500 tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Spring / Summer 2026
          </motion.p>
          <motion.a
            href="https://ig.me/m/shrqawiii"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-8 py-3 bg-white text-black text-[9px] font-black tracking-widest uppercase rounded-full hover:bg-white/90 transition-all duration-300 animate-pulse-glow"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ boxShadow: "0 0 35px rgba(255,255,255,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Get The Drip
          </motion.a>
        </div>
      </section>

      {/* ── JACKETS ROW (always visible) ── */}
      <section className="relative z-[1] pt-10 pb-2 px-0">
        <motion.div
          className="px-5 mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-stone-500 text-[9px] tracking-[0.5em] uppercase mb-1">2026 Collection</p>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Jackets</h2>
        </motion.div>
        <FocusCarousel products={TOPS} />
      </section>

      {/* ── RIPPED PANTS ROW (mysterious reveal) ── */}
      <motion.section
        className="relative z-[1] pt-4 pb-2 px-0 border-t border-white/5"
        initial={{ opacity: 0.08, scale: 0.94, filter: "blur(18px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section heading */}
        <motion.div
          className="px-5 mb-5"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.4, delay: 0, ease: "easeOut" }}
        >
          <p className="text-stone-500 text-[9px] tracking-[0.5em] uppercase mb-1">Distressed Series</p>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Ripped Pants</h2>
          <p className="mt-1 text-[8px] text-stone-600 tracking-[0.3em] uppercase">Collection</p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
        >
          <FocusCarousel products={RIPPED_PANTS} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        >
          <a
            href="https://ig.me/m/shrqawiii"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 bg-white text-black text-[9px] font-black tracking-widest uppercase rounded-full hover:bg-white/90 transition-all duration-300 animate-pulse-glow"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.25)" }}
          >
            Get The Drip
          </a>
        </motion.div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer className="relative z-[1] border-t border-white/5 py-8 flex flex-col items-center gap-3 mt-4">
        <span className="text-xl font-[1000] tracking-tighter uppercase text-white">BnsDrip</span>
        <p className="text-[8px] text-stone-600 tracking-[0.3em] uppercase">Est. 2026 · All Rights Reserved</p>
        <div className="mt-1 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-white/60 text-xs font-black tracking-tighter">N</span>
        </div>
      </footer>

    </main>
  );
}
