import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-GB').format(n)
}

export function formatMileage(km: number) {
  return `${formatNumber(km)} km`
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/**
 * Monthly payment for a hire-purchase / standard amortising car loan.
 * principal = price - deposit, over `months` at annual `rate` (%).
 */
export function calcMonthly(price: number, deposit: number, rate: number, months: number) {
  const principal = Math.max(0, price - deposit)
  const r = rate / 100 / 12
  if (r === 0) return principal / months
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}
