'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FluxCore = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-500, 500], [10, -10]);
  const rotateY = useTransform(dx, [-500, 500], [-10, 10]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-30">
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative w-[600px] h-[600px]"
      >
        {/* Outer Orbit */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-[var(--accent)]/10 rounded-full"
        />
        
        {/* Middle Orbit */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[15%] border border-white/5 rounded-full flex items-center justify-center"
        >
           <div className="w-4 h-4 bg-[var(--accent)]/20 rounded-full blur-xl animate-pulse" />
        </motion.div>

        {/* Inner Core */}
        <div className="absolute inset-[30%] flex items-center justify-center">
           <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--accent)]/20">
              <motion.circle 
                cx="100" cy="100" r="80" 
                fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.path 
                d="M100 20 L100 180 M20 100 L180 100" 
                stroke="currentColor" strokeWidth="0.5" opacity="0.5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
           </svg>
        </div>

        {/* Data Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
            className="absolute w-1 h-1 bg-[var(--accent)] rounded-full blur-[1px]"
            style={{ 
              offsetPath: `path('M 300,300 m -${150 + i * 20}, 0 a ${150 + i * 20},${150 + i * 20} 0 1,0 ${300 + i * 40},0 a ${150 + i * 20},${150 + i * 20} 0 1,0 -${300 + i * 40},0')` 
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
