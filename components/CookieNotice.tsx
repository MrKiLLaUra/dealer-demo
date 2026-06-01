'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

const KEY = 'lc_cookie_ack'

export default function CookieNotice() {
  const { t } = useT()
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[150] w-[calc(100%-2rem)] max-w-sm">
      <div className="rounded-lg bg-[var(--panel)] border border-[var(--border-2)] shadow-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Cookie size={16} className="text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--ink)]">{t('cookie.title')}</span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--ink-2)]">
          {t('cookie.body')}{' '}
          <Link href="/legal" className="text-[var(--accent)] font-medium underline underline-offset-2">
            {t('cookie.learnMore')}
          </Link>
        </p>
        <button
          onClick={accept}
          className="mt-4 w-full py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-dark)] transition-colors"
        >
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  )
}
