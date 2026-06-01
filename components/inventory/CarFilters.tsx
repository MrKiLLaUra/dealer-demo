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
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="eyebrow block mb-2">{children}</label>
  )

  const Select = ({ k, label, any, options, render }: { k: string; label: string; any: string; options: string[]; render?: (o: string) => string }) => (
    <div>
      <Label>{label}</Label>
      <select value={val(k) || 'all'} onChange={(e) => update(k, e.target.value)} className="field">
        <option value="all">{any}</option>
        {options.map((o) => <option key={o} value={o}>{render ? render(o) : o}</option>)}
      </select>
    </div>
  )

  return (
    <div className="panel rounded-lg p-5 flex flex-col gap-5 sticky top-[120px]">
      <div>
        <Label>{t('filter.search')}</Label>
        <input
          type="text"
          defaultValue={val('search')}
          placeholder={t('hero.searchPlaceholder')}
          onBlur={(e) => update('search', e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') update('search', (e.target as HTMLInputElement).value) }}
          className="field"
        />
      </div>

      <Select k="make" label={t('filter.make')} any={t('filter.anyMake')} options={getMakes()} />
      <Select k="body" label={t('filter.body')} any={t('filter.anyBody')} options={BODIES} render={(o) => t(`body.${o}`)} />
      <Select k="fuel" label={t('filter.fuel')} any={t('filter.anyFuel')} options={FUELS} render={(o) => t(`fuel.${o}`)} />
      <Select k="transmission" label={t('filter.transmission')} any={t('filter.anyTransmission')} options={TRANS} render={(o) => t(`transmission.${o}`)} />
      <Select k="condition" label={t('filter.condition')} any={t('common.all')} options={CONDS} render={(o) => t(`condition.${o}`)} />
      <Select k="color" label={t('filter.color')} any={t('filter.anyColor')} options={getColors()} />

      <div>
        <Label>{t('filter.price')}</Label>
        <div className="flex gap-2">
          <input type="number" placeholder={t('common.min')} defaultValue={val('minPrice')} onBlur={(e) => update('minPrice', e.target.value)} className="field" />
          <input type="number" placeholder={t('common.max')} defaultValue={val('maxPrice')} onBlur={(e) => update('maxPrice', e.target.value)} className="field" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>{t('filter.yearFrom')}</Label>
          <input type="number" placeholder="2018" defaultValue={val('minYear')} onBlur={(e) => update('minYear', e.target.value)} className="field" />
        </div>
        <div>
          <Label>{t('filter.maxMileage')}</Label>
          <input type="number" placeholder="100000" defaultValue={val('maxMileage')} onBlur={(e) => update('maxMileage', e.target.value)} className="field" />
        </div>
      </div>

      <button onClick={() => router.push(pathname, { scroll: false })} className="btn btn-ghost w-full py-3 mono text-xs uppercase tracking-wide">
        <RotateCcw size={13} /> {t('common.reset')}
      </button>
    </div>
  )
}
