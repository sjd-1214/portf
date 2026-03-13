'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const InfraRadar = () => {
  const [dots, setDots] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate some "anomalies" or "nodes" on the radar
    const newDots = [...Array(5)].map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      opacity: Math.random()
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center overflow-hidden rounded-full border border-white/5">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse" />
      
      {/* Radar Background */}
      <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-xl shadow-2xl" />
      
      {/* Grid Rings */}
      <div className="absolute inset-[15%] border border-white/5 rounded-full" />
      <div className="absolute inset-[30%] border border-white/5 rounded-full" />
      <div className="absolute inset-[45%] border border-white/5 rounded-full" />
      
      {/* Axis Lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5" />

      {/* Rotating Scanner */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 origin-center"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(197, 160, 89, 0.3) 0deg, transparent 90deg)'
        }}
      />

      {/* Nodes / Anomalies */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, dot.opacity, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
          className="absolute w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        />
      ))}

      {/* Center Point */}
      <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]">
         <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
      </div>

      {/* Status Label */}
      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap">
         <span className="text-frizz text-[10px] text-[var(--accent)] tracking-[0.5em]">Scanning_Traffic...</span>
      </div>
    </div>
  );
};
