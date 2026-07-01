import { media } from '@wix/sdk';

export function getProductImageUrl(wixImageUrl: string | undefined, w = 600, h = 600): string {
  if (!wixImageUrl) return '/images/placeholder.jpg';
  try {
    return media.getScaledToFillImageUrl(wixImageUrl, w, h, {});
  } catch {
    return wixImageUrl.startsWith('https://') ? wixImageUrl : '/images/placeholder.jpg';
  }
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str;
}

export function stripHtml(html: string | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}
