'use client';

import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function ContactSupport() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C7A077]/20 via-[#E7CFB5]/30 to-[#4a2d24]/10 rounded-3xl blur-2xl"></div>
      
      <div className="relative p-10 bg-white/95 backdrop-blur-lg rounded-3xl border border-[#C7A077]/50 shadow-2xl text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C7A077]/20 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#E7CFB5]/30 to-transparent rounded-full translate-x-12 translate-y-12"></div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-[#4a2d24] mb-3" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
            Still have questions?
          </h3>
          <p className="text-lg text-[#4a2d24]/80 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
            SoM staff team and friendly community are here to help you succeed in your Summer of Making journey.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <motion.a
            href="https://hackclub.slack.com/archives/C090JKDJYN8"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-[#4a2d24] to-[#3a1f1a] text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-lg relative overflow-hidden"
            style={{ fontFamily: 'Phantom Sans, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative">💬 Contact Support</span>
          </motion.a>
          
          <motion.a
            href="http://hackclub.slack.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 border-2 border-[#C7A077] text-[#4a2d24] rounded-2xl hover:bg-gradient-to-r hover:from-[#C7A077]/10 hover:to-[#E7CFB5]/10 hover:shadow-xl transition-all duration-300 font-bold text-lg relative overflow-hidden"
            style={{ fontFamily: 'Phantom Sans, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C7A077]/0 via-[#C7A077]/10 to-[#C7A077]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative">🌟 Join Community</span>
          </motion.a>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center justify-center gap-6 text-sm text-[#4a2d24]/60"
          style={{ fontFamily: 'Phantom Sans, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Average response: 10-20 minutes</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-[#4a2d24]/30 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span>🚀</span>
            <span>Active community support</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}