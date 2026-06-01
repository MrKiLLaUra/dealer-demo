'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

export default function HeroSearch() {
  const { t } = useT()
  const router = useRouter()
  const [q, setQ] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q) p.set('search', q)
    router.push(`/inventory?${p.toString()}`)
  }

  return (
    <form onSubmit={submit} className="w-full max-w-[600px] rounded-xl overflow-hidden flex" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.3)', background: 'white' }}>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('hero.searchPlaceholder')}
        className="flex-1 px-4 py-4 text-sm outline-none bg-white min-w-0"
        style={{ color: 'var(--ink)' }}
      />
      <button type="submit" className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-white shrink-0" style={{ background: 'var(--accent)' }}>
        <Search size={15} />
        <span className="hidden sm:inline">{t('common.search')}</span>
      </button>
    </form>
  )
}
