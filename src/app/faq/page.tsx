import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateFAQMetadata } from './metadata';
import FAQClientPage from './client-page';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return generateFAQMetadata({ searchParams });
}

export default function FAQPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FAQClientPage />
    </Suspense>
  );
}