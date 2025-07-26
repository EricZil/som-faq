/**
 * Generates a shareable URL for a specific FAQ question
 * @param question The FAQ question text
 * @returns A URL that can be shared and will show Open Graph preview
 */
export function generateFAQUrl(question: string): string {
  // Convert question to URL-friendly ID
  const faqId = question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  // Return the full URL with query parameter
  return `https://som-faq.vercel.app/faq?q=${encodeURIComponent(faqId)}`;
}

/**
 * Generates a local FAQ URL for internal navigation
 * @param question The FAQ question text
 * @returns A relative URL for internal navigation
 */
export function generateLocalFAQUrl(question: string): string {
  const faqId = question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/faq?q=${encodeURIComponent(faqId)}`;
}

/**
 * Extracts the FAQ ID from a question
 * @param question The FAQ question text
 * @returns The URL-friendly FAQ ID
 */
export function getFAQId(question: string): string {
  return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}