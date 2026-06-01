'use client'

import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'

const base = 'mono text-[10px] font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm'

export function Badges({ car }: { car: Car }) {
  const { t } = useT()
  return (
    <div className="flex gap-1.5 flex-wrap">
      {car.status === 'sold' && <span className={`${base} bg-white text-[#0a0c0f]`}>{t('badge.sold')}</span>}
      {car.status === 'reserved' && <span className={`${base} bg-amber-500 text-black`}>{t('badge.reserved')}</span>}
      {car.is_new_arrival && car.status === 'available' && (
        <span className={`${base} text-white`} style={{ background: 'var(--accent)' }}>{t('badge.new_arrival')}</span>
      )}
      {car.is_featured && car.status === 'available' && (
        <span className={`${base} text-white`} style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)' }}>{t('badge.featured')}</span>
      )}
    </div>
  )
}
