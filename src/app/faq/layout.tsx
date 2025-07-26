import { Metadata } from 'next';
import faqsData from '../../../data/faqs.json';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const faqQuery = resolvedSearchParams?.q;
  
  // Default metadata
  const defaultMetadata: Metadata = {
    title: 'SoM FAQ Hub - Summer of Making Support',
    description: 'Your one-stop destination for all Summer of Making questions and answers, curated and verified by the SoM support team.',
    openGraph: {
      title: 'SoM FAQ Hub - Summer of Making Support',
      description: 'Your one-stop destination for all Summer of Making questions and answers, curated and verified by the SoM support team.',
      type: 'website',
      url: 'https://som-faq.vercel.app/faq',
      siteName: 'SoM FAQ Hub',
      images: [
        {
          url: 'https://som-faq.vercel.app/banner.png',
          width: 1200,
          height: 630,
          alt: 'SoM FAQ Hub - Summer of Making Support',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SoM FAQ Hub - Summer of Making Support',
      description: 'Your one-stop destination for all Summer of Making questions and answers, curated and verified by the SoM support team.',
      images: ['https://som-faq.vercel.app/banner.png'],
    },
  };

  // If no specific FAQ query, return default metadata
  if (!faqQuery) {
    return defaultMetadata;
  }

  // Find the specific FAQ
  const faq = faqsData.faqs.find(faq => {
    const faqId = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return faqId === decodeURIComponent(faqQuery);
  });

  // If FAQ not found, return default metadata
  if (!faq) {
    return defaultMetadata;
  }

  // Generate specific metadata for the FAQ
  const faqTitle = `${faq.question} - SoM FAQ`;
  const faqDescription = faq.answer.length > 160 
    ? faq.answer.substring(0, 157) + '...'
    : faq.answer;
  const faqUrl = `https://som-faq.vercel.app/faq?q=${encodeURIComponent(faqQuery)}`;

  return {
    title: faqTitle,
    description: faqDescription,
    openGraph: {
      title: faqTitle,
      description: faqDescription,
      type: 'article',
      url: faqUrl,
      siteName: 'SoM FAQ Hub',
      images: [
        {
          url: 'https://som-faq.vercel.app/banner.png',
          width: 1200,
          height: 630,
          alt: faq.question,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: faqTitle,
      description: faqDescription,
      images: ['https://som-faq.vercel.app/banner.png'],
    },
  };
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}