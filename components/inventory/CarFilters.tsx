'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import { getMakes, getColors } from '@/lib/data'

const BODIES = ['suv', 'sedan', 'hatchback', 'coupe', 'estate', 'convertible', 'pickup']
const FUELS = ['petrol', 'diesel', 'hybrid', 'plug_in_hybrid', 'electric']
const TRANS = ['automatic', 'manual']
const CONDS = ['new', 'used', 'demo']

export default function CarFilters() {
  const { t } = useT()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const makes = getMakes()
  const colors = getColors()

  const update = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(params.toString())
      if (!value || value === 'all') p.delete(key)
      else p.set(key, value)
      router.push(`${pathname}?${p.toString()}`, { scroll: false })
    },
    [params, pathname, router]
  )

  const val = (k: string) => params.get(k) || ''

  const Select = ({ k, label, any, options, render }: { k: string; label: string; any: string; options: string[]; render?: (o: string) => string }) => (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink-3)] mb-2">{label}</label>
      <select
        value={val(k) || 'all'}
        onChange={(e) => update(k, e.target.value)}
        className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white text-[var(--ink)]"
      >
        <option value="all">{any}</option>
        {options.map((o) => (
          <option key={o} value={o}>{render ? render(o) : o}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5 flex flex-col gap-5 sticky top-[122px]">
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink-3)] mb-2">{t('filter.search')}</label>
        <input
          type="text"
          defaultValue={val('search')}
          placeholder={t('hero.searchPlaceholder')}
          onBlur={(e) => update('search', e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') update('search', (e.target as HTMLInputElement).value) }}
          className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white"
        />
      </div>

      <Select k="make" label={t('filter.make')} any={t('filter.anyMake')} options={makes} />
      <Select k="body" label={t('filter.body')} any={t('filter.anyBody')} options={BODIES} render={(o) => t(`body.${o}`)} />
      <Select k="fuel" label={t('filter.fuel')} any={t('filter.anyFuel')} options={FUELS} render={(o) => t(`fuel.${o}`)} />
      <Select k="transmission" label={t('filter.transmission')} any={t('filter.anyTransmission')} options={TRANS} render={(o) => t(`transmission.${o}`)} />
      <Select k="condition" label={t('filter.condition')} any={t('common.all')} options={CONDS} render={(o) => t(`condition.${o}`)} />
      <Select k="color" label={t('filter.color')} any={t('filter.anyColor')} options={colors} />

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink-3)] mb-2">{t('filter.price')}</label>
        <div className="flex gap-2">
          <input type="number" placeholder={t('common.min')} defaultValue={val('minPrice')} onBlur={(e) => update('minPrice', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white" />
          <input type="number" placeholder={t('common.max')} defaultValue={val('maxPrice')} onBlur={(e) => update('maxPrice', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink-3)] mb-2">{t('filter.yearFrom')}</label>
          <input type="number" placeholder="2018" defaultValue={val('minYear')} onBlur={(e) => update('minYear', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white" />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink-3)] mb-2">{t('filter.maxMileage')}</label>
          <input type="number" placeholder="100000" defaultValue={val('maxMileage')} onBlur={(e) => update('maxMileage', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-xl outline-none focus:border-[var(--accent)] bg-white" />
        </div>
      </div>

      <button onClick={() => router.push(pathname, { scroll: false })} className="flex items-center justify-center gap-2 w-full py-3 border border-[var(--border)] rounded-xl text-sm text-[var(--ink-2)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
        <RotateCcw size={13} /> {t('common.reset')}
      </button>
    </div>
  )
}
