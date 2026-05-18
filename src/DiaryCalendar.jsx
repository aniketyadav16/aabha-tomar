import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIARY_ENTRIES = {
  "2026-03-30": "The starting point. Today, my thoughts are entirely focused on what went wrong and how I can fix it. Writing this down because you are everything to me.",
  "2026-04-14": "Two weeks since I started this log. I keep going over our old texts, missing your voice. I hope when you see this, you see how much I am changing.",
  "2026-05-18": "Today is the day. If you are reading this, it means I finally had the courage to apologize face-to-face and show you this entire canvas. You are my best part, Aabha."
};

const MONTHS = [
  { name: "March", index: 2, year: 2026 },
  { name: "April", index: 3, year: 2026 },
  { name: "May", index: 4, year: 2026 },
  { name: "June", index: 5, year: 2026 },
  { name: "July", index: 6, year: 2026 },
  { name: "August", index: 7, year: 2026 },
  { name: "September", index: 8, year: 2026 },
  { name: "October", index: 9, year: 2026 },
  { name: "November", index: 10, year: 2026 },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DiaryCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(4);
  const [activeDateStr, setActiveDateStr] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unlockedDates, setUnlockedDates] = useState([]);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [shake, setShake] = useState(false);

  const today = new Date(2026, 4, 18);
  const globalStart = new Date(2026, 2, 30);

  const generateDays = (monthIndex, year) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const slots = Array(firstDay).fill(null);
    for (let d = 1; d <= totalDays; d++) slots.push(new Date(year, monthIndex, d));
    return slots;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    if (date < globalStart || date > today) return;
    const ds = date.toISOString().split('T')[0];
    setActiveDateStr(ds);
    setPasswordInput("");
    setPasswordError(false);
    if (unlockedDates.includes(ds)) {
      setViewingEntry(DIARY_ENTRIES[ds] || "I wrote my heart out today, keeping my promise alive for us...");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.toLowerCase() === "minionjaatni") {
      const updated = [...unlockedDates, activeDateStr];
      setUnlockedDates(updated);
      setViewingEntry(DIARY_ENTRIES[activeDateStr] || "I wrote my heart out today, keeping my promise alive for us...");
    } else {
      setPasswordError(true);
      setPasswordInput("");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const closeAll = () => { setViewingEntry(null); setActiveDateStr(null); };

  const currentMonth = MONTHS.find(m => m.index === selectedMonth);
  const calendarDays = generateDays(currentMonth.index, currentMonth.year);

  const fontLink = `@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');`;

  return (
    <>
      <style>{`
        ${fontLink}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0b08; }

        .diary-root {
          min-height: 100vh;
          background: #0e0b08;
          background-image:
            radial-gradient(ellipse 900px 600px at 15% 20%, rgba(180,130,60,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 700px 500px at 85% 80%, rgba(160,80,80,0.05) 0%, transparent 70%);
          color: #e8dcc8;
          font-family: 'Cormorant Garamond', Georgia, serif;
          padding: 60px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-x: hidden;
        }

        /* — HEADER — */
        .diary-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #a8896a;
          margin-bottom: 16px;
        }
        .diary-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 400;
          font-style: italic;
          color: #f2e8d5;
          line-height: 1.15;
          text-align: center;
          letter-spacing: -0.01em;
        }
        .diary-rule {
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, transparent, #a8896a 40%, #a8896a 60%, transparent);
          margin: 22px auto;
        }
        .diary-subtitle {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 14px;
          color: #7d6a55;
          text-align: center;
          max-width: 380px;
          line-height: 1.8;
        }

        /* — MONTH TABS — */
        .month-strip {
          display: flex;
          gap: 0;
          margin: 48px 0 40px;
          width: 100%;
          max-width: 860px;
          border-bottom: 1px solid rgba(168,137,106,0.18);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .month-strip::-webkit-scrollbar { display: none; }
        .month-btn {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 20px 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #5a4e41;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.25s, border-color 0.25s;
          margin-bottom: -1px;
          position: relative;
        }
        .month-btn:hover { color: #c9aa80; }
        .month-btn.active {
          color: #e8d4b0;
          border-bottom-color: #a8896a;
        }

        /* — CALENDAR GRID — */
        .calendar-wrap {
          width: 100%;
          max-width: 860px;
          background: rgba(255,255,255,0.017);
          border: 1px solid rgba(168,137,106,0.12);
          border-radius: 4px;
          padding: 32px 28px 36px;
          position: relative;
        }
        .calendar-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(180,140,70,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .weekday-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 6px;
        }
        .weekday-label {
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4a4034;
          padding: 8px 0;
        }

        .day-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .day-cell {
          aspect-ratio: 1;
          border-radius: 3px;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          user-select: none;
        }
        .day-cell.empty { border-color: transparent; background: transparent; }
        .day-cell.shadowed {
          opacity: 0.18;
          pointer-events: none;
        }
        .day-cell.available {
          cursor: pointer;
          border-color: rgba(168,137,106,0.1);
          background: rgba(168,137,106,0.03);
        }
        .day-cell.available:hover {
          background: rgba(168,137,106,0.09);
          border-color: rgba(168,137,106,0.28);
          transform: translateY(-1px);
        }
        .day-cell.unlocked {
          cursor: pointer;
          border-color: rgba(190,150,90,0.35);
          background: rgba(180,140,70,0.07);
        }
        .day-cell.unlocked:hover {
          background: rgba(180,140,70,0.12);
          transform: translateY(-1px);
        }
        .day-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 300;
          color: #c8b898;
          line-height: 1;
        }
        .day-cell.available .day-number { color: #d4c4a8; }
        .day-cell.unlocked .day-number { color: #e8d4a0; }
        .day-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin-top: 5px;
        }
        .day-cell.available .day-dot { background: rgba(180,140,80,0.3); }
        .day-cell.unlocked .day-dot { background: #c8a060; box-shadow: 0 0 6px rgba(200,160,80,0.5); }

        /* — OVERLAY BACKDROP — */
        .overlay-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8,6,4,0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        /* — PASSWORD MODAL — */
        .pw-modal {
          width: 100%;
          max-width: 420px;
          background: #13100c;
          border: 1px solid rgba(168,137,106,0.2);
          border-radius: 4px;
          padding: 48px 44px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pw-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,137,106,0.5), transparent);
        }
        .pw-ornament {
          font-size: 22px;
          color: #6a5840;
          margin-bottom: 20px;
          letter-spacing: 0.15em;
        }
        .pw-heading {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-style: italic;
          color: #e0cfb0;
          margin-bottom: 8px;
        }
        .pw-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #5a4e41;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .pw-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(168,137,106,0.18);
          border-radius: 2px;
          padding: 14px 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          letter-spacing: 0.25em;
          color: #e0cfb0;
          text-align: center;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .pw-input::placeholder { color: #3d3428; letter-spacing: 0.1em; }
        .pw-input:focus { border-color: rgba(168,137,106,0.45); background: rgba(255,255,255,0.05); }
        .pw-input.error { border-color: rgba(180,80,70,0.5); color: #d4907a; }
        .pw-hint {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 12px;
          color: #7a4a40;
          margin-top: 10px;
          min-height: 18px;
        }
        .pw-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .pw-cancel {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 1px solid rgba(168,137,106,0.14);
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5a4e41;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .pw-cancel:hover { color: #a89070; border-color: rgba(168,137,106,0.3); }
        .pw-unlock {
          flex: 1;
          padding: 12px;
          background: rgba(168,137,106,0.1);
          border: 1px solid rgba(168,137,106,0.35);
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c8a870;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .pw-unlock:hover { background: rgba(168,137,106,0.18); border-color: rgba(168,137,106,0.5); }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.5s ease; }

        /* — ENTRY MODAL — */
        .entry-modal {
          width: 100%;
          max-width: 600px;
          background: #100d09;
          border: 1px solid rgba(168,137,106,0.2);
          border-radius: 4px;
          padding: 52px 56px;
          position: relative;
          overflow: hidden;
        }
        .entry-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,137,106,0.5), transparent);
        }
        .entry-modal::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,137,106,0.25), transparent);
        }
        .entry-meta {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #5a4e41;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .entry-meta-line {
          flex: 1;
          height: 1px;
          background: rgba(168,137,106,0.12);
        }
        .entry-text {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: clamp(16px, 2.2vw, 19px);
          color: #d8c8a8;
          line-height: 1.85;
          letter-spacing: 0.01em;
        }
        .entry-close {
          margin-top: 40px;
          display: flex;
          justify-content: center;
        }
        .entry-close-btn {
          background: transparent;
          border: 1px solid rgba(168,137,106,0.2);
          border-radius: 2px;
          padding: 10px 32px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #5a4e41;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .entry-close-btn:hover { color: #a89070; border-color: rgba(168,137,106,0.35); }

        /* — SCROLLBAR — */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(168,137,106,0.2); border-radius: 2px; }
      `}</style>

      <div className="diary-root">

        {/* Header */}
        <div className="diary-eyebrow">A private record</div>
        <h1 className="diary-title">Pages From My Mind</h1>
        <div className="diary-rule" />
        <p className="diary-subtitle">
          A running log of what I realised every single day we spent apart —<br />
          locked, and waiting for your eyes only.
        </p>

        {/* Month Tabs */}
        <div className="month-strip">
          {MONTHS.map(m => (
            <button
              key={m.index}
              className={`month-btn ${selectedMonth === m.index ? 'active' : ''}`}
              onClick={() => setSelectedMonth(m.index)}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div className="calendar-wrap">
          <div className="weekday-row">
            {WEEKDAYS.map(d => <div key={d} className="weekday-label">{d}</div>)}
          </div>
          <div className="day-grid">
            {calendarDays.map((date, idx) => {
              if (!date) return <div key={`e-${idx}`} className="day-cell empty" />;
              const isBefore = date < globalStart;
              const isAfter = date > today;
              const shadowed = isBefore || isAfter;
              const ds = date.toISOString().split('T')[0];
              const isUnlocked = unlockedDates.includes(ds);
              const cls = shadowed ? 'shadowed' : isUnlocked ? 'unlocked' : 'available';

              return (
                <motion.div
                  key={ds}
                  className={`day-cell ${cls}`}
                  onClick={() => handleDateClick(date)}
                  whileHover={!shadowed ? { y: -1 } : {}}
                  whileTap={!shadowed ? { scale: 0.97 } : {}}
                >
                  <span className="day-number">{date.getDate()}</span>
                  {!shadowed && <span className="day-dot" />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Password Modal */}
        <AnimatePresence>
          {activeDateStr && !unlockedDates.includes(activeDateStr) && (
            <motion.div
              className="overlay-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="pw-modal"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pw-ornament">✦ ✦ ✦</div>
                <div className="pw-heading">This page is sealed</div>
                <div className="pw-date">{activeDateStr}</div>

                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    className={`pw-input ${shake ? 'shake' : ''} ${passwordError ? 'error' : ''}`}
                    placeholder="enter the secret word"
                    value={passwordInput}
                    autoFocus
                    onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
                  />
                  <p className="pw-hint">
                    {passwordError ? "That's not it. Hint: your favourite nickname." : ""}
                  </p>
                  <div className="pw-actions">
                    <button type="button" className="pw-cancel" onClick={() => setActiveDateStr(null)}>
                      Leave
                    </button>
                    <button type="submit" className="pw-unlock">
                      Unlock
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entry Reading Modal */}
        <AnimatePresence>
          {viewingEntry && (
            <motion.div
              className="overlay-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="entry-modal"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="entry-meta">
                  <div className="entry-meta-line" />
                  {activeDateStr}
                  <div className="entry-meta-line" />
                </div>

                <p className="entry-text">"{viewingEntry}"</p>

                <div className="entry-close">
                  <button className="entry-close-btn" onClick={closeAll}>Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}