'use client'

import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'
import { useFavorites } from '@/lib/useFavorites'
import { formatPrice, formatNumber, calcMonthly } from '@/lib/utils'
import { Badges } from './Badges'

export default function CarRow({ car }: { car: Car }) {
  const { t } = useT()
  const { isFav, toggle } = useFavorites()
  const fav = isFav(car.id)
  const monthly = Math.round(calcMonthly(car.price, car.price * 0.1, 6.9, 60))
  const specs = [String(car.year), `${formatNumber(car.mileage)}KM`, t(`fuel.${car.fuel}`), t(`transmission.${car.transmission}`)]

  return (
    <article className="group bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden flex flex-col sm:flex-row transition-colors hover:border-[var(--border-2)]">
      <Link href={`/inventory/${car.slug}`} className="relative sm:w-72 shrink-0 overflow-hidden">
        <div className="aspect-[16/10] sm:h-full bg-cover bg-center bg-[#0e1116] group-hover:scale-[1.03] transition-transform duration-500" style={{ backgroundImage: `url("${car.images[0]}")` }} />
        <div className="absolute top-3 left-3"><Badges car={car} /></div>
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="text-white font-black text-2xl tracking-[0.15em] uppercase rotate-[-10deg] border-[3px] border-white px-3.5 py-1 display">{t('badge.sold')}</span>
          </div>
        )}
      </Link>

      <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="display text-[19px] font-semibold leading-tight text-[var(--ink)]">{car.make} {car.model}</h3>
          <p className="text-sm text-[var(--ink-3)] mb-3">{car.variant}</p>
          <div className="mono text-[11px] tracking-wide uppercase text-[var(--ink-2)] flex items-center gap-x-3 gap-y-1 flex-wrap">
            {specs.map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="flex gap-1.5 flex-wrap mt-3">
            {car.features.slice(0, 3).map((f) => (
              <span key={f} className="text-[11px] px-2 py-1 rounded-sm text-[var(--ink-2)] border border-[var(--border)]">{f}</span>
            ))}
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:w-44 sm:pl-5 sm:border-l border-[var(--border)]">
          <div className="sm:text-right">
            <div className="mono text-2xl font-semibold text-[var(--ink)]">{formatPrice(car.price)}</div>
            {car.status === 'available' && (
              <div className="mono text-[11px] uppercase tracking-wide" style={{ color: 'var(--accent)' }}>{t('common.from')} {formatPrice(monthly)}{t('common.perMonth')}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggle(car.id)} className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--border)]" aria-label="Save">
              <Heart size={15} className={fav ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--ink-3)]'} />
            </button>
            <Link href={`/inventory/${car.slug}`} className="btn btn-accent px-4 py-2.5">
              {t('common.viewDetails')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
