'use client'

import { CARS } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import CompareClient from '@/components/inventory/CompareClient'

export default function CompareView() {
  const { t } = useT()
  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>{t('cmp.eyebrow')}</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] display uppercase">{t('cmp.title')}</h1>
          <p className="text-[var(--ink-3)] mt-2 text-sm">{t('cmp.sub')}</p>
        </div>
      </div>
      <CompareClient cars={CARS} />
    </div>
  )
}
