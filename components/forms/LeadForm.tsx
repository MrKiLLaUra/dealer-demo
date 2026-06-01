'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

export interface Field {
  name: string
  label: string
  type?: 'text' | 'tel' | 'email' | 'number' | 'date' | 'textarea'
  required?: boolean
  half?: boolean
}

export default function LeadForm({ groups, submitLabel }: { groups: { heading: string; fields: Field[] }[]; submitLabel: string }) {
  const { t } = useT()
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const required = groups.flatMap((g) => g.fields).filter((f) => f.required)
  const valid = required.every((f) => (values[f.name] || '').trim().length > 0)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 700)
  }

  if (done) {
    return (
      <div className="panel rounded-lg p-10 flex flex-col items-center gap-4 text-center">
        <CheckCircle size={44} style={{ color: 'var(--accent)' }} />
        <div>
          <p className="text-xl font-semibold text-[var(--ink)] display uppercase">{t('enq.successTitle')}</p>
          <p className="text-sm text-[var(--ink-3)] mt-1 max-w-sm">{t('enq.successBody')}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="panel rounded-lg p-6 sm:p-8 flex flex-col gap-7">
      {groups.map((g) => (
        <div key={g.heading}>
          <h3 className="eyebrow mb-4">{g.heading}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {g.fields.map((f) => (
              <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
                <label className="block text-xs font-medium text-[var(--ink-2)] mb-1.5">
                  {f.label} {f.required && <span style={{ color: 'var(--accent)' }}>*</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea rows={3} value={values[f.name] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} className="field resize-none" />
                ) : (
                  <input type={f.type || 'text'} value={values[f.name] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} className="field" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <button type="submit" disabled={loading} className="btn btn-accent w-full sm:w-auto px-8 py-3 disabled:opacity-70">
          {loading ? <><Loader2 size={15} className="animate-spin" /> {t('common.sending')}</> : submitLabel}
        </button>
        <p className="text-xs text-[var(--ink-3)] mt-3">{t('common.demoNote')}</p>
      </div>
    </form>
  )
}
