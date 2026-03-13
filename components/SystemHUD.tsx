'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Cpu, Network } from 'lucide-react';

export const SystemHUD = () => {
  const [metrics, setMetrics] = useState({ cpu: 42, mem: 64, net: 128 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20 + 30),
        mem: Math.floor(Math.random() * 10 + 60),
        net: Math.floor(Math.random() * 100 + 100)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] grid grid-cols-2 gap-4">
      {/* 3D Core Placeholder */}
      <div className="col-span-2 aspect-video glass-panel rounded-[2rem] border border-white/5 flex items-center justify-center overflow-hidden relative group">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="w-32 h-32 border-2 border-dashed border-[var(--accent)]/20 rounded-full flex items-center justify-center"
         >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border border-[var(--accent)] rounded-lg flex items-center justify-center bg-[var(--accent)]/5 shadow-[0_0_30px_rgba(197,160,89,0.2)]"
            >
               <Cpu className="text-[var(--accent)] h-8 w-8 animate-pulse" />
            </motion.div>
         </motion.div>
         <div className="absolute bottom-4 left-6">
            <span className="text-frizz text-[8px] opacity-40 uppercase tracking-[0.4em]">Core_Processor_v4</span>
         </div>
      </div>

      {/* Mini Metrics */}
      <div className="glass-panel p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between">
         <div className="flex justify-between items-start mb-4">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span className="text-[8px] font-mono opacity-20 uppercase">Load</span>
         </div>
         <div>
            <h5 className="text-2xl font-black font-mono">{metrics.cpu}%</h5>
            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ width: `${metrics.cpu}%` }}
                 className="h-full bg-emerald-500"
               />
            </div>
         </div>
      </div>

      <div className="glass-panel p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between">
         <div className="flex justify-between items-start mb-4">
            <Network className="h-4 w-4 text-blue-500" />
            <span className="text-[8px] font-mono opacity-20 uppercase">Throughput</span>
         </div>
         <div>
            <h5 className="text-2xl font-black font-mono">{metrics.net}MB/s</h5>
            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ width: `${(metrics.net / 200) * 100}%` }}
                 className="h-full bg-blue-500"
               />
            </div>
         </div>
      </div>

      <div className="col-span-2 glass-panel p-4 px-8 rounded-full border border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Shield className="h-4 w-4 text-[var(--accent)]" />
            <span className="text-frizz text-[9px]">Security_Firewall: Active</span>
         </div>
         <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
               <div key={i} className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
         </div>
      </div>
    </div>
  );
};
