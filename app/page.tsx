'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { 
  ArrowRight, Cloud, Cpu, ShieldCheck, 
  Activity, Github, Linkedin, Server, Zap, Globe, 
  Code2, Command, ChevronRight, ExternalLink, Box,
  Database, RefreshCw, BarChart3, Lock, Settings, Layers
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { InfraRadar } from "@/components/InfraRadar";
import { SystemHUD } from "@/components/SystemHUD";

// --- Custom Hooks ---

function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * strength);
    y.set((clientY - (top + height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent)] z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
    />
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const { ref: magBtnRef, x: magX, y: magY, handleMouseMove: magMove, handleMouseLeave: magLeave } = useMagnetic();

  return (
    <>
      <Navbar />
      <CustomCursor />
      <div className="noise" />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100] opacity-30"
        style={{ scaleX }}
      />
      
      {/* Persistent Status Bar */}
      <div className="fixed top-20 left-0 w-full z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl hidden md:block">
         <div className="max-w-7xl mx-auto px-10 py-3.5 flex justify-between items-center text-[11px] font-mono tracking-[0.2em] text-white/50 uppercase">
            <div className="flex gap-12">
               <span className="flex items-center gap-3">System_Uptime: <span className="text-emerald-500 font-black">99.998%</span></span>
               <span className="flex items-center gap-3">Cloud_Region: <span className="text-[var(--accent)] font-black italic">GLOBAL_AWS_MULTI_AZ</span></span>
            </div>
            <div className="flex gap-12">
               <span className="flex items-center gap-2">Status: <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> <span className="text-emerald-500 font-black">Optimal</span></span>
               <span className="opacity-40 tracking-[0.4em]">v2.4.0-stable</span>
            </div>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-32 md:pt-48 pb-16 md:pb-24 relative">
        
        {/* Gentleman Aura Glows */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-emerald-900/5 blur-[120px] rounded-full" />
        </div>

        {/* Hero Section */}
      <section className="min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center relative mb-24 md:mb-40">
          
          <div className="mb-10 flex justify-between items-end">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                <div className="h-11 w-11 rounded-full border-2 border-white/10 bg-black flex items-center justify-center p-2.5 shadow-2xl relative z-30">
                  <img src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" alt="AWS" className="w-full h-full object-contain" />
                </div>
                <div className="h-11 w-11 rounded-full border-2 border-white/10 bg-black flex items-center justify-center p-2.5 shadow-2xl relative z-20">
                  <img src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="K8s" className="w-full h-full object-contain" />
                </div>
                <div className="h-11 w-11 rounded-full border-2 border-white/10 bg-black flex items-center justify-center p-2.5 shadow-2xl relative z-10">
                  <img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="Terraform" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="h-[1px] w-12 bg-white/20" />
              <span className="text-frizz opacity-80 text-[12px]">MISSION_CRITICAL_DEVOPS</span>
            </motion.div>
          </div>

               <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] md:leading-[0.8] mb-12 md:mb-24 max-w-full md:max-w-6xl uppercase select-none relative z-10 text-balance"
               >
                  THE CONTROL <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10 italic">PLANE </span> <br />
                  <span className="opacity-40">ENGINEER.</span>
               </motion.h1>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start relative">
                  <div className="lg:col-span-5 relative flex justify-center items-center mb-10 md:mb-0">
                      <InfraRadar />
                  </div>

                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="lg:col-span-7 flex flex-col items-start"
                  >
                     <p className="text-base sm:text-xl md:text-2xl text-[var(--muted)] max-w-full md:max-w-2xl mb-8 md:mb-16 leading-tight font-medium tracking-tight">
                        Architecting resilient, self-healing platforms. I build the infrastructure that allows developers to ship code with zero fear.
                     </p>
                     <div className="flex flex-wrap gap-6 md:gap-10">
                        <motion.div
                           ref={magBtnRef as any}
                           onMouseMove={magMove as any}
                           onMouseLeave={magLeave}
                           style={{ x: magX, y: magY }}
                           className="relative group"
                        >
                           <a href="#work" className="bg-white text-black px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-lg md:text-xl flex items-center gap-4 hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                              ENTER_DASHBOARD <ArrowRight className="h-6 w-6" />
                           </a>
                        </motion.div>
                        <div className="flex items-center gap-4 text-frizz py-2 md:py-4">
                            <div className="h-[1px] w-8 md:w-12 bg-[var(--accent)]" />
                            ARCHITECTURE_BLUEPRINT.SVG
                        </div>
                     </div>
                  </motion.div>
               </div>
        </section>

        {/* System HUD Section */}
        <section className="py-32 mb-48 flex justify-center">
           <SystemHUD />
        </section>

        {/* Technical Stack */}
        <section className="py-16 md:py-32 mb-24 md:mb-48 border-y border-white/5">
           <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
              <div className="flex-1">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8 md:mb-16 italic">System_Stack</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-8 rounded-[2.5rem] glass-panel group hover:bg-[var(--accent)]/5 transition-colors border-dashed border-white/5">
                       <Cloud className="h-10 w-10 mb-6 text-[var(--accent)]" />
                       <h4 className="font-black text-base mb-2 uppercase tracking-widest">Provisioning</h4>
                       <p className="text-[11px] text-[var(--muted)] uppercase font-mono tracking-widest font-bold">Terraform / Ansible / Pulumi</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] glass-panel group hover:bg-[var(--accent)]/5 transition-colors border-dashed border-white/5">
                       <Zap className="h-10 w-10 mb-6 text-emerald-500" />
                       <h4 className="font-black text-base mb-2 uppercase tracking-widest">Orchestration</h4>
                       <p className="text-[11px] text-[var(--muted)] uppercase font-mono tracking-widest font-bold">Kubernetes / EKS / Helm</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] glass-panel group hover:bg-[var(--accent)]/5 transition-colors border-dashed border-white/5">
                       <Activity className="h-10 w-10 mb-6 text-rose-500" />
                       <h4 className="font-black text-base mb-2 uppercase tracking-widest">Observability</h4>
                       <p className="text-[11px] text-[var(--muted)] uppercase font-mono tracking-widest font-bold">Grafana / Prometheus / ELK</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] glass-panel group hover:bg-[var(--accent)]/5 transition-colors border-dashed border-white/5">
                       <ShieldCheck className="h-10 w-10 mb-6 text-blue-500" />
                       <h4 className="font-black text-base mb-2 uppercase tracking-widest">Security</h4>
                       <p className="text-[11px] text-[var(--muted)] uppercase font-mono tracking-widest font-bold">Vault / Istio / Cilium</p>
                    </div>
                 </div>
              </div>
              <div className="flex-1 max-w-md flex items-center mt-8 md:mt-0">
                 <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[var(--accent)]/10 shadow-[0_0_50px_rgba(197,160,89,0.05)]">
                    <h4 className="text-2xl md:text-3xl font-black italic mb-4 md:mb-8 uppercase tracking-tighter text-[var(--accent)]">DevOps_Mandate</h4>
                    <p className="text-base md:text-lg text-[var(--muted)] font-medium leading-relaxed mb-6 md:mb-10 tracking-tight">
                       High-performance systems require high-performance thinking. My engineering philosophy is built on <b>Zero-Downtime Architecture</b> and <b>Elastic Scalability</b>.
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                       {['GIT_OPS', 'CI_CD', 'SEC_OPS', 'SRE'].map(tag => (
                          <span key={tag} className="text-[9px] font-black tracking-[0.3em] px-3 md:px-4 py-1 bg-white/5 rounded-full border border-white/10 uppercase">{tag}</span>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Deployments Section - Expanded to 4 Projects */}
      <section id="work" className="mb-24 md:mb-48">
          <div className="mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-4">
             <div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-2 md:mb-6">Deployments.</h2>
                <p className="text-base sm:text-xl text-[var(--muted)] max-w-full md:max-w-2xl font-medium tracking-tight opacity-60">Selected architectural achievements.</p>
             </div>
             <div className="text-frizz hidden md:block opacity-100 tracking-[0.6em]">PRODUCTION_READY_V.04</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {/* Project 1: Large Feature */}
                  <motion.div 
                     whileHover={{ scale: 0.995 }}
                     className="md:col-span-12 group glass-panel rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 overflow-hidden min-h-[350px] md:min-h-[550px] border border-white/5 flex flex-col md:flex-row gap-8 md:gap-16 relative"
                  >
               <div className="flex-1 z-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                       <span className="text-frizz text-[var(--accent)] uppercase tracking-[0.5em] font-black">Cluster_Orchestration</span>
                       <div className="h-[1px] w-12 bg-white/10" />
                    </div>
                    <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 uppercase italic leading-[0.85]">Autonomous <br /> Cloud_Mesh</h3>
                    <p className="text-xl text-[var(--muted)] max-w-md font-medium leading-tight mb-12">
                       A self-healing, multi-region Kubernetes service mesh spanning 12 global regions, handling 2M+ concurrent connections.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-16 text-frizz opacity-100">
                     <span className="flex items-center gap-3 underline decoration-[var(--accent)]/40 tracking-[0.4em]">2,400_NODES</span>
                     <span className="flex items-center gap-3 underline decoration-[var(--accent)]/40 tracking-[0.4em]">12_REGIONS</span>
                  </div>
               </div>

               <div className="w-full md:w-[450px] p-10 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl relative z-10">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                     <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">provision_main.tf</span>
                  </div>
                  <pre className="text-[10px] font-mono text-emerald-500/80 leading-relaxed overflow-x-hidden">
{`module "eks" {
  source  = "terraform-aws-modules/eks"
  version = "20.0"
  cluster_name = "prod-mesh-01"
  eks_managed_node_groups = {
    standard = {
      min_size = 10
      max_size = 2400
    }
  }
}`}
                  </pre>
               </div>
            </motion.div>

            {/* Project 2: Side Feature */}
                  <motion.div 
                     whileHover={{ scale: 0.995 }}
                     className="md:col-span-6 rounded-[2rem] md:rounded-[3rem] glass-panel p-6 md:p-12 flex flex-col justify-between group border border-white/5"
                  >
               <div>
                  <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-10 border border-blue-500/20">
                     <Lock className="h-8 w-8 text-blue-400" />
                  </div>
                  <h4 className="text-4xl font-black mb-6 uppercase italic tracking-tighter">ZeroTrust Mesh</h4>
                  <p className="text-lg text-[var(--muted)] font-medium leading-relaxed mb-10">
                    Identity-aware infrastructure proxying with automated mTLS rotation across all internal traffic.
                  </p>
               </div>
               <div className="flex justify-between items-center border-t border-white/5 pt-8 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  <span>Istio / Spiffe</span>
                  <ExternalLink className="h-5 w-5" />
               </div>
            </motion.div>

            {/* Project 3: Side Feature */}
                  <motion.div 
                     whileHover={{ scale: 0.995 }}
                     className="md:col-span-6 rounded-[2rem] md:rounded-[3rem] glass-panel p-6 md:p-12 flex flex-col justify-between group border border-white/5"
                  >
               <div>
                  <div className="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-10 border border-amber-500/20">
                     <BarChart3 className="h-8 w-8 text-amber-400" />
                  </div>
                  <h4 className="text-4xl font-black mb-6 uppercase italic tracking-tighter">FinOps Engine</h4>
                  <p className="text-lg text-[var(--muted)] font-medium leading-relaxed mb-10">
                    Automated cost optimization tool that reduced AWS monthly spend by 42% through intelligent resource rightsizing.
                  </p>
               </div>
               <div className="flex justify-between items-center border-t border-white/5 pt-8 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  <span>Python / Lambda</span>
                  <ExternalLink className="h-5 w-5" />
               </div>
            </motion.div>

            {/* Project 4: Medium Feature */}
                  <motion.div 
                     whileHover={{ scale: 0.995 }}
                     className="md:col-span-12 rounded-[2rem] md:rounded-[3rem] glass-panel p-6 md:p-12 flex flex-col md:flex-row justify-between items-center group border border-white/5 min-h-[200px] md:min-h-[300px]"
                  >
               <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                     <RefreshCw className="h-6 w-6 text-emerald-500" />
                     <span className="text-frizz">CI_CD_SPEEDRUN</span>
                  </div>
                  <h4 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">Distributed Pipeline_v3</h4>
                  <p className="text-xl text-[var(--muted)] max-w-xl font-medium">
                    Reduced build times from 45 minutes to 4 minutes using distributed caching and containerized runner pools.
                  </p>
               </div>
               <div className="flex gap-4">
                  {["GitHub Actions", "Bazel", "ArgoCD"].map(tag => (
                     <span key={tag} className="text-[10px] font-bold tracking-widest px-5 py-2 bg-white/5 rounded-full border border-white/10 uppercase">{tag}</span>
                  ))}
               </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
      <footer id="contact" className="py-24 md:py-48 text-center border-t border-white/10 relative overflow-hidden">
           <div className="relative z-10">
              <span className="text-frizz text-[var(--accent)] mb-12 block tracking-[0.6em]">Initialize_Handshake</span>
              <h3 className="text-4xl sm:text-6xl md:text-[11rem] font-black tracking-tighter leading-none mb-12 md:mb-24 uppercase select-none">
                 SAJJAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10 italic">SIDDIQUI.</span>
              </h3>
              <div className="flex flex-col gap-12 items-center">
                 <motion.div whileHover={{ scale: 1.05 }}>
                    <a href="mailto:sjdgithub1214@gmail.com" className="text-lg sm:text-2xl md:text-6xl font-mono font-black border-b-4 md:border-b-8 border-[var(--accent)] pb-3 md:pb-6 hover:text-[var(--accent)] transition-colors tracking-tighter">
                       INITIATE_CONNECTION_
                    </a>
                 </motion.div>
                 
                 <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-center">
                    <a href="https://github.com/sjd-1214" target="_blank" rel="noopener noreferrer" className="text-frizz opacity-100 hover:text-white transition-colors tracking-[0.5em] flex items-center gap-3">
                       <Github className="h-5 w-5" /> GITHUB/SJD-1214
                    </a>
                    <a href="https://www.linkedin.com/in/sajjad1214" target="_blank" rel="noopener noreferrer" className="text-frizz opacity-100 hover:text-white transition-colors tracking-[0.5em] flex items-center gap-3">
                       <Linkedin className="h-5 w-5" /> LINKEDIN/SAJJAD1214
                    </a>
                 </div>
              </div>
           </div>
           
           <div className="mt-48 flex justify-between items-center text-frizz opacity-20 font-mono text-[9px]">
              <span>Sajjad Siddiqui Bespoke Systems &copy; 2026</span>
              <div className="flex items-center gap-6">
                 <div className="h-[1px] w-24 bg-white/10" />
                 All Systems Operational
              </div>
           </div>
        </footer>

      </main>
    </>
  );
}
