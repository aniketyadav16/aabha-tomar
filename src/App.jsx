import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Howl } from 'howler';
import ParticleBackground from './ParticleBackground';
import HealingHeart from './HealingHeart';
import KinnaChirSong from './kinnachir.mp3';
import LetterEnvelope from './MemoryConstellation';
import DiaryCalendar from './DiaryCalendar';

// Asset Imports
import faroeImg from './faroeisland.jpg';
import newYorkImg from './newyork.jpg';
import patagoniaImg from './patagonia.webp';

const destinations = [
  {
    id: 1,
    title: "The Faroe Islands",
    subtitle: "Where the world gets quiet",
    description: "Agar kbhi pohoch paya yha toh bss tu hi yaad aaygi. I want to stand on the edge of these cliffs with you, where the wind drowns out everything but us. A place as wild and beautiful as the life I want to build with you.",
    img: faroeImg,
    align: "left"
  },
  {
    id: 2,
    title: "New York City",
    subtitle: "Lost in the noise, together",
    description: "Late nights under streetlights, coffee in hand, wandering through a city that never sleeps. I want to experience the electric rush of the world with you by my side. Minions bhi shoot hui thi yha, shayad.",
    img: newYorkImg,
    align: "right"
  },
  {
    id: 3,
    title: "Patagonia",
    subtitle: "To the end of the earth",
    description: "Waise swarg toh vhi h jaha tu h par ye Glaciers, mountains, and skies that stretch forever. A reminder of how vast the world is, and how incredibly lucky I am to have found you in it.",
    img: patagoniaImg,
    align: "left"
  }
];
  
const heartPositions = [
  { top: '8%',  left: 'calc(50% + 26px)' },
  { top: '22%', left: 'calc(50% - 26px)' },
  { top: '44%', left: 'calc(50% + 26px)' },
  { top: '57%', left: 'calc(50% - 26px)' },
  { top: '80%', left: 'calc(50% + 26px)' },
  { top: '93%', left: 'calc(50% - 26px)' },
];

const HEART_PATH = "M 0 5 C -7 2, -9 -3, -5 -5.5 C -2.5 -7, 0 -5, 0 -3.5 C 0 -5, 2.5 -7, 5 -5.5 C 9 -3, 7 2, 0 5";

// Manual volume fade helper
function manualFade(howlInstance, fromVol, toVol, durationMs) {
  howlInstance.volume(fromVol);
  const steps = 60;
  const stepTime = durationMs / steps;
  const delta = (toVol - fromVol) / steps;
  let current = fromVol;
  let count = 0;
  const interval = setInterval(() => {
    count++;
    current = Math.min(Math.max(current + delta, 0), 1);
    howlInstance.volume(current);
    if (count >= steps) clearInterval(interval);
  }, stepTime);
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // Navigation routing state pipeline: "home" or "diary"

  const bgMusicRef = useRef(null);
  const timelineRef = useRef(null);
  const isDarkTheme = useInView(timelineRef, { margin: "-40% 0px -40% 0px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const sound = new Howl({
      src: [KinnaChirSong],
      loop: true,
      volume: 0,
    });
    bgMusicRef.current = sound;
    return () => sound.unload();
  }, []);

  const handleEnter = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume(0);
      bgMusicRef.current.play();
      manualFade(bgMusicRef.current, 0, 0.6, 4000);
    }
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen text-[#4a3333] overflow-x-hidden font-sans selection:bg-[#db5867]/30 selection:text-[#fffbf2]">

      {/* Global Environmental Canvas Gradients */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{ background: 'radial-gradient(circle at top, #5c0631 0%, #1e0222 100%)' }}
      />

      <motion.div
        className="fixed inset-0 z-[-1]"
        style={{ background: 'radial-gradient(circle at center, #040912 0%, #000000 100%)' }}
        animate={{ opacity: isDarkTheme ? 1 : 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <ParticleBackground isDarkTheme={isDarkTheme} />

      {/* PREMIUM MINIMALIST SPLASH GATEKEEPER */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 w-screen h-screen left-0 top-0 select-none"
            style={{ background: 'radial-gradient(circle at center, #2a0317 0%, #08010a 100%)' }}
            exit={{
              opacity: 0,
              scale: 1.015,
              filter: "blur(10px)",
              transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
            }}
          >
            <div className="text-center z-10 max-w-2xl flex flex-col items-center justify-center">

              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.45em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-[0.65rem] md:text-[0.7rem] font-bold text-[#f5738d] uppercase mb-6 drop-shadow-[0_0_20px_rgba(245,115,141,0.4)]"
              >
                For you, and only you
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="text-4xl md:text-6xl font-serif text-[#fffbf2] mb-6 leading-tight font-light"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 4px 35px rgba(255, 251, 242, 0.12)'
                }}
              >
                Headphones Are Recommended Aabha...
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="text-sm md:text-base text-[#e2cbd0] max-w-md mx-auto leading-relaxed mb-12 font-light tracking-wide"
              >
                Press play. And sit tight, Minion. <br />
                Aaj I'll say everything I should have said a long time ago.
              </motion.p>

              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundPosition: ["0% center", "200% center"]
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 45px rgba(219,88,103,0.55)" }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  backgroundPosition: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                  }
                }}
                className="group relative flex items-center justify-center gap-4 px-12 py-4.5 rounded-full text-white tracking-[0.3em] text-xs font-bold uppercase overflow-hidden shadow-[0_10px_40px_rgba(219,88,103,0.15)]"
                style={{
                  background: 'linear-gradient(90deg, #d34a5a, #e87b87, #d34a5a)',
                  backgroundSize: '200% auto'
                }}
              >
                <svg className="w-3 h-3 fill-current group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Click here to Open
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasEntered && (
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* DYNAMIC COMPONENT SCREEN ROUTER */}
          <AnimatePresence mode="wait">
            {currentView === "diary" ? (
              
              /* SUB-PAGE VIEW STATION: THE DIARY VAULT */
              <motion.div
                key="diaryView"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.6 }}
                className="w-full relative min-h-screen"
              >
                {/* Premium Floating Navigation Return Anchor */}
                <button 
                  onClick={() => setCurrentView("home")}
                  className="fixed top-8 left-8 z-50 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[0.65rem] tracking-[0.3em] font-bold text-gray-300 hover:text-pink-300 hover:border-pink-500/30 hover:bg-pink-950/20 transition-all uppercase shadow-2xl"
                >
                  ← Back to Canvas
                </button>
                <DiaryCalendar />
              </motion.div>

            ) : (
              
              /* BASELINE HOME VIEW EXPERIENCE TREE */
              <motion.div
                key="homeView"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center"
              >
                {/* Section 1: Interactive Healing Heart Panel */}
                <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative">
                  <h2
                    className="text-3xl md:text-5xl font-serif text-[#edd2f7] mb-2 text-center z-20 tracking-wide font-light"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      textShadow: '0 0 30px rgba(237,210,247,0.2)'
                    }}
                  >
                    Everything Now and Ever For You
                  </h2>

                  <div className="w-full max-w-2xl flex items-center justify-center relative my-4">
                    <HealingHeart />
                  </div>

                  <div className="absolute bottom-12 flex flex-col items-center gap-3 select-none">
                    <span className="text-[0.55rem] font-bold tracking-[0.4em] text-[#a48e8e] uppercase">Scroll to explore</span>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm bg-white/[0.02]"
                    >
                      <div className="w-1 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                {/* Section 2: The Typography Letter Context */}
                <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 z-20">
                  <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-pink-500/15 bg-white/[0.02] backdrop-blur-md mb-14 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#db5867] shadow-[0_0_8px_#db5867] animate-pulse"></div>
                    <span className="text-[0.6rem] font-bold tracking-[0.3em] text-[#dfccf5] uppercase mt-0.5">
                      A letter, in motion
                    </span>
                  </div>

                  <h2 className="flex flex-col items-center justify-center mb-14 leading-none select-none">
                    <span className="text-[3.5rem] md:text-[6.5rem] font-serif text-[#fff0f3] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                      You are
                    </span>
                    <span className="text-[4.5rem] md:text-[8.5rem] text-[#f5738d] -mt-5 md:-mt-12 z-10 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                      and were
                    </span>
                    <motion.span
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                      className="text-[3.5rem] md:text-[6.5rem] font-serif text-transparent bg-clip-text -mt-2 md:-mt-5 font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        backgroundImage: "linear-gradient(90deg, #ffffff, #f4c47f, #ffffff, #ffccd7, #ffffff)",
                        backgroundSize: "200% auto"
                      }}
                    >
                      the best part
                    </motion.span>
                    <span className="text-[5rem] md:text-[9.5rem] text-[#f5738d] -mt-4 md:-mt-14" style={{ fontFamily: "'Great Vibes', cursive" }}>
                      of my life.
                    </span>
                  </h2>

                  <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm max-w-2xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] mx-4">
                    <p className="text-[#fcc2c2] text-base md:text-lg leading-relaxed font-light italic">
                      "Yrr Aabha sb galat krdiya yrr par phir bhi tu hi best part thi meri life ka. Vo 3-4 Mahine zindagi bhar ki yaadien."
                    </p>
                  </div>
                </div>

                {/* Section 3: The Curvy Map Path Timeline */}
                <div className="w-full min-h-screen relative py-32 z-20 overflow-hidden" ref={timelineRef}>
                  <div className="text-center mb-36">
                    <h3 className="text-4xl md:text-6xl font-serif text-[#f5738d] mb-4 drop-shadow-[0_0_25px_rgba(245,115,141,0.2)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Promises I Intend to Keep
                    </h3>
                    <p className="text-2xl md:text-4xl text-[#00f2fe] drop-shadow-[0_0_30px_rgba(0,254,254,0.35)] font-light px-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                      Ye kuch jagah h jaha ma jana chahta hu agar gaya toh teri yaad pakka aaygi...
                    </p>
                  </div>

                  <div className="relative px-40">
                    <svg
                      className="absolute left-1/2 -translate-x-1/2 top-0 overflow-visible z-10 pointer-events-none"
                      style={{ width: '60px', height: '100%' }}
                      viewBox="0 0 60 1000"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f2fe" />
                          <stop offset="100%" stopColor="#f5738d" />
                        </linearGradient>
                        <filter id="curveGlow" x="-100%" y="-100%" width="300%" height="300%">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        d="M 30 0 C 58 120, 2 240, 30 360 C 58 480, 2 600, 30 720 C 58 840, 2 960, 30 1000"
                        fill="none"
                        stroke="rgba(0, 242, 254, 0.12)"
                        strokeWidth="2"
                      />
                      <motion.path
                        d="M 30 0 C 58 120, 2 240, 30 360 C 58 480, 2 600, 30 720 C 58 840, 2 960, 30 1000"
                        fill="none"
                        stroke="url(#curveGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ pathLength: scrollYProgress }}
                        filter="url(#curveGlow)"
                      />
                    </svg>

                    {heartPositions.map((pos, i) => (
                      <motion.svg
                        key={i}
                        className="absolute pointer-events-none z-20"
                        style={{
                          top: pos.top,
                          left: pos.left,
                          transform: 'translate(-50%, -50%)',
                        }}
                        width="18"
                        height="18"
                        viewBox="-9 -9 18 18"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-5% 0px' }}
                        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                      >
                        <defs>
                          <filter id={`hg${i}`} x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <path
                          d={HEART_PATH}
                          fill="none"
                          stroke="#00f2fe"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter={`url(#hg${i})`}
                        />
                      </motion.svg>
                    ))}

                    <div className="flex flex-col gap-28 lg:gap-40 relative z-20">
                      {destinations.map((dest) => {
                        const isLeftImage = dest.align === "left";
                        return (
                          <motion.div
                            key={dest.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-150px" }}
                            variants={{
                              hidden: {},
                              visible: { transition: { staggerChildren: 0.25 } }
                            }}
                            className="grid items-center"
                            style={{ gridTemplateColumns: '1fr auto 1fr' }}
                          >
                            <motion.div
                              variants={{
                                hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
                                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
                              }}
                              className="flex justify-end pr-[113px]"
                            >
                              {isLeftImage ? (
                                <div className="w-[510px] flex-none">
                                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)] group border border-cyan-500/20 bg-[#02050a]">
                                    <img
                                      src={dest.img}
                                      alt={dest.title}
                                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040912]/90 via-[#040912]/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                                  </div>
                                </div>
                              ) : (
                                <motion.div
                                  variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                  }}
                                  className="w-[320px] flex-none flex flex-col text-right pr-2"
                                >
                                  <span className="text-[#00c6ff] tracking-[0.25em] uppercase text-[0.7rem] font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,198,255,0.2)]">
                                    {dest.subtitle}
                                  </span>
                                  <h4 className="text-3xl lg:text-4xl font-serif text-[#ffccd5] mb-4 leading-tight font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {dest.title}
                                  </h4>
                                  <p className="text-[#f5ced5]/70 text-sm md:text-base leading-relaxed font-light">
                                    {dest.description}
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>

                            <div className="flex-none w-4 h-4 rounded-full bg-[#040912] border-2 border-[#00f2fe] z-20 shadow-[0_0_15px_rgba(0,242,254,0.6)] relative flex items-center justify-center">
                              <div className="absolute w-8 h-8 rounded-full border border-cyan-500/30 animate-ping opacity-40 pointer-events-none" />
                            </div>

                            <motion.div
                              variants={{
                                hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
                                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
                              }}
                              className="flex justify-start pl-[113px]"
                            >
                              {isLeftImage ? (
                                <motion.div
                                  variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                  }}
                                  className="w-[320px] flex-none flex flex-col pl-2"
                                >
                                  <span className="text-[#00c6ff] tracking-[0.25em] uppercase text-[0.7rem] font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,198,255,0.2)]">
                                    {dest.subtitle}
                                  </span>
                                  <h4 className="text-3xl lg:text-4xl font-serif text-[#ffccd5] mb-4 leading-tight font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {dest.title}
                                  </h4>
                                  <p className="text-[#f5ced5]/70 text-sm md:text-base leading-relaxed font-light">
                                    {dest.description}
                                  </p>
                                </motion.div>
                              ) : (
                                <div className="w-[510px] flex-none">
                                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)] group border border-cyan-500/20 bg-[#02050a]">
                                    <img
                                      src={dest.img}
                                      alt={dest.title}
                                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#040912]/90 via-[#040912]/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Section 4: The Interactive Wax Sealed Envelope Container */}
                    <motion.div
                      className="w-full flex flex-col items-center justify-center mt-40 z-20 relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <LetterEnvelope />
                    </motion.div>

                    {/* DIARY VAULT INVITATION */}
                    <motion.div
                      className="w-full flex flex-col items-center justify-center mt-32 pb-16 z-20 relative"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Thin ornamental rule above */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '36px', width: '320px' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(168,137,106,0.25))' }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(168,137,106,0.45)' }}>one more thing</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(168,137,106,0.25))' }} />
                      </div>

                      <motion.button
                        onClick={() => setCurrentView("diary")}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        initial="rest"
                        animate="rest"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}
                      >
                        {/* Wax seal */}
                        <motion.div
                          variants={{
                            rest: { scale: 1, filter: 'drop-shadow(0 4px 18px rgba(160,100,60,0.2))' },
                            hover: { scale: 1.06, filter: 'drop-shadow(0 6px 28px rgba(180,120,60,0.45))' }
                          }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="36" cy="36" r="33" fill="#1a0f08" stroke="rgba(168,137,106,0.35)" strokeWidth="1" />
                            <circle cx="36" cy="36" r="26" fill="none" stroke="rgba(168,137,106,0.12)" strokeWidth="1" />
                            <circle cx="36" cy="36" r="20" fill="none" stroke="rgba(168,137,106,0.1)" strokeWidth="0.5" />
                            {[0,45,90,135,180,225,270,315].map((angle, i) => (
                              <ellipse
                                key={i}
                                cx="36" cy="36" rx="5" ry="11"
                                fill="rgba(130,80,40,0.55)"
                                transform={`rotate(${angle} 36 36)`}
                              />
                            ))}
                            <circle cx="36" cy="36" r="13" fill="#2a1508" />
                            <text x="36" y="41" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="15" fontStyle="italic" fill="rgba(220,180,120,0.9)">A</text>
                          </svg>
                        </motion.div>

                        {/* Invitation card */}
                        <motion.div
                          variants={{
                            rest: { y: 0 },
                            hover: { y: -3 }
                          }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          style={{
                            border: '1px solid rgba(168,137,106,0.18)',
                            borderRadius: '3px',
                            padding: '28px 40px 24px',
                            background: 'rgba(255,255,255,0.016)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            textAlign: 'center',
                            position: 'relative',
                            width: '300px',
                          }}
                        >
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(168,137,106,0.4), transparent)' }} />

                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,137,106,0.5)', marginBottom: '12px' }}>
                            sealed &amp; waiting
                          </p>
                          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '22px', color: '#e8d4b0', fontWeight: 400, lineHeight: 1.2, marginBottom: '10px' }}>
                            Pages From My Mind
                          </p>
                          <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: '13px', color: 'rgba(168,137,106,0.6)', lineHeight: 1.7 }}>
                            A private log. Every day we were apart.<br />For your eyes only.
                          </p>

                          <motion.div
                            variants={{
                              rest: { opacity: 0.4, letterSpacing: '0.25em' },
                              hover: { opacity: 1, letterSpacing: '0.35em' }
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ marginTop: '20px', fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', textTransform: 'uppercase', color: 'rgba(200,168,100,0.8)' }}
                          >
                            Open the vault →
                          </motion.div>

                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(168,137,106,0.2), transparent)' }} />
                        </motion.div>
                      </motion.button>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}