'use client';

import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-r from-[#4a2d24]/95 via-[#3a1f1a]/95 to-[#4a2d24]/95 backdrop-blur-lg border-b border-[#C7A077]/40 shadow-2xl"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C7A077] via-[#E7CFB5] to-[#C7A077]"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#E7CFB5] to-[#C7A077] rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo.svg" alt="Hack Club Logo" width={28} height={28} className="object-contain" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4a2d24] rounded-full animate-pulse"></div>
            </motion.div>
            <h1 className="text-3xl font-bold text-[#E7CFB5] tracking-tight font-[family-name:var(--font-dynapuff)]">
              {title}
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-[#E7CFB5] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#E7CFB5]/90" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                Summer of Making 2025
              </span>
            </motion.div>
            
            {showBackButton && (
              <motion.a
                href="/"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="group flex items-center space-x-2 text-[#E7CFB5] hover:text-white transition-all duration-300 px-6 py-3 rounded-xl hover:bg-white/15 border border-transparent hover:border-white/20"
              >
                <ArrowLeftIcon className="h-5 w-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
                <span className="font-semibold" style={{fontFamily: 'Phantom Sans, sans-serif'}}>Back to Home</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A077]/50 to-transparent"></div>
    </motion.header>
  );
}