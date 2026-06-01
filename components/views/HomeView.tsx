'use client'

import Link from 'next/link'
import { Car, Truck, Zap, ShieldCheck, Wallet, BadgeCheck, RefreshCw, ArrowRight, ArrowUpRight } from 'lucide-react'
import { CARS, queryCars, countByStatus, getMakes } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import { calcMonthly, formatPrice } from '@/lib/utils'
import CarCard from '@/components/inventory/CarCard'
import HeroSearchPanel from '@/components/inventory/HeroSearchPanel'

const BODIES = ['suv', 'sedan', 'hatchback', 'coupe', 'estate', 'convertible', 'pickup']

export default function HomeView() {
  const { t } = useT()
  const available = CARS.filter((c) => c.status === 'available')
  const latest = [...available].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 8)
  const soldCount = countByStatus('sold')
  const brands = getMakes()
  const minMonthly = Math.round(Math.min(...available.map((c) => calcMonthly(c.price, c.price * 0.1, 6.9, 60))))

  const bodyCount = (b: string) => queryCars({ body: b, status: 'available' }).length
  const evCount = queryCars({ fuel: 'electric', status: 'available' }).length
  const makeCount = (m: string) => available.filter((c) => c.make === m).length

  const WHY = [
    { icon: ShieldCheck, label: t('home.why.inspected'), sub: t('home.why.inspectedSub') },
    { icon: Wallet, label: t('home.why.finance'), sub: t('home.why.financeSub') },
    { icon: BadgeCheck, label: t('home.why.warranty'), sub: t('home.why.warrantySub') },
    { icon: RefreshCw, label: t('home.why.tradein'), sub: t('home.why.tradeinSub') },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative" style={{ minHeight: 700, paddingTop: 100 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=80")' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(10,12,15,0.96) 0%, rgba(10,12,15,0.78) 42%, rgba(10,12,15,0.42) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-20">
          <p className="eyebrow mb-5" style={{ color: 'var(--accent)' }}>{t('hero.eyebrow')}</p>
          <h1 className="font-semibold text-white mb-4 leading-[0.95] tracking-tight display uppercase" style={{ fontSize: 'clamp(44px, 7.5vw, 92px)', maxWidth: 880 }}>
            {t('home.find')}
          </h1>
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 440 }}>{t('home.findSub')}</p>

          <HeroSearchPanel />

          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {[
              { label: t('body.suv'), href: '/inventory?body=suv' },
              { label: t('body.sedan'), href: '/inventory?body=sedan' },
              { label: t('home.electric'), href: '/inventory?fuel=electric' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-sm text-white border border-white/20 hover:bg-white/10 transition-colors">{c.label}</Link>
            ))}
            <Link href="/inventory" className="mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-sm text-white flex items-center gap-1" style={{ background: 'var(--accent)' }}>{t('common.browseAll')} <ArrowRight size={13} /></Link>
          </div>

          <div className="flex gap-10 sm:gap-16 mt-14 flex-wrap">
            {[
              { value: String(available.length), label: t('hero.stat.inStock') },
              { value: '900+', label: t('hero.stat.sold') },
              { value: String(brands.length), label: t('hero.stat.brands') },
              { value: '12', label: t('hero.stat.years') },
            ].map((s) => (
              <div key={s.label}>
                <div className="mono text-white text-3xl font-semibold tracking-tight">{s.value}</div>
                <div className="eyebrow mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY BODY TYPE */}
      <Section eyebrow="01" title={t('home.browseType')}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {BODIES.map((b) => (
            <Link key={b} href={`/inventory?body=${b}`} className="flex flex-col items-center gap-2.5 p-5 rounded-md bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--border-2)] transition-colors text-center">
              {b === 'pickup' ? <Truck size={22} className="text-[var(--ink)]" /> : <Car size={22} className="text-[var(--ink)]" />}
              <span className="mono text-[11px] uppercase tracking-wide text-[var(--ink)]">{t(`body.${b}`)}</span>
              <span className="mono text-[11px] text-[var(--ink-3)]">{bodyCount(b)}</span>
            </Link>
          ))}
          <Link href="/inventory?fuel=electric" className="flex flex-col items-center gap-2.5 p-5 rounded-md border hover:opacity-90 transition-opacity text-center text-white" style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}>
            <Zap size={22} />
            <span className="mono text-[11px] uppercase tracking-wide">{t('home.electric')}</span>
            <span className="mono text-[11px] text-white/70">{evCount}</span>
          </Link>
        </div>
      </Section>

      {/* LATEST STOCK */}
      <section className="py-16 sm:py-20 border-t border-[var(--border)]" style={{ background: 'var(--bg-off)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <div>
              <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>02 — {t('home.latest')}</p>
              <h2 className="font-semibold text-[var(--ink)] display uppercase" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>{t('home.latestSub')}</h2>
            </div>
            <Link href="/inventory" className="mono text-[11px] uppercase tracking-wide flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>{t('common.viewAll')} <ArrowRight size={14} /></Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 sm:-mx-10 sm:px-10" style={{ scrollSnapType: 'x mandatory' }}>
            {latest.map((c) => (
              <div key={c.id} className="w-[290px] shrink-0" style={{ scrollSnapAlign: 'start' }}><CarCard car={c} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCE BAND */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="rounded-lg p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border" style={{ background: 'var(--surface-dark)', borderColor: 'var(--border)' }}>
            <div>
              <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>Finance</p>
              <h2 className="font-semibold text-white display uppercase" style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}>{t('home.financeTitle', { x: formatPrice(minMonthly) })}</h2>
              <p className="mt-2 text-sm max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('home.financeSub')}</p>
            </div>
            <Link href="/inventory" className="btn btn-primary px-6 py-3 shrink-0 mono text-xs uppercase tracking-wide">{t('home.financeCta')} →</Link>
          </div>
        </div>
      </section>

      {/* TRADE-IN + IMPORT */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: t('home.tradeTitle'), sub: t('home.tradeSub'), href: '/trade-in', cta: t('nav.tradeIn'), icon: RefreshCw },
            { title: t('home.importTitle'), sub: t('home.importSub'), href: '/import', cta: t('nav.import'), icon: Car },
          ].map((p) => (
            <Link key={p.href} href={p.href} className="group rounded-lg p-7 bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--border-2)] transition-colors">
              <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-4" style={{ background: 'var(--bg-soft)' }}><p.icon size={18} style={{ color: 'var(--accent)' }} /></div>
              <h3 className="font-semibold text-lg text-[var(--ink)] mb-1 display uppercase">{p.title}</h3>
              <p className="text-sm text-[var(--ink-2)] mb-4">{p.sub}</p>
              <span className="mono text-[11px] uppercase tracking-wide flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>{p.cta} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* BROWSE BY MAKE */}
      <section className="py-14 border-y border-[var(--border)]" style={{ background: 'var(--bg-off)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="eyebrow mb-5" style={{ color: 'var(--accent)' }}>03 — {t('home.browseMake')}</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((m) => (
              <Link key={m} href={`/inventory?make=${encodeURIComponent(m)}`} className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--border-2)] transition-colors text-sm font-medium text-[var(--ink)]">
                {m} <span className="mono text-xs text-[var(--ink-3)]">{makeCount(m)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {WHY.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)' }}><Icon size={17} style={{ color: 'var(--accent)' }} /></div>
              <div>
                <p className="font-semibold text-sm text-[var(--ink)]">{label}</p>
                <p className="text-xs mt-0.5 text-[var(--ink-3)]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLD STRIP */}
      {soldCount > 0 && (
        <section className="border-y border-[var(--border)]" style={{ background: 'var(--surface-dark)' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-semibold text-white display uppercase" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>{t('home.soldTitle')}</h2>
              <p className="mono mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{soldCount} {t('home.soldSub')}</p>
            </div>
            <Link href="/sold" className="btn btn-ghost px-6 py-3 mono text-xs uppercase tracking-wide">{t('home.viewSold')} →</Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-semibold text-white display uppercase" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>{t('home.ctaTitle')}</h2>
            <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{t('home.ctaSub')}</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/contact" className="btn px-6 py-3 mono text-xs uppercase tracking-wide" style={{ background: '#0a0c0f', color: '#fff' }}>{t('nav.bookTestDrive')}</Link>
            <Link href="/inventory" className="btn px-6 py-3 mono text-xs uppercase tracking-wide" style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff' }}>{t('common.browseAll')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono text-sm" style={{ color: 'var(--accent)' }}>{eyebrow}</span>
          <h2 className="font-semibold text-[var(--ink)] display uppercase" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}
