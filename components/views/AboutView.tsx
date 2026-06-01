'use client'

import Link from 'next/link'
import { ShieldCheck, Wallet, BadgeCheck, RefreshCw } from 'lucide-react'
import { CARS, getMakes } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import { DEMO } from '@/lib/demo'

export default function AboutView() {
  const { t } = useT()
  const inStock = CARS.filter((c) => c.status === 'available').length
  const brands = getMakes().length

  const WHY = [
    { icon: ShieldCheck, label: t('home.why.inspected'), sub: t('home.why.inspectedSub') },
    { icon: Wallet, label: t('home.why.finance'), sub: t('home.why.financeSub') },
    { icon: BadgeCheck, label: t('home.why.warranty'), sub: t('home.why.warrantySub') },
    { icon: RefreshCw, label: t('home.why.tradein'), sub: t('home.why.tradeinSub') },
  ]

  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'var(--surface-dark)' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--accent-light)' }}>{t('nav.about')}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white display max-w-2xl">{t('home.whyTitle')}</h1>
          <p className="text-white/65 max-w-xl text-lg leading-relaxed">{t('home.whyBody')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: String(inStock), label: t('hero.stat.inStock') },
            { value: '900+', label: t('hero.stat.sold') },
            { value: String(brands), label: t('hero.stat.brands') },
            { value: '12', label: t('hero.stat.years') },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-[var(--ink)] display">{s.value}</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why cards */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white border border-[var(--border)] rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--bg-soft)' }}>
                <Icon size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <p className="font-semibold text-sm text-[var(--ink)]">{label}</p>
              <p className="text-xs mt-0.5 text-[var(--ink-3)]">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-white display" style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>{t('home.ctaTitle')}</h2>
            <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{t('home.ctaSub')}</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/inventory" className="px-6 py-3 text-sm font-bold rounded-xl bg-white" style={{ color: 'var(--accent)' }}>{t('common.browseAll')}</Link>
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-semibold text-white rounded-xl" style={{ border: '1.5px solid rgba(255,255,255,0.4)' }}>{DEMO.studioName} ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}
