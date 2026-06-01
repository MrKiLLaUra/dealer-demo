'use client'

import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'

export function Badges({ car }: { car: Car }) {
  const { t } = useT()
  return (
    <div className="flex gap-2 flex-wrap">
      {car.status === 'sold' && (
        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-zinc-900 text-white">
          {t('badge.sold')}
        </span>
      )}
      {car.status === 'reserved' && (
        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-amber-500 text-white">
          {t('badge.reserved')}
        </span>
      )}
      {car.is_new_arrival && car.status === 'available' && (
        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--accent)' }}>
          {t('badge.new_arrival')}
        </span>
      )}
      {car.is_featured && car.status === 'available' && (
        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-amber-400 text-amber-900">
          {t('badge.featured')}
        </span>
      )}
    </div>
  )
}
