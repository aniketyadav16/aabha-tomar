import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─────────────────────────────────────────────
// WHISPER MESSAGES  (from File 1)
// ─────────────────────────────────────────────
const WHISPERS = [
  {
    text: "I miss you, Minion.",
    style: 'script',
    size: '2.1rem',
    top: '12%', left: '6%',
    delay: 0.6,
    drift: { x: 8, y: -18 },
    color: '#f5738d',
    opacity: 0.72,
  },
  {
    text: "I still love you.",
    style: 'script',
    size: '1.7rem',
    top: '22%', left: '78%',
    delay: 1.1,
    drift: { x: -10, y: -22 },
    color: '#ffb8cd',
    opacity: 0.58,
  },
  {
    text: "and I always will.",
    style: 'script',
    size: '1.55rem',
    top: '30%', left: '82%',
    delay: 1.6,
    drift: { x: -6, y: -14 },
    color: '#f5738d',
    opacity: 0.5,
  },
  {
    text: "tu wapas aa ja yaar.",
    style: 'caps',
    size: '0.58rem',
    top: '58%', left: '4%',
    delay: 2.0,
    drift: { x: 12, y: -10 },
    color: 'rgba(0,198,255,0.65)',
    opacity: 0.55,
  },
  {
    text: "every single day.",
    style: 'caps',
    size: '0.55rem',
    top: '72%', left: '80%',
    delay: 2.4,
    drift: { x: -8, y: -12 },
    color: 'rgba(255,194,204,0.55)',
    opacity: 0.45,
  },
  {
    text: "You were it for me.",
    style: 'script',
    size: '1.35rem',
    top: '80%', left: '7%',
    delay: 2.9,
    drift: { x: 10, y: -20 },
    color: '#ffb8cd',
    opacity: 0.48,
  },
  {
    text: "koi replacement nahi hai tera.",
    style: 'caps',
    size: '0.52rem',
    top: '10%', left: '62%',
    delay: 3.3,
    drift: { x: -5, y: -16 },
    color: 'rgba(255,194,204,0.45)',
    opacity: 0.42,
  },
  {
    text: "I'm sorry.",
    style: 'script',
    size: '2.6rem',
    top: '42%', left: '2%',
    delay: 3.8,
    drift: { x: 14, y: -10 },
    color: '#f5738d',
    opacity: 0.35,
  },
  {
    text: "sabse zyada, tujhe.",
    style: 'caps',
    size: '0.5rem',
    top: '88%', left: '45%',
    delay: 4.2,
    drift: { x: 0, y: -20 },
    color: 'rgba(245,115,141,0.5)',
    opacity: 0.38,
  },
];

// ─────────────────────────────────────────────
// LETTER PARAGRAPHS  (File 2 content, clickable)
// ─────────────────────────────────────────────
const LETTER_PARAGRAPHS = [
  {
    id: 0,
    text: "Yrr Aabha tu best thi yrr (ab bhi h). Jb realise hi ni hua ki tere alawa kuch chaiye hi ni life me. Aur ab jb tere alawa dimmag aur dil me kuch chalta hi ni h tu h hi nahi. Chl ek baat toh pakki h ki agli baar tere jitni awesome ladki life me aayi toh ma ni jaane ena usko.",
  },
  {
    id: 1,
    text: "And, if you're reading this, it means you made it this far — through the cliffs and the cities, through the glaciers and the promises. Through all of it. Thoda bohot paise kamaya h toh pehli badi chiz jo karunga voh ye intl trips, aur har ek jagah pe jake bss terko yaad karunga.",
    highlight: "through the cliffs and the cities, through the glaciers and the promises",
  },
  {
    id: 2,
    text: "I've been trying to write this for the longest time. The words kept running away from me, like they always do when something matters too much. But here they are now — imperfect and honest, because that's all I know how to give.",
  },
  {
    id: 3,
    text: "You are the kind of person who makes ordinary moments feel like once-in-a-lifetime things. A Tuesday morning. A song on shuffle. A city we've never been to yet. With you, every single one becomes something I want to remember.",
    highlight: "ordinary moments feel like once-in-a-lifetime things",
  },
  {
    id: 4,
    text: "I don't know exactly what tomorrow holds. But I know the life I want — the one with too much laughter, too many maps spread out on floors, and every wild, quiet, extraordinary corner of this world discovered beside you.",
  },
  {
    id: 5,
    text: "Best I can say is Aabha yrr ek baar tu pagal thi mere piche ek chance dede yrr merko pagal ho lende apne pichhe. Jitni buri tarah sb bigada h utni acchi tarah sudhar lunga yrr.",
  },
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function LetterEnvelope() {
  const [isOpen, setIsOpen]                   = useState(false);
  const [showStrings, setShowStrings]         = useState(false);
  const [stringsOpacity, setStringsOpacity]   = useState(0);
  const [showLetterContent, setShowLetterContent] = useState(false);
  const [showWhispers, setShowWhispers]       = useState(false);
  const [highlightedPara, setHighlightedPara] = useState(null);
  const [petals, setPetals]                   = useState([]);

  const sectionRef    = useRef(null);
  const stringsGroupRef = useRef(null);
  const animationRef  = useRef(null);

  // ── Auto-open when scrolled into view (File 1 feature) ──
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  useEffect(() => {
    if (isInView && !isOpen) {
      const t = setTimeout(() => openLetter(), 900);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  // ── Whispers appear after letter content renders (File 1 feature) ──
  useEffect(() => {
    if (showLetterContent) {
      const t = setTimeout(() => setShowWhispers(true), 800);
      return () => clearTimeout(t);
    } else {
      setShowWhispers(false);
    }
  }, [showLetterContent]);

  // ── 60fps sway animation for hanging hearts (File 2 feature) ──
  useEffect(() => {
    let t = 0;
    const sway = () => {
      if (stringsGroupRef.current) {
        t += 0.018;
        stringsGroupRef.current
          .querySelectorAll('g[data-heart]')
          .forEach((h, i) => {
            h.style.transform = `translateY(${Math.sin(t + i * 0.9) * 3.5}px)`;
          });
      }
      animationRef.current = requestAnimationFrame(sway);
    };
    animationRef.current = requestAnimationFrame(sway);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // ── Stable ambient background hearts (File 2) ──
  const [bgHearts] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 7}s`,
      duration: `${5 + Math.random() * 4}s`,
      fontSize: `${8 + Math.random() * 9}px`,
    }))
  );

  // ─────────────────────────────────────────────
  // STATE TRANSITIONS
  // ─────────────────────────────────────────────
  const openLetter = () => {
    if (isOpen) return;

    // Rose petals burst (File 1 feature)
    setPetals(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        rot: Math.random() * 720 - 360,
        size: 5 + Math.random() * 7,
        delay: Math.random() * 1.0,
        dur: 2.5 + Math.random() * 2.5,
      }))
    );
    setTimeout(() => setPetals([]), 5500);

    setIsOpen(true);
    setShowStrings(true);
    setTimeout(() => setStringsOpacity(1), 400);
    setTimeout(() => setShowLetterContent(true), 650);
  };

  const closeLetter = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
    setStringsOpacity(0);
    setTimeout(() => setShowStrings(false), 900);
    setShowLetterContent(false);
    setHighlightedPara(null);
    setPetals([]);
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=IM+Fell+English:ital@0;1&display=swap');

        .le-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
          position: relative;
          background: transparent;
          width: 100%;
        }
        .le-head {
          font-family: 'Great Vibes', cursive;
          font-size: 3rem;
          color: #f5738d;
          margin-bottom: 6px;
          text-align: center;
          text-shadow: 0 0 40px rgba(245,115,141,0.4);
        }
        .le-sub {
          font-family: 'Playfair Display', serif;
          font-size: 0.62rem;
          letter-spacing: .35em;
          color: #00f2fe;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 50px;
          opacity: .65;
        }
        .le-hint {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,194,204,0.35);
          text-align: center;
          margin-top: 12px;
          height: 20px;
        }
        .env-wrap {
          position: relative;
          width: 100%;
          max-width: 700px;
        }
        .string-layer {
          position: absolute;
          top: -110px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          pointer-events: none;
          z-index: 30;
          height: 0;
          overflow: visible;
        }
        .env {
          width: 100%;
          background: linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #091220 100%);
          border: 1px solid rgba(0,242,254,0.22);
          border-radius: 3px;
          box-shadow: 0 0 60px rgba(0,100,200,0.12), inset 0 0 50px rgba(0,0,0,0.25);
          position: relative;
          overflow: visible;
          cursor: pointer;
          transition: box-shadow 0.4s ease;
        }
        .env:hover {
          box-shadow: 0 0 80px rgba(0,198,255,0.18), inset 0 0 50px rgba(0,0,0,0.25);
        }
        .env-tex {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(0,242,254,0.016) 18px, rgba(0,242,254,0.016) 19px);
          pointer-events: none;
          border-radius: 3px;
        }
        .flap {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 160px;
          background: linear-gradient(160deg, #0d2245 0%, #091830 100%);
          clip-path: polygon(0 0, 50% 72%, 100% 0);
          z-index: 5;
          transform-origin: top center;
          transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94);
          pointer-events: none;
        }
        .flap.open { transform: rotateX(180deg); }

        /* ── CLOSED STATE ── */
        .cl-st {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 20px 56px;
          position: relative;
          z-index: 6;
        }
        .seal-btn {
          background: none; border: none;
          cursor: pointer; padding: 0;
          transition: transform 0.3s ease;
        }
        .seal-btn:hover { transform: scale(1.08); }
        .seal-hint {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(0,242,254,0.38);
          letter-spacing: .08em;
          margin-top: 14px;
          text-align: center;
        }

        /* ── LETTER PAPER ── */
        .lp {
          position: relative; z-index: 6;
          padding: 52px 56px 52px 56px;
          animation: lrv 1.1s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes lrv {
          from { opacity:0; transform:translateY(28px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        .li {
          position: relative;
          border-radius: 2px;
          padding: 52px 56px 48px 56px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(0,242,254,0.075);
        }
        .ruled {
          position: absolute;
          top: 170px; bottom: 48px;
          left: 56px; right: 56px;
          background: repeating-linear-gradient(transparent, transparent 28px, rgba(0,242,254,0.042) 28px, rgba(0,242,254,0.042) 29px);
          pointer-events: none;
        }
        .l-deco { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
        .l-dline { flex:1; height:1px; background:linear-gradient(to right, transparent, rgba(0,242,254,0.28)); }
        .l-dline.r { background:linear-gradient(to left, transparent, rgba(0,242,254,0.28)); }
        .l-orn { color:rgba(0,242,254,0.32); font-size:0.6rem; letter-spacing:.3em; }
        .l-date {
          font-family:'IM Fell English',serif; font-style:italic;
          font-size:0.78rem; color:rgba(0,242,254,0.32);
          text-align:right; margin-bottom:28px;
        }
        .l-sal {
          font-family:'Great Vibes',cursive; font-size:2.6rem;
          color:#f5738d; margin-bottom:24px;
          text-shadow:0 0 18px rgba(245,115,141,0.28); line-height:1.2;
        }

        /* ── CLICKABLE PARAGRAPHS ── */
        .l-para {
          font-family:'IM Fell English',serif;
          font-size:1.05rem; line-height:2;
          color:rgba(255,184,205,0.55);
          margin-bottom:22px;
          cursor:pointer;
          border-left:2px solid transparent;
          padding-left:14px;
          margin-left:-16px;
          border-radius:0 6px 6px 0;
          transition: color 0.4s ease, background 0.4s ease, border-color 0.4s ease, text-shadow 0.4s ease;
          user-select:none;
          position:relative; z-index:1;
        }
        .l-para:hover {
          color:rgba(255,184,205,0.75);
        }
        .l-para.active {
          color:#ffb8cd;
          background:rgba(245,115,141,0.07);
          border-left-color:rgba(245,115,141,0.5);
          text-shadow:0 0 35px rgba(245,115,141,0.18);
        }
        .l-para em { font-style:italic; color:#ffd5de; }
        .l-hl { color:#00f2fe; font-style:italic; }

        /* ── SIGNATURE ── */
        .l-sig { margin-top:36px; display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
        .l-close {
          font-family:'IM Fell English',serif; font-style:italic;
          font-size:0.92rem; color:rgba(255,184,205,0.5);
        }
        .l-name {
          font-family:'Great Vibes',cursive; font-size:2.7rem;
          color:#f5738d; text-shadow:0 0 18px rgba(245,115,141,0.38);
          line-height:1.1;
        }
        .l-ps {
          margin-top:30px; padding-top:18px;
          border-top:1px solid rgba(0,242,254,0.07);
          font-family:'IM Fell English',serif; font-style:italic;
          font-size:0.83rem; color:rgba(0,242,254,0.36);
          text-align:left;
        }
        .l-ital { font-style:italic; }

        /* ── MINI SEAL STAMP ── */
        .mini-seal {
          margin-top:12px;
          opacity:0;
          animation: sealIn 0.7s 2.9s ease forwards;
        }
        @keyframes sealIn {
          from { opacity:0; transform:scale(0.5) rotate(-15deg); }
          to   { opacity:0.45; transform:scale(1) rotate(-8deg); }
        }

        /* ── CLOSE ROW ── */
        .close-row { display:flex; justify-content:center; margin-top:24px; padding-bottom:4px; }
        .rebtn {
          font-family:'Playfair Display',serif;
          font-size:0.6rem; letter-spacing:.22em; text-transform:uppercase;
          color:rgba(0,242,254,0.38); background:none;
          border:1px solid rgba(0,242,254,0.14);
          padding:8px 24px; border-radius:40px;
          cursor:pointer; transition:all 0.3s ease;
        }
        .rebtn:hover { color:rgba(0,242,254,0.75); border-color:rgba(0,242,254,0.38); background:rgba(0,242,254,0.04); }

        /* ── AMBIENT BG HEARTS ── */
        .fh-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:0; border-radius:3px; }
        .fhrt { position:absolute; color:rgba(245,115,141,0.1); animation:fup 7s linear infinite; bottom:-20px; }
        @keyframes fup {
          0%   { transform:translateY(0) rotate(0deg); opacity:.12; }
          50%  { opacity:.07; }
          100% { transform:translateY(-600px) rotate(18deg); opacity:0; }
        }

        /* ── WATERMARK ── */
        .swlv {
          position:absolute; bottom:12px; right:18px;
          font-size:0.5rem; letter-spacing:.2em;
          color:rgba(0,242,254,0.16); font-family:'Playfair Display',serif;
          text-transform:uppercase; pointer-events:none; z-index:7;
        }

        /* ── AMBIENT GLOW UNDER ENVELOPE ── */
        .env-glow {
          position:absolute; bottom:-8px; left:50%; transform:translateX(-50%);
          width:65%; height:90px;
          background:radial-gradient(ellipse, rgba(245,115,141,0.1) 0%, transparent 70%);
          filter:blur(18px);
          pointer-events:none;
        }
      `}</style>

      {/* ── FLOATING WHISPER MESSAGES (File 1) ── */}
      <AnimatePresence>
        {showWhispers && WHISPERS.map((w, i) => (
          <motion.div
            key={`whisper-${i}`}
            className="fixed pointer-events-none select-none"
            style={{ top: w.top, left: w.left, zIndex: 30 }}
            initial={{ opacity: 0, x: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: w.opacity, x: w.drift.x, y: w.drift.y, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: w.drift.y - 20, filter: 'blur(8px)', transition: { duration: 0.8, ease: 'easeIn' } }}
            transition={{
              delay: w.delay,
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              y: { delay: w.delay + 1.6, duration: 5 + i * 0.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
              x: { delay: w.delay + 1.6, duration: 6 + i * 0.3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            }}
          >
            {w.style === 'script' ? (
              <span style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: w.size,
                color: w.color,
                lineHeight: 1,
                textShadow: `0 0 30px ${w.color}, 0 0 60px ${w.color}40`,
                whiteSpace: 'nowrap',
                display: 'block',
              }}>
                {w.text}
              </span>
            ) : (
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: w.size,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: w.color,
                textShadow: `0 0 20px ${w.color}`,
                whiteSpace: 'nowrap',
                display: 'block',
              }}>
                {w.text}
              </span>
            )}
            {/* Tiny pulsing dot per whisper */}
            <motion.span
              style={{
                position: 'absolute', top: '-4px', right: '-8px',
                width: '4px', height: '4px',
                borderRadius: '50%', background: w.color, opacity: 0.5,
                display: 'block',
              }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: w.delay + 0.5 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── ROSE PETALS (File 1) ── */}
      <AnimatePresence>
        {petals.map(p => (
          <motion.div
            key={p.id}
            className="fixed pointer-events-none"
            style={{ left: `${p.x}%`, top: '45%', zIndex: 50 }}
            initial={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            animate={{ opacity: 0, y: -380, rotate: p.rot, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.dur, delay: p.delay, ease: [0.2, 0, 0.85, 1] }}
          >
            <svg width={p.size} height={p.size * 1.4} viewBox="0 0 10 14">
              <ellipse cx="5" cy="7" rx="3.5" ry="5.5" fill="#f5738d" opacity="0.75"
                transform={`rotate(${Math.random() * 30 - 15} 5 7)`} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── SECTION WRAPPER (ref for auto-open) ── */}
      <div className="le-section" ref={sectionRef}>

        <p className="le-head">One Last Thing...</p>
        <p className="le-sub">A letter, sealed with everything I couldn't say</p>

        {/* Contextual hint text */}
        <p className="le-hint">
          {!isOpen && '— tap to open —'}
          {isOpen && '— click any line —'}
        </p>

        <div style={{ height: '24px' }} />

        <div className="env-wrap">

          {/* ── HANGING STRING + HEART LAYER (File 2) ── */}
          {showStrings && (
            <svg
              className="string-layer"
              viewBox="0 0 700 120"
              preserveAspectRatio="xMidYMax meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="hglow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="2.5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g ref={stringsGroupRef} style={{ opacity: stringsOpacity, transition: 'opacity 0.8s ease' }}>
                {/* Strings */}
                <line x1="50"  y1="0" x2="50"  y2="80" stroke="rgba(245,115,141,0.35)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="130" y1="0" x2="130" y2="60" stroke="rgba(245,115,141,0.30)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="210" y1="0" x2="210" y2="95" stroke="rgba(245,115,141,0.35)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="310" y1="0" x2="310" y2="55" stroke="rgba(0,242,254,0.30)"   strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="390" y1="0" x2="390" y2="90" stroke="rgba(245,115,141,0.32)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="460" y1="0" x2="460" y2="65" stroke="rgba(245,115,141,0.28)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="550" y1="0" x2="550" y2="85" stroke="rgba(0,242,254,0.28)"   strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="640" y1="0" x2="640" y2="60" stroke="rgba(245,115,141,0.30)" strokeWidth="1" strokeDasharray="3,3"/>

                {/* Hearts at string ends — data-heart attr used for sway selector */}
                <g data-heart="1" filter="url(#hglow)" transform="translate(50,80)">
                  <path d="M0 6C0 6,-8 1,-8-4C-8-8,-4.5-10,0-6.5C4.5-10,8-8,8-4C8 1,0 6,0 6Z" fill="#f5738d" opacity="0.75"/>
                </g>
                <g data-heart="2" filter="url(#hglow)" transform="translate(130,60)">
                  <path d="M0 5C0 5,-6 0.5,-6-3.5C-6-6.5,-3.5-8,0-5.5C3.5-8,6-6.5,6-3.5C6 0.5,0 5,0 5Z" fill="#f5738d" opacity="0.6"/>
                </g>
                <g data-heart="3" filter="url(#hglow)" transform="translate(210,95)">
                  <path d="M0 7C0 7,-9 2,-9-4.5C-9-8.5,-5-11,0-7.5C5-11,9-8.5,9-4.5C9 2,0 7,0 7Z" fill="#db5867" opacity="0.8"/>
                </g>
                <g data-heart="4" filter="url(#hglow)" transform="translate(310,55)">
                  <path d="M0 5C0 5,-6 0.5,-6-3.5C-6-6.5,-3.5-8,0-5.5C3.5-8,6-6.5,6-3.5C6 0.5,0 5,0 5Z" fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.65"/>
                </g>
                <g data-heart="5" filter="url(#hglow)" transform="translate(390,90)">
                  <path d="M0 6C0 6,-8 1,-8-4C-8-8,-4.5-10,0-6.5C4.5-10,8-8,8-4C8 1,0 6,0 6Z" fill="#f5738d" opacity="0.7"/>
                </g>
                <g data-heart="6" filter="url(#hglow)" transform="translate(460,65)">
                  <path d="M0 5C0 5,-6 0.5,-6-3.5C-6-6.5,-3.5-8,0-5.5C3.5-8,6-6.5,6-3.5C6 0.5,0 5,0 5Z" fill="#e87b87" opacity="0.55"/>
                </g>
                <g data-heart="7" filter="url(#hglow)" transform="translate(550,85)">
                  <path d="M0 6C0 6,-7 1,-7-3.5C-7-7,-4-9,0-6C4-9,7-7,7-3.5C7 1,0 6,0 6Z" fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.6"/>
                </g>
                <g data-heart="8" filter="url(#hglow)" transform="translate(640,60)">
                  <path d="M0 5C0 5,-6 0.5,-6-3.5C-6-6.5,-3.5-8,0-5.5C3.5-8,6-6.5,6-3.5C6 0.5,0 5,0 5Z" fill="#f5738d" opacity="0.65"/>
                </g>
              </g>
            </svg>
          )}

          {/* ── ENVELOPE SHELL ── */}
          <div className="env" onClick={!isOpen ? openLetter : undefined}>
            <div className="env-tex" />

            {/* Ambient floating background hearts */}
            <div className="fh-bg">
              {bgHearts.map(h => (
                <div key={h.id} className="fhrt" style={{
                  left: h.left,
                  animationDelay: h.delay,
                  animationDuration: h.duration,
                  fontSize: h.fontSize,
                }}>♥</div>
              ))}
            </div>

            {/* Envelope flap */}
            <div className={`flap ${isOpen ? 'open' : ''}`} />

            {/* ── CLOSED STATE ── */}
            {!showLetterContent && (
              <div className="cl-st">
                <button
                  className="seal-btn"
                  aria-label="Open letter"
                  onClick={(e) => { e.stopPropagation(); openLetter(); }}
                >
                  <svg width="72" height="72" viewBox="0 0 64 64"
                    style={{ filter: 'drop-shadow(0 0 14px rgba(219,88,103,0.65))' }}>
                    <circle cx="32" cy="32" r="30" fill="#8b1a2a"/>
                    <circle cx="32" cy="32" r="27" fill="#a32136"/>
                    <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,200,180,0.22)" strokeWidth="1"/>
                    <path d="M32 43C32 43,17 34,17 24.5C17 19,21.5 16,26.5 16C29 16,31.1 17.3,32 19.2C32.9 17.3,35 16,37.5 16C42.5 16,47 19,47 24.5C47 34,32 43,32 43Z" fill="rgba(255,175,185,0.52)"/>
                    <text x="32" y="29" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="9"
                      fill="rgba(255,220,210,0.65)" fontStyle="italic">❧</text>
                  </svg>
                </button>
                <p className="seal-hint">Click anywhere to open</p>
              </div>
            )}

            {/* ── OPEN STATE: THE LETTER ── */}
            {showLetterContent && (
              <div id="letterContent">
                <div className="lp">
                  <div className="li">
                    <div className="ruled" />

                    {/* Ornamental divider */}
                    <div className="l-deco">
                      <div className="l-dline" />
                      <span className="l-orn">✦ ✦ ✦</span>
                      <div className="l-dline r" />
                    </div>

                    <div className="l-date">Forever &amp; counting, 2024</div>

                    <div className="l-sal">My dearest Aabha,</div>

                    {/* ── CLICKABLE PARAGRAPHS (File 1 feature on File 2 content) ── */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {LETTER_PARAGRAPHS.map((para) => (
                        <p
                          key={para.id}
                          className={`l-para ${highlightedPara === para.id ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHighlightedPara(prev => prev === para.id ? null : para.id);
                          }}
                        >
                          {para.highlight
                            ? para.text.split(para.highlight).map((chunk, ci) => (
                                <React.Fragment key={ci}>
                                  {chunk}
                                  {ci < para.text.split(para.highlight).length - 1 && (
                                    <span className="l-hl">{para.highlight}</span>
                                  )}
                                </React.Fragment>
                              ))
                            : para.text
                          }
                        </p>
                      ))}
                      <p className="l-para l-ital" style={{ marginTop: '4px' }}>Hamesha.</p>
                    </div>

                    {/* Signature block */}
                    <div className="l-sig">
                      <span className="l-close">Yours, entirely and always,</span>
                      <span className="l-name">Always, Me</span>
                      {/* Mini seal stamp (File 1 feature) */}
                      <div className="mini-seal">
                        <svg width="42" height="42" viewBox="0 0 42 42">
                          <circle cx="21" cy="21" r="18" fill="none" stroke="#a32136" strokeWidth="0.8" strokeDasharray="3 2.5"/>
                          <circle cx="21" cy="21" r="14" fill="none" stroke="#a32136" strokeWidth="0.5" opacity="0.5"/>
                          <path d="M21 29C12.5 23.5,12 16,16 13.5C18.5 12.5,21 14.5,21 17C21 14.5,23.5 12.5,26 13.5C30 16,29.5 23.5,21 29Z" fill="#a32136"/>
                        </svg>
                      </div>
                    </div>

                    <div className="l-ps">
                      P.S. — copilot ke suggestions toh bekar hain, par yeh wala dil ka suggestion pakka sahi hai. ♥
                    </div>
                  </div>

                  {/* Fold back button */}
                  <div className="close-row">
                    <button className="rebtn" onClick={closeLetter}>Fold it back ↩</button>
                  </div>
                </div>
              </div>
            )}

            {/* Watermark */}
            {!isOpen && <div className="swlv">sealed with love</div>}
          </div>

          {/* Ambient glow under envelope */}
          <div className="env-glow" />

        </div>
      </div>
    </>
  );
}