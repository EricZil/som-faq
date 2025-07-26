'use client';

import { useState } from 'react';
import { generateFAQUrl } from '@/utils/faqUrl';
import faqsData from '../../../data/faqs.json';

export default function TestOGPage() {
  const [selectedFAQ, setSelectedFAQ] = useState<string>('');
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleFAQSelect = (question: string) => {
    setSelectedFAQ(question);
    const url = generateFAQUrl(question);
    setGeneratedUrl(url);
  };

  const copyUrl = async () => {
    if (generatedUrl) {
      try {
        await navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7CFB5] to-[#C7A077] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4a2d24] mb-8 text-center">
          Open Graph Test Page
        </h1>
        
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-[#4a2d24] mb-4">
            Test FAQ Link Generation
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4a2d24] mb-2">
              Select a FAQ to generate shareable link:
            </label>
            <select 
              value={selectedFAQ}
              onChange={(e) => handleFAQSelect(e.target.value)}
              className="w-full p-3 border border-[#4a2d24]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A077]"
            >
              <option value="">Choose a FAQ...</option>
              {faqsData.faqs.map((faq, index) => (
                <option key={index} value={faq.question}>
                  {faq.question}
                </option>
              ))}
            </select>
          </div>
          
          {generatedUrl && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4a2d24] mb-2">
                Generated Shareable URL:
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={generatedUrl}
                  readOnly
                  className="flex-1 p-3 border border-[#4a2d24]/20 rounded-lg bg-gray-50"
                />
                <button
                  onClick={copyUrl}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-[#C7A077] text-white hover:bg-[#4a2d24]'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">How to test:</h3>
            <ol className="list-decimal list-inside text-blue-700 space-y-1">
              <li>Select a FAQ from the dropdown above</li>
              <li>Copy the generated URL</li>
              <li>Paste it in Slack, Discord, or any social platform</li>
              <li>The link should show a preview with the FAQ question and answer</li>
            </ol>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Open Graph Features:</h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>Dynamic title based on FAQ question</li>
              <li>Description shows FAQ answer (truncated if too long)</li>
              <li>Includes site logo as preview image</li>
              <li>Proper Twitter Card support</li>
              <li>SEO-friendly URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}