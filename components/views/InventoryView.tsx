'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LayoutGrid, List } from 'lucide-react'
import type { Car } from '@/lib/types'
import { queryCars } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import CarCard from '@/components/inventory/CarCard'
import CarRow from '@/components/inventory/CarRow'
import CarFilters from '@/components/inventory/CarFilters'

type Sort = 'featured' | 'priceAsc' | 'priceDesc' | 'yearNew' | 'mileageLow'

function applySort(cars: Car[], sort: Sort): Car[] {
  const c = [...cars]
  switch (sort) {
    case 'priceAsc': return c.sort((a, b) => a.price - b.price)
    case 'priceDesc': return c.sort((a, b) => b.price - a.price)
    case 'yearNew': return c.sort((a, b) => b.year - a.year)
    case 'mileageLow': return c.sort((a, b) => a.mileage - b.mileage)
    default: return c // featured order already applied by queryCars
  }
}

export default function InventoryView({ soldOnly = false }: { soldOnly?: boolean }) {
  const { t } = useT()
  const params = useSearchParams()
  const [sort, setSort] = useState<Sort>('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const num = (k: string) => {
    const v = params.get(k)
    return v ? Number(v) : undefined
  }

  const base = queryCars({
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

  const filtered = soldOnly ? base.filter((c) => c.status === 'sold') : base.filter((c) => c.status !== 'sold')
  const cars = applySort(filtered, sort)

  const SORTS: Sort[] = ['featured', 'priceAsc', 'priceDesc', 'yearNew', 'mileageLow']

  return (
    <div className="pt-[102px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>{soldOnly ? t('home.viewSold') : t('inv.eyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] display uppercase">{soldOnly ? t('badge.sold') : t('inv.title')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {!soldOnly && (
            <aside className="lg:w-72 shrink-0">
              <CarFilters />
            </aside>
          )}

          <div className="flex-1">
            {/* Control bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap mb-5 panel rounded-lg px-4 py-3">
              <p className="mono text-sm text-[var(--ink)]">
                {cars.length} <span className="text-[var(--ink-3)]">{cars.length === 1 ? t('inv.foundOne') : t('inv.found')}</span>
              </p>
              <div className="flex items-center gap-2">
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field" style={{ width: 'auto' }} aria-label={t('inv.sort')}>
                  {SORTS.map((s) => <option key={s} value={s}>{t(`sort.${s}`)}</option>)}
                </select>
                <div className="hidden sm:flex items-center gap-1 border border-[var(--border)] rounded-md p-0.5">
                  <button onClick={() => setView('grid')} className={cn('w-8 h-8 flex items-center justify-center rounded-sm transition-colors', view === 'grid' ? 'text-white' : 'text-[var(--ink-3)]')} style={view === 'grid' ? { background: 'var(--accent)' } : undefined} aria-label={t('inv.gridView')}>
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setView('list')} className={cn('w-8 h-8 flex items-center justify-center rounded-sm transition-colors', view === 'list' ? 'text-white' : 'text-[var(--ink-3)]')} style={view === 'list' ? { background: 'var(--accent)' } : undefined} aria-label={t('inv.listView')}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center panel rounded-lg">
                <p className="text-2xl font-bold text-[var(--ink)] mb-2 display">{t('inv.noResults')}</p>
                <p className="text-[var(--ink-3)] text-sm">{t('inv.noResultsSub')}</p>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {cars.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cars.map((c) => <CarRow key={c.id} car={c} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
