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
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200"
        style={{ borderBottom: '1px solid var(--border)', boxShadow: scrolled ? '0 1px 12px rgba(13,16,23,0.08)' : 'none' }}
      >
        {/* Demo ribbon */}
        <a
          href={DEMO.studioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-[var(--banner-h)] px-4 text-center text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--surface-dark)' }}
        >
          <span className="text-[11px] sm:text-xs font-medium tracking-tight">
            <span className="opacity-60">Live demo</span> · Like it? Get a site like this from {DEMO.studioName}
          </span>
          <ArrowUpRight size={13} className="shrink-0 opacity-80" />
        </a>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold display" style={{ background: 'var(--accent)' }}>
              LC
            </span>
            <span className="font-bold text-[16px] tracking-tight display" style={{ color: 'var(--ink)' }}>
              {DEMO.brand}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive(l.href) ? 'var(--ink)' : 'transparent',
                  color: isActive(l.href) ? 'white' : 'var(--ink-2)',
                }}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />
            <Link
              href="/contact"
              className="px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              {t('nav.bookTestDrive')}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              style={{ color: 'var(--ink-2)' }}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen slide-down */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 flex flex-col pt-[102px] px-6 pb-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
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
              className={cn(
                'flex items-center justify-between py-4 text-2xl font-bold tracking-tight display transition-all duration-500',
                open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              )}
              style={{
                color: isActive(l.href) ? 'var(--accent)' : 'var(--ink)',
                borderBottom: '1px solid var(--border)',
                transitionDelay: open ? `${120 + i * 55}ms` : '0ms',
              }}
            >
              {t(l.key)}
              <ArrowUpRight size={20} style={{ color: isActive(l.href) ? 'var(--accent)' : 'var(--ink-3)' }} />
            </Link>
          ))}
        </nav>

        <div
          className={cn('mt-auto flex flex-col gap-3 transition-all duration-500', open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}
          style={{ transitionDelay: open ? `${120 + LINKS.length * 55 + 80}ms` : '0ms' }}
        >
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="w-full py-4 text-center text-base font-bold text-white rounded-xl"
            style={{ background: 'var(--accent)' }}
          >
            {t('nav.bookTestDrive')}
          </Link>
          <a
            href={`tel:${DEMO.phone.replace(/\s/g, '')}`}
            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium rounded-xl"
            style={{ border: '1.5px solid var(--border)', color: 'var(--ink-2)' }}
          >
            <Phone size={15} /> {DEMO.phone}
          </a>
        </div>
      </div>
    </>
  )
}
