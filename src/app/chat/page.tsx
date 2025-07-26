'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/layout/Header';
import PageBackground from '@/components/layout/PageBackground';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { generateSystemPrompt } from '@/utils/faqPrompt';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Racoon 🦝, your Summer of Making AI assistant powered by Hack Club! I'm here to help you with any questions about SoM. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Hack Club AI API
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct',
          messages: [
            {
              role: 'system',
              content: generateSystemPrompt()
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: inputValue
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't process that. Please try again!";

      const assistantMessage: Message = {
           id: (Date.now() + 1).toString(),
           content: aiResponse,
           role: 'assistant',
           timestamp: new Date()
         };

       setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I'm having trouble connecting right now. Please try again later or check the FAQ page for answers!",
          role: 'assistant',
          timestamp: new Date()
        };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <PageBackground>
      <Header title="Chat with Racoon" showBackButton={true} />
      
      <main className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">🦝</div>
            <h1 className="text-3xl font-bold text-[#4a2d24]" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
              Chat with Racoon
            </h1>
          </div>
          <p className="text-[#4a2d24]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
            Your AI assistant for Summer of Making questions • Powered by <span className="font-semibold">Hack Club AI</span>
          </p>
        </motion.div>

        {/* AI Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 bg-gradient-to-r from-orange-100/80 to-yellow-100/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-orange-800 mb-2" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                🦝 Raccoon&apos;s Honest Confession!
              </h3>
              <p className="text-xs text-orange-700 leading-relaxed" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                Hiya! I&apos;m still learning and sometimes I make silly mistakes! 🙈 The info I give you comes from the FAQ, 
                but I might mix things up or get confused (I&apos;m just a raccoon after all!). 
                <strong> Always double-check with the </strong>
                <a href="/faq" className="text-orange-800 hover:text-orange-900 underline font-semibold">
                  official FAQ page
                </a>
                <strong> for the real, true information!</strong> Sorry for any confusion - I&apos;m still being trained! 🦝💕
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#4a2d24]/10 p-6">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        message.role === 'user' 
                          ? 'bg-[#4a2d24] text-white' 
                          : 'bg-gradient-to-br from-[#C7A077] to-[#E7CFB5] text-[#4a2d24]'
                      }`}>
                        {message.role === 'user' ? '👤' : '🦝'}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-[#4a2d24] text-white'
                          : 'bg-white border border-[#4a2d24]/10'
                      }`}>
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              code: ({ children }) => (
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="bg-gray-100 p-2 rounded-lg overflow-x-auto text-xs font-mono">
                                  {children}
                                </pre>
                              ),
                              ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        <p className={`text-xs mt-2 opacity-70 ${
                          message.role === 'user' ? 'text-white/70' : 'text-[#4a2d24]/50'
                        }`}>
                          {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C7A077] to-[#E7CFB5] text-[#4a2d24] flex items-center justify-center text-sm">
                    🦝
                  </div>
                  <div className="bg-white border border-[#4a2d24]/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-[#4a2d24] animate-spin" />
                      <span className="text-sm text-[#4a2d24]/70" style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
                        Racoon is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#4a2d24]/20 p-4"
        >
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Racoon about Summer of Making... (Shift+Enter for new line)"
                disabled={isLoading}
                rows={1}
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-[#4a2d24] placeholder-[#4a2d24]/50 resize-none min-h-[48px] max-h-32 overflow-y-auto"
                style={{ fontFamily: 'Phantom Sans, sans-serif' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-[#4a2d24] text-white rounded-xl hover:bg-[#4a2d24]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-[#4a2d24]/50">
            <span style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
              Press Enter to send • Shift+Enter for new line • Markdown supported
            </span>
            <span style={{ fontFamily: 'Phantom Sans, sans-serif' }}>
              Powered by Hack Club AI
            </span>
          </div>
        </motion.div>
      </main>
    </PageBackground>
  );
}