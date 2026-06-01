'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { DEMO } from '@/lib/demo'
import { useT } from '@/lib/i18n/context'

const LINKS = [
  { href: '/inventory', key: 'nav.inventory' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/trade-in', key: 'nav.tradeIn' },
  { href: '/import', key: 'nav.import' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
]

export default function Footer() {
  const { t } = useT()
  return (
    <footer style={{ background: 'var(--surface-dark)', color: 'rgba(255,255,255,0.65)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold display" style={{ background: 'var(--accent)' }}>
                LC
              </span>
              <span className="font-bold text-white text-[17px] tracking-tight display">{DEMO.brand}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase mb-5" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase mb-5" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>
              {t('footer.contact')}
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: Phone, text: DEMO.phone, href: `tel:${DEMO.phone.replace(/\s/g, '')}` },
                { Icon: Mail, text: DEMO.email, href: `mailto:${DEMO.email}` },
                { Icon: MapPin, text: DEMO.address, href: '#' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a href={href} className="flex items-start gap-3 text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <Icon size={14} className="mt-0.5 shrink-0" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="pt-10 text-xs leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {DEMO.disclaimer}
        </p>

        <div
          className="flex flex-col sm:flex-row justify-between gap-3 pt-8 mt-8 text-xs"
          style={{ color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span>© {new Date().getFullYear()} {DEMO.brand} — {t('footer.rights')}</span>
          <span className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-white transition-colors">{t('footer.legal')}</Link>
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t('footer.builtBy')} {DEMO.studioName} ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
