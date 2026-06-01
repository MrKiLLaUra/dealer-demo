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

  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent)' }}>{t('trade.eyebrow')}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)] display">{t('trade.title')}</h1>
          <p className="text-[var(--ink-3)] mt-2 max-w-xl">{t('trade.sub')}</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-12">
        <LeadForm groups={groups} submitLabel={t('trade.submit')} />
      </div>
    </div>
  )
}
