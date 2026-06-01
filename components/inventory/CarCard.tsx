'use client'

import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'
import { useFavorites } from '@/lib/useFavorites'
import { formatPrice, formatNumber, calcMonthly } from '@/lib/utils'
import { Badges } from './Badges'

export default function CarCard({ car }: { car: Car }) {
  const { t } = useT()
  const { isFav, toggle } = useFavorites()
  const fav = isFav(car.id)
  const monthly = Math.round(calcMonthly(car.price, car.price * 0.1, 6.9, 60))

  const specs = [String(car.year), `${formatNumber(car.mileage)}KM`, t(`fuel.${car.fuel}`), t(`transmission.${car.transmission}`)]

  return (
    <article className="group bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden flex flex-col transition-colors hover:border-[var(--border-2)]">
      <Link href={`/inventory/${car.slug}`} className="relative block overflow-hidden">
        <div className="aspect-[16/10] bg-cover bg-center bg-[#0e1116] group-hover:scale-[1.03] transition-transform duration-500" style={{ backgroundImage: `url("${car.images[0]}")` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,12,15,0.5), transparent 40%)' }} />
        <div className="absolute top-3 left-3"><Badges car={car} /></div>
        <button
          onClick={(e) => { e.preventDefault(); toggle(car.id) }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-sm bg-black/40 backdrop-blur border border-white/10 transition-colors hover:bg-black/60"
          aria-label="Save"
        >
          <Heart size={15} className={fav ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-white'} />
        </button>
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="text-white font-black text-3xl tracking-[0.18em] uppercase rotate-[-10deg] border-[3px] border-white px-4 py-1.5 display">{t('badge.sold')}</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="display text-[17px] font-semibold leading-tight text-[var(--ink)]">{car.make} {car.model}</h3>
          <p className="text-xs text-[var(--ink-3)] mt-0.5">{car.variant}</p>
        </div>

        <div className="mono text-[10.5px] tracking-wide text-[var(--ink-2)] uppercase flex flex-wrap gap-x-3 gap-y-1 pt-3 border-t border-[var(--border)]">
          {specs.map((s, i) => <span key={i}>{s}</span>)}
        </div>

        <div className="flex items-end justify-between pt-1 mt-auto">
          <div>
            <div className="mono text-xl font-semibold text-[var(--ink)]">{formatPrice(car.price)}</div>
            {car.status === 'available' && (
              <div className="mono text-[10.5px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--accent)' }}>{t('common.from')} {formatPrice(monthly)}{t('common.perMonth')}</div>
            )}
          </div>
          <Link href={`/inventory/${car.slug}`} className="w-10 h-10 flex items-center justify-center rounded-sm bg-white text-[#0a0c0f] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors" aria-label={t('common.viewDetails')}>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}
