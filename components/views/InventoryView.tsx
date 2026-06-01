'use client'

import { useSearchParams } from 'next/navigation'
import { queryCars } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import CarCard from '@/components/inventory/CarCard'
import CarFilters from '@/components/inventory/CarFilters'

export default function InventoryView({ soldOnly = false }: { soldOnly?: boolean }) {
  const { t } = useT()
  const params = useSearchParams()

  const num = (k: string) => {
    const v = params.get(k)
    return v ? Number(v) : undefined
  }

  const list = queryCars({
    search: params.get('search') || undefined,
    make: params.get('make') || undefined,
    body: params.get('body') || undefined,
    fuel: params.get('fuel') || undefined,
    transmission: params.get('transmission') || undefined,
    condition: params.get('condition') || undefined,
    color: params.get('color') || undefined,
    minPrice: num('minPrice'),
    maxPrice: num('maxPrice'),
    minYear: num('minYear'),
    maxMileage: num('maxMileage'),
  })

  const cars = soldOnly ? list.filter((c) => c.status === 'sold') : list.filter((c) => c.status !== 'sold')

  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent)' }}>
            {soldOnly ? t('home.viewSold') : t('inv.eyebrow')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--ink)] display">{soldOnly ? t('badge.sold') : t('inv.title')}</h1>
          <p className="text-[var(--ink-3)] mt-2">{cars.length} {cars.length === 1 ? t('inv.foundOne') : t('inv.found')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {!soldOnly && (
            <aside className="lg:w-72 shrink-0">
              <CarFilters />
            </aside>
          )}
          <div className="flex-1">
            {cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-2xl font-bold text-[var(--ink)] mb-2 display">{t('inv.noResults')}</p>
                <p className="text-[var(--ink-3)] text-sm">{t('inv.noResultsSub')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {cars.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
