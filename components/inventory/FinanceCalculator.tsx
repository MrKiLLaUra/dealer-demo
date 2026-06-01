'use client'

import { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'
import { calcMonthly, formatPrice } from '@/lib/utils'
import { useT } from '@/lib/i18n/context'

export default function FinanceCalculator({ price }: { price: number }) {
  const { t } = useT()
  const [deposit, setDeposit] = useState(Math.round(price * 0.1))
  const [months, setMonths] = useState(60)
  const [rate, setRate] = useState(6.9)

  const monthly = useMemo(() => calcMonthly(price, deposit, rate, months), [price, deposit, rate, months])
  const depositPct = Math.round((deposit / price) * 100)

  return (
    <div className="panel rounded-lg p-6">
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={18} style={{ color: 'var(--accent)' }} />
        <h2 className="font-semibold text-[var(--ink)] display uppercase tracking-wide text-lg">{t('fin.title')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="eyebrow block mb-1.5">{t('fin.price')}</label>
          <div className="mono text-lg font-semibold text-[var(--ink)]">{formatPrice(price)}</div>
        </div>
        <div>
          <label className="eyebrow block mb-1.5">{t('fin.deposit')} ({depositPct}%)</label>
          <input type="number" value={deposit} min={0} max={price} onChange={(e) => setDeposit(Math.min(price, Math.max(0, Number(e.target.value))))} className="field" />
        </div>
        <div>
          <label className="eyebrow block mb-1.5">{t('fin.rate')} ({rate}%)</label>
          <input type="range" min={2} max={14} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </div>
        <div>
          <label className="eyebrow block mb-1.5">{t('fin.term')} ({months} {t('fin.months')})</label>
          <input type="range" min={12} max={84} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </div>
      </div>

      <div className="rounded-md p-4 flex items-center justify-between flex-wrap gap-3" style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
        <div>
          <div className="eyebrow mb-1">{t('fin.estMonthly')}</div>
          <div className="mono text-3xl font-semibold text-[var(--ink)]">
            {formatPrice(Math.round(monthly))}<span className="text-base font-normal text-[var(--ink-3)]">{t('common.perMonth')}</span>
          </div>
        </div>
        <div className="mono text-right text-sm text-[var(--ink-3)]">
          <div>{t('fin.loan')}: {formatPrice(Math.max(0, price - deposit))}</div>
          <div>{t('fin.total')}: {formatPrice(Math.round(monthly * months))}</div>
        </div>
      </div>

      <p className="text-xs text-[var(--ink-3)] mt-3">{t('fin.disclaimer')}</p>
    </div>
  )
}
