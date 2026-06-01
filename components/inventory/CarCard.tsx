'use client'

import Link from 'next/link'
import { Gauge, Fuel, Cog, Calendar, Heart } from 'lucide-react'
import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'
import { useFavorites } from '@/lib/useFavorites'
import { formatPrice, formatNumber, calcMonthly } from '@/lib/utils'
import { Badges } from './Badges'

export default function CarCard({ car }: { car: Car }) {
  const { t } = useT()
  const { isFav, toggle } = useFavorites()
  const fav = isFav(car.id)

  // Teaser monthly: 10% deposit, 6.9% APR over 60 months.
  const monthly = Math.round(calcMonthly(car.price, car.price * 0.1, 6.9, 60))

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-transform duration-200 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}
    >
      <Link href={`/inventory/${car.slug}`} className="relative block overflow-hidden">
        <div
          className="aspect-[16/10] bg-cover bg-center bg-[#11151c] group-hover:scale-[1.03] transition-transform duration-500"
          style={{ backgroundImage: `url("${car.images[0]}")` }}
        />
        <div className="absolute top-4 left-4">
          <Badges car={car} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            toggle(car.id)
          }}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 rounded-full transition-transform hover:scale-110"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          aria-label="Save"
        >
          <Heart size={15} className={fav ? 'fill-red-500 text-red-500' : 'text-[var(--ink-3)]'} />
        </button>
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-black text-3xl tracking-[0.2em] uppercase rotate-[-12deg] border-4 border-white px-5 py-2 display">
              {t('badge.sold')}
            </span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-[16px] font-bold text-[var(--ink)] leading-snug display">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-[var(--ink-3)]">{car.variant}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-[24px] font-bold text-[var(--ink)] leading-none display">{formatPrice(car.price)}</p>
          {car.status === 'available' && (
            <p className="text-xs text-[var(--ink-3)] mt-1">
              {t('common.from')} <span className="font-semibold text-[var(--accent)]">{formatPrice(monthly)}{t('common.perMonth')}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 py-3.5 text-xs text-[var(--ink-2)] flex-wrap" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <span className="flex items-center gap-1.5 font-medium"><Calendar size={13} className="text-[var(--ink-3)]" /> {car.year}</span>
          <span className="flex items-center gap-1.5 font-medium"><Gauge size={13} className="text-[var(--ink-3)]" /> {formatNumber(car.mileage)} km</span>
          <span className="flex items-center gap-1.5 font-medium"><Fuel size={13} className="text-[var(--ink-3)]" /> {t(`fuel.${car.fuel}`)}</span>
          <span className="flex items-center gap-1.5 font-medium"><Cog size={13} className="text-[var(--ink-3)]" /> {t(`transmission.${car.transmission}`)}</span>
        </div>

        <Link
          href={`/inventory/${car.slug}`}
          className="mt-auto text-sm font-bold text-center py-2.5 rounded-xl transition-colors"
          style={{ background: 'var(--bg-soft)', color: 'var(--ink)' }}
        >
          {t('common.viewDetails')} →
        </Link>
      </div>
    </article>
  )
}
