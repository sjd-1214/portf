'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-black tracking-tighter text-xl text-[var(--accent)]"
        >
          SAJJAD_SIDDIQUI
        </motion.div>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 text-sm font-medium text-[var(--muted)]">
            <li><a href="#work" className="hover:text-[var(--foreground)] transition-colors">Work</a></li>
            <li><a href="#about" className="hover:text-[var(--foreground)] transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Contact</a></li>
          </ul>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-[var(--card)] transition-colors"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2" />
          </button>
        </div>
      </div>
    </nav>
  );
};
