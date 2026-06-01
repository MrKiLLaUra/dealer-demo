'use client'

import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

// Site-wide safety net for a public demo: intercept every phone / email /
// WhatsApp click, cancel it, and show a notice instead. Server components can
// keep rendering ordinary <a> tags — they are neutralised here in one place.
const BLOCKED = ['tel:', 'mailto:', 'sms:', 'wa.me', 'api.whatsapp.com', 'whatsapp:']

export default function DemoGuard() {
  const { t } = useT()
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      const href = (anchor.getAttribute('href') || '').toLowerCase()
      if (href && BLOCKED.some((b) => href.startsWith(b) || href.includes(b))) {
        e.preventDefault()
        e.stopPropagation()
        setShow(true)
        clearTimeout(timer)
        timer = setTimeout(() => setShow(false), 3600)
      }
    }
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      clearTimeout(timer)
    }
  }, [])

  if (!show) return null

  return (
    <div role="status" className="fixed left-1/2 bottom-6 z-[200] -translate-x-1/2 px-2 w-[calc(100%-2rem)] max-w-md">
      <div className="flex items-start gap-3 rounded-xl bg-[var(--surface-dark)] text-white shadow-2xl px-4 py-3">
        <Info size={18} className="mt-0.5 shrink-0 text-[var(--accent-light)]" />
        <p className="text-sm leading-snug">{t('guard.toast')}</p>
      </div>
    </div>
  )
}
