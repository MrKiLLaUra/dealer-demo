'use client'

import Link from 'next/link'
import { CARS, getMakes } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import { DEMO } from '@/lib/demo'

export default function AboutView() {
  const { t } = useT()
  const inStock = CARS.filter((c) => c.status === 'available').length
  const brands = getMakes().length

  const stats = [
    { value: String(inStock), label: t('hero.stat.inStock') },
    { value: '900+', label: t('hero.stat.sold') },
    { value: String(brands), label: t('hero.stat.brands') },
    { value: '12', label: t('hero.stat.years') },
  ]
  const steps = [
    { t: t('about.s1t'), s: t('about.s1s') },
    { t: t('about.s2t'), s: t('about.s2s') },
    { t: t('about.s3t'), s: t('about.s3s') },
    { t: t('about.s4t'), s: t('about.s4s') },
  ]

  return (
    <div className="pt-[100px] min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Editorial hero */}
      <div className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=2000&q=80")', filter: 'grayscale(1) brightness(0.4)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg), rgba(10,12,15,0.5))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-24">
          <p className="eyebrow mb-5" style={{ color: 'var(--accent)' }}>{t('nav.about')} — {DEMO.brand}</p>
          <h1 className="font-semibold text-white display uppercase leading-[0.92] mb-6" style={{ fontSize: 'clamp(44px, 8vw, 104px)', maxWidth: 900 }}>{t('home.whyTitle')}</h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560 }}>{t('about.lead')}</p>
        </div>
      </div>

      {/* Oversized stats — hairline separated, no cards */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-12 ${i > 0 ? 'lg:border-l border-[var(--border)] lg:pl-10' : ''}`}>
              <div className="mono text-5xl sm:text-6xl font-semibold text-[var(--ink)] leading-none">{s.value}</div>
              <div className="eyebrow mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Numbered process */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex items-baseline gap-3 mb-12">
          <span className="mono text-sm" style={{ color: 'var(--accent)' }}>04</span>
          <h2 className="font-semibold text-[var(--ink)] display uppercase" style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}>{t('about.process')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-5 py-7 border-t border-[var(--border)]">
              <span className="mono text-2xl font-semibold shrink-0" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-semibold text-xl text-[var(--ink)] display uppercase">{step.t}</h3>
                <p className="text-sm text-[var(--ink-2)] mt-1.5 leading-relaxed">{step.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approach — image + text */}
      <div className="border-t border-[var(--border)]" style={{ background: 'var(--bg-off)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80")', filter: 'grayscale(0.4)' }} />
          <div>
            <p className="eyebrow mb-4" style={{ color: 'var(--accent)' }}>{t('about.approach')}</p>
            <h2 className="font-semibold text-[var(--ink)] display uppercase mb-5" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>{t('home.whyTitle')}</h2>
            <p className="text-[var(--ink-2)] leading-relaxed mb-8">{t('home.whyBody')}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/inventory" className="btn btn-accent px-6 py-3 mono text-xs uppercase tracking-wide">{t('common.browseAll')}</Link>
              <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-6 py-3 mono text-xs uppercase tracking-wide">{DEMO.studioName} ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="font-semibold text-white display uppercase" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>{t('home.ctaTitle')}</h2>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/contact" className="btn px-6 py-3 mono text-xs uppercase tracking-wide" style={{ background: '#0a0c0f', color: '#fff' }}>{t('nav.bookTestDrive')}</Link>
            <Link href="/inventory" className="btn px-6 py-3 mono text-xs uppercase tracking-wide" style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff' }}>{t('common.browseAll')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
