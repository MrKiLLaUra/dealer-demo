'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Plus } from 'lucide-react'
import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'
import { formatPrice, formatNumber } from '@/lib/utils'

export default function CompareClient({ cars }: { cars: Car[] }) {
  const { t } = useT()
  const [selected, setSelected] = useState<Car[]>([])
  const [search, setSearch] = useState('')

  const available = cars.filter(
    (c) => !selected.find((s) => s.id === c.id) && `${c.make} ${c.model} ${c.variant}`.toLowerCase().includes(search.toLowerCase())
  )
  const add = (c: Car) => selected.length < 3 && setSelected((s) => [...s, c])
  const remove = (id: string) => setSelected((s) => s.filter((c) => c.id !== id))

  const ROWS: { label: string; render: (c: Car) => string }[] = [
    { label: t('spec.year'), render: (c) => String(c.year) },
    { label: t('spec.mileage'), render: (c) => `${formatNumber(c.mileage)} km` },
    { label: t('spec.fuel'), render: (c) => t(`fuel.${c.fuel}`) },
    { label: t('spec.transmission'), render: (c) => t(`transmission.${c.transmission}`) },
    { label: t('spec.body'), render: (c) => t(`body.${c.body}`) },
    { label: t('spec.drivetrain'), render: (c) => t(`drivetrain.${c.drivetrain}`) },
    { label: t('spec.engine'), render: (c) => (c.engine_l ? `${c.engine_l.toFixed(1)} L` : '—') },
    { label: t('spec.power'), render: (c) => `${c.power_hp} ${t('spec.hp')}` },
    { label: t('spec.seats'), render: (c) => String(c.seats) },
    { label: t('spec.co2'), render: (c) => `${c.co2} g/km` },
    { label: t('spec.color'), render: (c) => c.color },
    { label: t('spec.condition'), render: (c) => t(`condition.${c.condition}`) },
    { label: t('spec.ref'), render: (c) => c.ref },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-8">
      <div className="panel rounded-lg p-5">
        <p className="eyebrow mb-3">{t('cmp.add')}</p>
        <input type="text" placeholder={t('cmp.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="field max-w-md mb-4" />
        <div className="flex flex-wrap gap-2">
          {available.slice(0, 20).map((c) => (
            <button key={c.id} onClick={() => add(c)} disabled={selected.length >= 3} className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[var(--border)] text-sm text-[var(--ink-2)] hover:border-[var(--border-2)] hover:text-[var(--ink)] disabled:opacity-40 transition-colors">
              <Plus size={13} /> {c.make} {c.model}
            </button>
          ))}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl font-semibold text-[var(--ink)] mb-2 display uppercase">{t('cmp.empty')}</p>
          <p className="text-sm text-[var(--ink-3)]">{t('cmp.emptySub')}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-32 text-left pb-4" />
                {selected.map((c) => (
                  <th key={c.id} className="text-left pb-4 px-3 min-w-[200px]">
                    <div className="panel rounded-lg overflow-hidden">
                      <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url("${c.images[0]}")` }} />
                      <div className="p-3">
                        <div className="display font-semibold text-[var(--ink)] text-sm leading-snug">{c.make} {c.model}</div>
                        <div className="text-xs text-[var(--ink-3)]">{c.variant}</div>
                        <div className="mono text-base font-semibold text-[var(--ink)] mt-1">{formatPrice(c.price)}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <Link href={`/inventory/${c.slug}`} className="mono text-[11px] uppercase" style={{ color: 'var(--accent)' }}>{t('common.viewDetails')} →</Link>
                          <button onClick={() => remove(c.id)} className="text-[var(--ink-3)] hover:text-[var(--accent)] transition-colors"><X size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? 'var(--panel)' : 'transparent' }}>
                  <td className="py-3 pr-4 pl-3 eyebrow rounded-l-sm">{row.label}</td>
                  {selected.map((c) => (
                    <td key={c.id} className="py-3 px-3 mono text-sm text-[var(--ink)]">{row.render(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
