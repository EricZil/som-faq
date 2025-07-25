'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div 
      className="relative max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C7A077]/20 to-[#E7CFB5]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-[#C7A077]/40 shadow-xl group-hover:shadow-2xl transition-all duration-300">
          <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#4a2d24]/60 group-hover:text-[#4a2d24]/80 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search through our frequently asked questions..."
            value={query}
            onChange={handleInputChange}
            className="w-full pl-16 pr-16 py-6 bg-transparent border-none rounded-2xl focus:outline-none text-lg text-[#4a2d24] placeholder-[#4a2d24]/50 focus:placeholder-[#4a2d24]/30 transition-all duration-200"
            style={{ fontFamily: 'Phantom Sans, sans-serif' }}
          />
        
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={clearSearch}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-[#4a2d24]/10 rounded-full transition-all duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-5 w-5 text-[#4a2d24]/60 hover:text-[#4a2d24]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Search suggestions or results count could go here */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-[#4a2d24]/70" style={{fontFamily: 'Phantom Sans, sans-serif'}}>
              🔍 Searching for: <span className="font-semibold text-[#4a2d24]">&ldquo;{query}&rdquo;</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}