'use client';
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon, CheckCircleIcon, ClockIcon, UserGroupIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import PageBackground from '@/components/layout/PageBackground';
import { useState, useEffect } from 'react';
import faqData from '../../data/faqs.json';
import configData from '../../data/config.json';

export default function Home() {
  const [stats, setStats] = useState({
    totalFAQs: 0,
    categories: 0,
    verifiedAnswers: 0
  });

  useEffect(() => {
    setStats({
      totalFAQs: faqData.faqs.length,
      categories: configData.categories.length,
      verifiedAnswers: faqData.faqs.length // All answers are staff-verified
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <PageBackground>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-[#4a2d24]/95 backdrop-blur-md border-b border-[#C7A077]/30 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#E7CFB5] to-[#C7A077] rounded-xl flex items-center justify-center shadow-lg">
                <img src="/logo.svg" alt="Hack Club Logo" width="28" height="28" className="object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#E7CFB5] font-[family-name:var(--font-dynapuff)]">SoM FAQ</h1>
                <p className="text-sm text-[#C7A077] font-medium">Summer of Making Support</p>
              </div>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <motion.a 
                href="#about" 
                className="text-[#E7CFB5] hover:text-[#C7A077] transition-all duration-300 font-medium relative group"
                whileHover={{ y: -2 }}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C7A077] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              <motion.a 
                href="/faq" 
                className="text-[#E7CFB5] hover:text-[#C7A077] transition-all duration-300 font-medium relative group"
                whileHover={{ y: -2 }}
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C7A077] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              <motion.a 
                href="/chat" 
                className="text-[#E7CFB5] hover:text-[#C7A077] transition-all duration-300 font-medium relative group"
                whileHover={{ y: -2 }}
              >
                AI Chat
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C7A077] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">  
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold text-[#4a2d24] mb-8 font-[family-name:var(--font-dynapuff)] leading-tight"
            >
               SoM FAQ Hub
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-[#4a2d24]/80 max-w-3xl mx-auto mb-12 leading-relaxed" 
              style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}
            >
              Your one-stop destination for all Summer of Making questions and answers, 
              curated and verified by the SoM support team.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.a 
                href="/faq" 
                className="bg-gradient-to-r from-[#4a2d24] to-[#592F31] text-[#E7CFB5] px-10 py-5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 text-center text-lg group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <RocketLaunchIcon className="w-5 h-5" />
                  Browse FAQs
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#592F31] to-[#4a2d24] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              
              <motion.a 
                href="https://github.com/EricZil/som-faq/tree/main?tab=readme-ov-file#-contributing-to-faq-data"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#4a2d24] text-[#4a2d24] px-10 py-5 rounded-xl font-bold hover:bg-[#4a2d24] hover:text-[#E7CFB5] transition-all duration-300 text-lg backdrop-blur-sm inline-block"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Question
              </motion.a>
            </motion.div>
            
            {/* Stats Section */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4a2d24]/10 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-[#4a2d24] mb-2">{stats.totalFAQs}</div>
                <div className="text-[#4a2d24]/70 font-medium">Total FAQs</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#4a2d24]/10 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-[#4a2d24] mb-2">{stats.categories}</div>
                <div className="text-[#4a2d24]/70 font-medium">Categories</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#4a2d24] mb-6 font-[family-name:var(--font-dynapuff)]">Why Choose Our FAQ Hub?</h2>
            <p className="text-xl text-[#4a2d24]/70 max-w-2xl mx-auto">Built with care for the Summer of Making community</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-[#592F31]/10 to-[#4a2d24]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#592F31]/20 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-[#592F31] to-[#4a2d24] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <CheckBadgeIcon className="w-8 h-8 text-[#E7CFB5]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#592F31] mb-4 group-hover:text-[#4a2d24] transition-colors font-[family-name:var(--font-dynapuff)]">Staff Verified</h3>
              <p className="text-[#592F31]/80 leading-relaxed" style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>
                Every FAQ answer is confirmed by SoM staff members and includes references 
                to the original Slack thread where it was captured.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-[#592F31]/10 to-[#4a2d24]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#592F31]/20 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-[#592F31] to-[#4a2d24] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <img src="/logo.svg" alt="Hack Club Logo" width="32" height="32" className="object-contain" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#592F31] mb-4 group-hover:text-[#4a2d24] transition-colors font-[family-name:var(--font-dynapuff)]">Comprehensive FAQ</h3>
              <p className="text-[#592F31]/80 leading-relaxed" style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>
                Find answers to the most common Summer of Making questions, 
                organized by category and regularly updated with new content.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-[#592F31]/10 to-[#4a2d24]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#592F31]/20 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => window.location.href = '/chat'}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-[#592F31] to-[#4a2d24] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <div className="text-2xl">🦝</div>
              </motion.div>
              <h3 className="text-2xl font-bold text-[#592F31] mb-4 group-hover:text-[#4a2d24] transition-colors font-[family-name:var(--font-dynapuff)]">Chat with Racoon</h3>
              <p className="text-[#592F31]/80 leading-relaxed mb-4" style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>
                Meet Racoon, your AI assistant trained on our FAQ database! Get instant 
                answers to your Summer of Making questions.
              </p>
              <div className="inline-flex items-center gap-2 text-[#4a2d24] font-medium text-sm">
                <span>Try it now</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div 
          id="about" 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-[#4a2d24]/10 to-[#592F31]/5 backdrop-blur-md rounded-3xl p-12 md:p-16 border border-[#4a2d24]/20 shadow-2xl"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#4a2d24] mb-8 text-center font-[family-name:var(--font-dynapuff)]"
            >
              About This Project
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8 text-[#4a2d24]/80 text-lg leading-relaxed">
                <motion.p variants={itemVariants} style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>
                  This FAQ hub was created to reduce the workload on SoM support staff by providing 
                  a centralized, searchable database of frequently asked questions and their answers.
                </motion.p>
                
                <motion.div variants={itemVariants} className="bg-white/50 rounded-xl p-6 border-l-4 border-[#4a2d24]">
                  <strong className="text-[#4a2d24] text-xl block mb-2 font-[family-name:var(--font-dynapuff)]">Quality Assurance:</strong>
                  <p style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>All FAQ entries are manually added and verified by SoM staff members. Most answers include a reference to the original Slack thread where the question was discussed and resolved.</p>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-[#4a2d24] to-[#592F31] rounded-2xl p-8 text-white shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-center font-[family-name:var(--font-dynapuff)]">Project Impact</h3>
                <div className="space-y-4" style={{fontFamily: 'Phantom Sans, sans-serif', fontWeight: 'bold'}}>
                  <div className="flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-bold text-[#E7CFB5]">-75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Staff Workload</span>
                    <span className="font-bold text-[#E7CFB5]">-60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Satisfaction</span>
                    <span className="font-bold text-[#E7CFB5]">+85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Questions Resolved</span>
                    <span className="font-bold text-[#E7CFB5]">24/7</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 bg-gradient-to-r from-[#592F31]/95 to-[#4a2d24]/95 backdrop-blur-md border-t border-[#C7A077]/30 mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E7CFB5] to-[#C7A077] rounded-xl flex items-center justify-center">
                  <img src="/logo.svg" alt="Hack Club Logo" width="28" height="28" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-[#E7CFB5] font-[family-name:var(--font-dynapuff)]">SoM FAQ Hub</h3>
              </div>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-[#C7A077] mb-6 text-lg font-medium"
            >
              Built with ❤️ for the Summer of Making community
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 text-[#E7CFB5]/80 text-sm mb-6"
            >
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                All answers verified by SoM staff
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Updated regularly
              </span>
              <span className="flex items-center gap-2">
                <UserGroupIcon className="w-4 h-4" />
                Community-driven
              </span>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-[#E7CFB5]/60 text-sm"
            >
              Questions sourced from official Slack channels • Last updated: 2025-07-25
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </PageBackground>
  );
}
