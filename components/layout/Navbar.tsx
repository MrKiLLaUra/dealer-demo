'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react'
import { DEMO } from '@/lib/demo'
import { useT } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import LanguageToggle from '@/components/i18n/LanguageToggle'

const LINKS = [
  { href: '/inventory', key: 'nav.inventory' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/trade-in', key: 'nav.tradeIn' },
  { href: '/import', key: 'nav.import' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useT()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h, { passive: true })
    h()
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(10,12,15,0.85)' : 'rgba(10,12,15,0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Demo ribbon */}
        <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 h-[var(--banner-h)] px-4 text-center text-white transition-opacity hover:opacity-90" style={{ background: 'var(--surface-dark)' }}>
          <span className="mono text-[10px] uppercase tracking-[0.14em]">
            <span className="opacity-50">Live demo</span> — Get a site like this from {DEMO.studioName}
          </span>
          <ArrowUpRight size={12} className="shrink-0 opacity-70" />
        </a>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-8 h-8 flex items-center justify-center text-white text-[13px] font-bold display rounded-sm" style={{ background: 'var(--accent)' }}>LC</span>
            <span className="font-semibold text-[16px] tracking-tight display uppercase text-[var(--ink)]">{DEMO.brand}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mono text-[11px] uppercase tracking-[0.12em] transition-colors relative py-1"
                style={{ color: isActive(l.href) ? 'var(--ink)' : 'var(--ink-3)' }}
              >
                {t(l.key)}
                {isActive(l.href) && <span className="absolute left-0 -bottom-0.5 w-full h-[2px]" style={{ background: 'var(--accent)' }} />}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link href="/contact" className="btn btn-accent px-4 py-2.5 mono text-[11px] uppercase tracking-[0.1em]">{t('nav.bookTestDrive')}</Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <LanguageToggle />
            <button onClick={() => setOpen((o) => !o)} className="w-10 h-10 flex items-center justify-center text-[var(--ink)]" aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 flex flex-col pt-[100px] px-6 pb-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
          open ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'
        )}
        style={{ background: 'var(--bg)' }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col mt-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn('flex items-center justify-between py-4 text-3xl font-semibold display uppercase transition-all duration-500', open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6')}
              style={{ color: isActive(l.href) ? 'var(--accent)' : 'var(--ink)', borderBottom: '1px solid var(--border)', transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
            >
              {t(l.key)}
              <ArrowUpRight size={20} style={{ color: isActive(l.href) ? 'var(--accent)' : 'var(--ink-3)' }} />
            </Link>
          ))}
        </nav>

        <div className={cn('mt-auto flex flex-col gap-3 transition-all duration-500', open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{ transitionDelay: open ? `${120 + LINKS.length * 55 + 80}ms` : '0ms' }}>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-accent w-full py-4 text-base uppercase tracking-wide">{t('nav.bookTestDrive')}</Link>
          <a href={`tel:${DEMO.phone.replace(/\s/g, '')}`} className="btn btn-ghost w-full py-3.5 mono text-sm"><Phone size={15} /> {DEMO.phone}</a>
        </div>
      </div>
    </>
  )
}
