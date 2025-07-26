'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import PageBackground from '@/components/layout/PageBackground';
import SearchBar from '@/components/ui/SearchBar';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ContactSupport from '@/components/ui/ContactSupport';
import configData from '../../../data/config.json';
import staffData from '../../../data/staff.json';
import faqsData from '../../../data/faqs.json';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  reference?: {
    type: string;
    url: string;
    title: string;
    channel: string;
    timestamp: string;
  } | null;
  staff?: {
    name: string;
    imageUrl: string;
    role: string;
  };
}

// Helper function to parse Slack URL and extract channel and timestamp
const parseSlackUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const channelId = pathParts[2]; // archives/CHANNEL_ID/...
    
    // Extract timestamp from the URL path (p1753377199249849)
    const timestampMatch = pathParts[3]?.match(/p(\d+)/);
    const timestamp = timestampMatch ? timestampMatch[1] : '';
    
    return {
      channel: `#${channelId}`, // You might want to map this to actual channel names
      timestamp: timestamp
    };
  } catch {
    return {
      channel: '#unknown',
      timestamp: ''
    };
  }
};

// Define types for the imported data
interface RawFAQ {
  question: string;
  answer: string;
  category: string;
  reference?: string;
  staff?: string;
}

interface StaffData {
  staff: Record<string, {
    name: string;
    imageUrl: string;
    role: string;
  }>;
}

// Transform the imported data to match our component's expected format
const transformedFAQs: FAQItem[] = (faqsData.faqs as RawFAQ[]).map((faq) => {
  let reference = null;
  if (faq.reference) {
    const parsedUrl = parseSlackUrl(faq.reference);
    reference = {
      type: 'slack_thread',
      url: faq.reference,
      title: 'View Slack Thread',
      channel: parsedUrl.channel,
      timestamp: parsedUrl.timestamp
    };
  }

  const typedStaffData = staffData as StaffData;
  return {
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    reference,
    staff: faq.staff && typedStaffData.staff && typedStaffData.staff[faq.staff] ? {
      name: typedStaffData.staff[faq.staff].name,
      imageUrl: typedStaffData.staff[faq.staff].imageUrl,
      role: typedStaffData.staff[faq.staff].role
    } : undefined
  };
});

function FAQPageContent() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle direct FAQ links
  useEffect(() => {
    if (!isClient) return;
    
    const faqQuery = searchParams.get('q');
    if (faqQuery) {
      // Find the FAQ index that matches the query
      const faqIndex = transformedFAQs.findIndex(faq => {
        const faqId = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return faqId === decodeURIComponent(faqQuery);
      });
      
      if (faqIndex !== -1) {
        // Open the specific FAQ
        setOpenItems([faqIndex]);
        // Scroll to the FAQ after a short delay to ensure it's rendered
        setTimeout(() => {
          const element = document.getElementById(`faq-${faqIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [searchParams, isClient]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = useMemo(() => {
    let filtered = transformedFAQs;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset open items when searching
    setOpenItems([]);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenItems([]);
  };



  return (
    <PageBackground>
      <Header title="SoM FAQ" showBackButton={true} />

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-8 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4a2d24] mb-6 font-[family-name:var(--font-dynapuff)]">
              Find answers to common Summer of Making questions
            </h2>
            <p className="text-xl text-[#4a2d24]/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
              Get quick answers to help you make the most of your Summer of Making experience.
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} placeholder="Search through our FAQ database..." />

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <button
                 onClick={() => handleCategoryChange('all')}
                 className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                   selectedCategory === 'all'
                     ? 'bg-[#4a2d24] text-white shadow-lg'
                     : 'bg-white/80 text-[#4a2d24] hover:bg-white hover:shadow-md'
                 }`}
                 style={{ fontFamily: 'Phantom Sans, sans-serif' }}
               >
                 🌟 All Categories ({transformedFAQs.length})
               </button>
              {configData.categories.map((category) => {
                 const categoryCount = transformedFAQs.filter(faq => faq.category === category.id).length;
                 return (
                   <button
                     key={category.id}
                     onClick={() => handleCategoryChange(category.id)}
                     className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                       selectedCategory === category.id
                         ? 'bg-[#4a2d24] text-white shadow-lg'
                         : 'bg-white/80 text-[#4a2d24] hover:bg-white hover:shadow-md'
                     }`}
                     style={{ fontFamily: 'Phantom Sans, sans-serif' }}
                   >
                     {category.icon} {category.name} ({categoryCount})
                   </button>
                 );
               })}
            </div>
          </motion.div>

          {/* FAQ Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-20"
          >
            {searchQuery && (
              <div className="text-center mb-8">
                <p className="text-lg text-[#4a2d24]/70" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                  Found <span className="font-bold text-[#4a2d24]">{filteredFAQs.length}</span> result{filteredFAQs.length !== 1 ? 's' : ''}
                  {filteredFAQs.length === 0 && (
                    <span className="block mt-2 text-[#4a2d24]/60">Try adjusting your search terms</span>
                  )}
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {filteredFAQs.length > 0 ? (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <p className="text-lg font-medium text-[#4a2d24]/80" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                    {searchQuery ? (
                      `Found ${filteredFAQs.length} result${filteredFAQs.length !== 1 ? 's' : ''} for "${searchQuery}"${selectedCategory !== 'all' ? ` in ${configData.categories.find(c => c.id === selectedCategory)?.name || selectedCategory}` : ''}`
                    ) : selectedCategory !== 'all' ? (
                      `${filteredFAQs.length} ${configData.categories.find(c => c.id === selectedCategory)?.name || selectedCategory} Questions`
                    ) : (
                      `${filteredFAQs.length} Frequently Asked Questions`
                    )}
                  </p>
                </motion.div>
                {filteredFAQs.map((item, index) => (
                  <FAQAccordion
                    key={`${searchQuery}-${index}`}
                    item={item}
                    isOpen={openItems.includes(index)}
                    onToggle={() => toggleItem(index)}
                    index={index}
                    selectedCategory={selectedCategory}
                    categoryConfig={configData.categories}
                  />
                ))}
              </div>
            ) : searchQuery ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="relative mb-8">
                  <div className="text-8xl mb-4 filter drop-shadow-lg">🔍</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C7A077]/20 to-[#E7CFB5]/20 rounded-full blur-3xl"></div>
                </div>
                <h3 className="text-3xl font-bold text-[#4a2d24] mb-4 font-[family-name:var(--font-dynapuff)]">
                  No FAQs found
                </h3>
                <p className="text-lg text-[#4a2d24]/70 max-w-md mx-auto" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                  Try adjusting your search terms or browse all questions below.
                </p>
              </motion.div>
            ) : null}
          </div>

          {/* Contact Support */}
          <ContactSupport />
        </main>
    </PageBackground>
  );
}

export default function FAQClientPage() {
  return (
    <Suspense fallback={
      <PageBackground>
        <Header title="SoM FAQ" showBackButton={true} />
        <main className="max-w-5xl mx-auto px-8 py-12">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl text-[#4a2d24]/70" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
              Loading FAQ content...
            </p>
          </div>
        </main>
      </PageBackground>
    }>
      <FAQPageContent />
    </Suspense>
  );
}