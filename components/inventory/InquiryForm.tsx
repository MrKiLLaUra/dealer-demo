'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export default function InquiryForm({ defaultType = 'test_drive' }: { defaultType?: 'inquiry' | 'test_drive' }) {
  const { t } = useT()
  const [type, setType] = useState<'inquiry' | 'test_drive'>(defaultType)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', date: '', time: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    // Demo: simulate the round-trip; nothing is sent or stored.
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 600)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle size={32} className="text-[var(--accent)]" />
        <div>
          <p className="font-semibold text-[var(--ink)]">{t('enq.successTitle')}</p>
          <p className="text-sm text-[var(--ink-3)] mt-1">{t('enq.successBody')}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <h3 className="font-semibold text-sm text-[var(--ink)]">{type === 'test_drive' ? t('td.title') : t('enq.title')}</h3>

      <div className="grid grid-cols-2 gap-1.5">
        {(['test_drive', 'inquiry'] as const).map((ty) => (
          <button
            key={ty}
            type="button"
            onClick={() => setType(ty)}
            className={cn('text-xs py-2 px-2 rounded-lg font-medium border transition-colors', type === ty ? 'text-white' : 'text-[var(--ink-2)] hover:bg-[var(--bg-soft)]')}
            style={type === ty ? { background: 'var(--ink)', borderColor: 'var(--ink)' } : { borderColor: 'var(--border)' }}
          >
            {t(`enq.type.${ty}`)}
          </button>
        ))}
      </div>

      <input required type="text" placeholder={t('enq.name')} value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white" />
      <input required type="tel" placeholder={t('enq.phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white" />
      <input type="email" placeholder={t('enq.emailOpt')} value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white" />

      {type === 'test_drive' && (
        <div className="flex gap-2">
          <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => set('date', e.target.value)} className="flex-1 text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white" />
          <select value={form.time} onChange={(e) => set('time', e.target.value)} className="flex-1 text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white">
            <option value="">{t('td.selectTime')}</option>
            {TIMES.map((tm) => <option key={tm} value={tm}>{tm}</option>)}
          </select>
        </div>
      )}

      {type === 'inquiry' && (
        <textarea placeholder={t('enq.message')} value={form.message} onChange={(e) => set('message', e.target.value)} rows={3} className="w-full text-sm px-3 py-2.5 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--accent)] bg-white resize-none" />
      )}

      <button type="submit" disabled={loading} className="w-full py-3 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70" style={{ background: 'var(--accent)' }}>
        {loading ? <><Loader2 size={14} className="animate-spin" /> {t('common.sending')}</> : type === 'test_drive' ? t('td.book') : t('enq.send')}
      </button>
      <p className="text-[11px] text-center text-[var(--ink-3)]">{t('common.demoNote')}</p>
    </form>
  )
}
