'use client';


import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-sm font-medium text-[var(--muted)]">
            <li><a href="#work" className="hover:text-[var(--foreground)] transition-colors">Work</a></li>
            <li><a href="#about" className="hover:text-[var(--foreground)] transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Contact</a></li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-[var(--card)] transition-colors relative z-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-[var(--card)] transition-colors hidden md:inline-flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--background)]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-12 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <ul className="flex flex-col gap-10 text-2xl font-black text-[var(--accent)]">
              <li><a href="#work" onClick={() => setMenuOpen(false)}>Work</a></li>
              <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
            <button
              onClick={(e) => { e.stopPropagation(); setTheme(theme === 'dark' ? 'light' : 'dark'); }}
              className="p-3 rounded-full hover:bg-[var(--card)] transition-colors border border-[var(--accent)]"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
