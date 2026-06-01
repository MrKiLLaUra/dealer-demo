'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import { LOCALES } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const current = LOCALES.find((l) => l.code === locale)!

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--bg-soft)]"
        style={{ color: 'var(--ink-2)' }}
        aria-label="Language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span>{current.short}</span>
        <ChevronDown size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-[var(--border)] shadow-lg overflow-hidden z-[60]"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code)
                setOpen(false)
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors hover:bg-[var(--bg-soft)] text-left"
              style={{ color: l.code === locale ? 'var(--accent)' : 'var(--ink-2)', fontWeight: l.code === locale ? 600 : 500 }}
            >
              <span className="flex items-center gap-2">
                <span className="text-[11px] font-bold w-6 text-[var(--ink-3)]">{l.short}</span>
                {l.label}
              </span>
              {l.code === locale && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
