'use client'

import { useT } from '@/lib/i18n/context'
import LeadForm, { type Field } from '@/components/forms/LeadForm'

export default function TradeInView() {
  const { t } = useT()

  const groups = [
    {
      heading: t('trade.carDetails'),
      fields: [
        { name: 'plate', label: t('trade.plate'), half: true },
        { name: 'year', label: t('trade.year'), type: 'number', half: true },
        { name: 'make', label: t('trade.make'), half: true },
        { name: 'model', label: t('trade.model'), half: true },
        { name: 'mileage', label: t('trade.mileage'), type: 'number', half: true },
        { name: 'condition', label: t('trade.condition'), half: true },
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

  const steps = [t('trade.h1'), t('trade.h2'), t('trade.h3')]

  return (
    <div className="pt-[100px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>{t('trade.eyebrow')}</p>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[var(--ink)] display uppercase leading-none">{t('trade.title')}</h1>
          <p className="text-[var(--ink-3)] mt-3 max-w-xl">{t('trade.sub')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
        {/* Rail */}
        <div>
          <p className="eyebrow mb-7" style={{ color: 'var(--accent)' }}>{t('trade.how')}</p>
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-5 py-6 border-t border-[var(--border)]">
                <span className="mono text-3xl font-semibold shrink-0" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="text-lg text-[var(--ink)] display uppercase leading-snug pt-1">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <LeadForm groups={groups} submitLabel={t('trade.submit')} />
      </div>
    </div>
  )
}
