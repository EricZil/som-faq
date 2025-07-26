import { Metadata } from 'next';

export const metadata: Metadata = {
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

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}