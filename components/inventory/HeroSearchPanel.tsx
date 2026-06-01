'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import { getMakes } from '@/lib/data'

const BODIES = ['suv', 'sedan', 'hatchback', 'coupe', 'estate', 'convertible', 'pickup']
const PRICES = [10000, 20000, 30000, 50000, 80000, 150000]

export default function HeroSearchPanel() {
  const { t } = useT()
  const router = useRouter()
  const [make, setMake] = useState('')
  const [body, setBody] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (make) p.set('make', make)
    if (body) p.set('body', body)
    if (maxPrice) p.set('maxPrice', maxPrice)
    router.push(`/inventory?${p.toString()}`)
  }

  return (
    <form
      onSubmit={go}
      className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2.5 p-3 rounded-lg"
      style={{ background: 'rgba(8,10,13,0.55)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.14)' }}
    >
      <select value={make} onChange={(e) => setMake(e.target.value)} className="field">
        <option value="">{t('filter.anyMake')}</option>
        {getMakes().map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select value={body} onChange={(e) => setBody(e.target.value)} className="field">
        <option value="">{t('filter.anyBody')}</option>
        {BODIES.map((b) => <option key={b} value={b}>{t(`body.${b}`)}</option>)}
      </select>
      <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="field">
        <option value="">{t('filter.price')}</option>
        {PRICES.map((p) => <option key={p} value={p}>{t('common.max')} €{p / 1000}k</option>)}
      </select>
      <button type="submit" className="btn btn-accent px-6 py-3 mono text-xs uppercase tracking-wide">
        <Search size={16} /> {t('common.search')}
      </button>
    </form>
  )
}
