'use client'

import { Check } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import LeadForm, { type Field } from '@/components/forms/LeadForm'

export default function ImportView() {
  const { t } = useT()

  const groups = [
    {
      heading: t('import.eyebrow'),
      fields: [
        { name: 'makeModel', label: t('import.makeModel'), required: true },
        { name: 'budget', label: t('import.budget'), type: 'number', half: true },
        { name: 'yearFrom', label: t('import.yearFrom'), type: 'number', half: true },
        { name: 'notes', label: t('import.notes'), type: 'textarea' },
      ] as Field[],
    },
    {
      heading: t('trade.yourDetails'),
      fields: [
        { name: 'name', label: t('enq.name'), required: true, half: true },
        { name: 'phone', label: t('enq.phone'), type: 'tel', required: true, half: true },
        { name: 'email', label: t('enq.emailOpt'), type: 'email' },
      ] as Field[],
    },
  ]

  const caps = [t('import.c1'), t('import.c2'), t('import.c3')]

  return (
    <div className="pt-[100px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>{t('import.eyebrow')}</p>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[var(--ink)] display uppercase leading-none">{t('import.title')}</h1>
          <p className="text-[var(--ink-3)] mt-3 max-w-xl">{t('import.sub')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div>
          <p className="eyebrow mb-7" style={{ color: 'var(--accent)' }}>{t('import.what')}</p>
          <div className="flex flex-col">
            {caps.map((c, i) => (
              <div key={i} className="flex items-center gap-4 py-6 border-t border-[var(--border)]">
                <span className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}><Check size={18} /></span>
                <p className="text-lg text-[var(--ink)] display uppercase leading-snug">{c}</p>
              </div>
            ))}
          </div>
        </div>

        <LeadForm groups={groups} submitLabel={t('import.submit')} />
      </div>
    </div>
  )
}
