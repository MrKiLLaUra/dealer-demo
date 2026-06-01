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
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={18} className="text-[var(--accent)]" />
        <h2 className="font-semibold text-[var(--ink)] display">{t('fin.title')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">{t('fin.price')}</label>
          <div className="text-lg font-bold text-[var(--ink)]">{formatPrice(price)}</div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            {t('fin.deposit')} ({depositPct}%)
          </label>
          <input
            type="number"
            value={deposit}
            min={0}
            max={price}
            onChange={(e) => setDeposit(Math.min(price, Math.max(0, Number(e.target.value))))}
            className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            {t('fin.rate')} ({rate}%)
          </label>
          <input type="range" min={2} max={14} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1.5">
            {t('fin.term')} ({months} {t('fin.months')})
          </label>
          <input type="range" min={12} max={84} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        </div>
      </div>

      <div className="bg-[var(--bg-soft)] rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-1">{t('fin.estMonthly')}</div>
          <div className="text-3xl font-bold text-[var(--ink)] display">
            {formatPrice(Math.round(monthly))}
            <span className="text-base font-normal text-[var(--ink-3)]">{t('common.perMonth')}</span>
          </div>
        </div>
        <div className="text-right text-sm text-[var(--ink-3)]">
          <div>{t('fin.loan')}: {formatPrice(Math.max(0, price - deposit))}</div>
          <div>{t('fin.total')}: {formatPrice(Math.round(monthly * months))}</div>
        </div>
      </div>

      <p className="text-xs text-[var(--ink-3)] mt-3">{t('fin.disclaimer')}</p>
    </div>
  )
}
