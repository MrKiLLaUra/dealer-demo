'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Locale } from '@/lib/types'
import { DICT } from './dictionaries'

const KEY = 'lc_locale'
const VALID: Locale[] = ['en', 'ru', 'el']

interface Ctx {
  locale: Locale
  setLocale: (l: Locale) => void
  /** Translate a key, with optional {var} interpolation. Falls back to EN, then the key. */
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LangContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  // Restore saved preference after mount (server always renders EN, so hydration matches).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Locale | null
      if (saved && VALID.includes(saved)) setLocaleState(saved)
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = DICT[locale][key] ?? DICT.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v))
      }
      return s
    },
    [locale]
  )

  return <LangContext.Provider value={{ locale, setLocale, t }}>{children}</LangContext.Provider>
}

export function useT() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useT must be used within <LanguageProvider>')
  return ctx
}
