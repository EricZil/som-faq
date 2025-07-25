'use client';

import { ChevronDownIcon, LinkIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import Image from 'next/image';

interface StaffProfile {
  name: string;
  imageUrl: string;
  role: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  reference?: {
    type: string;
    url: string;
    title: string;
    channel?: string;
    timestamp?: string;
  } | null;
  staff?: StaffProfile;
}

interface FAQAccordionProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  selectedCategory?: string;
  categoryConfig?: {
    id: string;
    name: string;
    icon: string;
  }[];
}

export default function FAQAccordion({ item, isOpen, onToggle, index, selectedCategory, categoryConfig }: FAQAccordionProps) {
  const [copied, setCopied] = useState(false);
  
  // Find category info for badge display
  const categoryInfo = categoryConfig?.find(cat => cat.id === item.category);
  const showCategoryBadge = selectedCategory === 'all' && categoryInfo;
  
  // Generate a unique ID for this FAQ based on the question
  const faqId = item.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  const copyFAQLink = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggle
    const url = `${window.location.origin}/faq?q=${encodeURIComponent(faqId)}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  return (
    <motion.div
      id={`faq-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group border border-[#4a2d24]/20 rounded-2xl mb-6 overflow-hidden bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#4a2d24]/60"
    >
      <div className="w-full px-8 py-6 flex justify-between items-start hover:bg-gradient-to-r hover:from-[#E7CFB5]/20 hover:to-[#C7A077]/10 transition-all duration-300 group">
        <button
          onClick={onToggle}
          className="flex-1 text-left pr-6 focus:outline-none"
        >
          <div className="flex items-start gap-3 mb-2">
            {showCategoryBadge && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#C7A077]/20 to-[#E7CFB5]/30 text-[#4a2d24] rounded-full border border-[#C7A077]/30 shadow-sm"
                style={{ fontFamily: 'Phantom Sans, sans-serif' }}
              >
                <span className="text-sm">{categoryInfo.icon}</span>
                {categoryInfo.name}
              </motion.span>
            )}
          </div>
          <h3 className="text-xl font-bold text-[#4a2d24] leading-relaxed group-hover:text-[#3a1f1a] transition-colors duration-200" style={{fontFamily: 'Phantom Sans, sans-serif'}}>
            {item.question}
          </h3>
        </button>
        <div className="flex items-center gap-2 flex-shrink-0 mt-1 ml-4">
          {/* Copy Link Button */}
          <motion.button
            onClick={copyFAQLink}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-[#C7A077]/20 hover:bg-[#C7A077]/30 transition-all duration-200 group/copy"
            title="Copy link to this FAQ"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-600" />
            ) : (
              <ClipboardIcon className="h-4 w-4 text-[#4a2d24] group-hover/copy:text-[#3a1f1a]" />
            )}
          </motion.button>
          
          {/* Chevron Button */}
          <button
            onClick={onToggle}
            className="p-2 rounded-full bg-[#4a2d24]/10 group-hover:bg-[#4a2d24]/20 transition-colors duration-200 focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="h-5 w-5 text-[#4a2d24]" />
            </motion.div>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 pt-2 bg-gradient-to-b from-[#E7CFB5]/10 to-transparent">
              <div className="border-t border-[#C7A077]/30 pt-6">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="text-[#4a2d24]/90 text-lg leading-relaxed mb-4 prose prose-lg max-w-none" style={{fontFamily: 'Phantom Sans, sans-serif'}}>
                    <ReactMarkdown 
                      components={{
                        a: ({ href, children }) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#4a2d24] hover:text-[#3a1f1a] underline decoration-[#C7A077] hover:decoration-[#4a2d24] transition-colors duration-200 font-medium"
                          >
                            {children}
                          </a>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        )
                      }}
                    >
                      {item.answer}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Staff Profile Section */}
                  {item.staff && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-[#E7CFB5]/30 to-[#C7A077]/20 rounded-lg border border-[#C7A077]/30"
                    >
                      <div className="relative">
                        <Image 
                          src={item.staff.imageUrl} 
                          alt={item.staff.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full border-2 border-[#C7A077]/50 shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#4a2d24]" style={{fontFamily: 'Phantom Sans, sans-serif'}}>
                          Answered by <span className="font-bold">{item.staff.name}</span>
                        </p>
                        <p className="text-xs text-[#4a2d24]/70" style={{fontFamily: 'Phantom Sans, sans-serif'}}>
                          {item.staff.role}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  
                  {item.reference && (
                    <motion.a 
                      href={item.reference.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium text-[#4a2d24] bg-[#C7A077]/20 hover:bg-[#C7A077]/30 rounded-lg transition-all duration-200 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LinkIcon className="h-4 w-4" />
                      {item.reference.title || 'View Thread'}
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}