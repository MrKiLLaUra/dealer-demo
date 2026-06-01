'use client'

import Link from 'next/link'
import { ShieldCheck, Wallet, BadgeCheck, RefreshCw, Star } from 'lucide-react'
import { CARS, queryCars, countByStatus, getMakes } from '@/lib/data'
import { useT } from '@/lib/i18n/context'
import type { Locale } from '@/lib/types'
import CarCard from '@/components/inventory/CarCard'
import HeroSearch from '@/components/inventory/HeroSearch'

const REVIEWS: Record<Locale, { name: string; quote: string }[]> = {
  en: [
    { name: 'Buyer · Limassol', quote: 'Smooth, no-pressure process. The finance was sorted in a day and the car was exactly as described.' },
    { name: 'Buyer · Nicosia', quote: 'Traded in my old car at a fair price and drove away the same afternoon. Genuinely easy.' },
    { name: 'Buyer · Paphos', quote: 'They sourced the exact spec I wanted within two weeks. Communication was first-class.' },
  ],
  ru: [
    { name: 'Покупатель · Лимасол', quote: 'Спокойно, без давления. Финансирование оформили за день, авто полностью соответствовало описанию.' },
    { name: 'Покупатель · Никосия', quote: 'Сдал старое авто по честной цене и уехал в тот же день. Действительно просто.' },
    { name: 'Покупатель · Пафос', quote: 'Нашли точную комплектацию за две недели. Общение на высшем уровне.' },
  ],
  el: [
    { name: 'Αγοραστής · Λεμεσός', quote: 'Ομαλή διαδικασία, χωρίς πίεση. Η χρηματοδότηση έγινε σε μία μέρα και το αυτοκίνητο ήταν ακριβώς όπως περιγράφηκε.' },
    { name: 'Αγοραστής · Λευκωσία', quote: 'Έδωσα το παλιό μου με δίκαιη τιμή και έφυγα το ίδιο απόγευμα. Πραγματικά εύκολο.' },
    { name: 'Αγοραστής · Πάφος', quote: 'Βρήκαν την ακριβή έκδοση που ήθελα σε δύο εβδομάδες. Άριστη επικοινωνία.' },
  ],
}

export default function HomeView() {
  const { t, locale } = useT()
  const featured = queryCars({ featured: true }).slice(0, 6)
  const arrivals = CARS.filter((c) => c.is_new_arrival && c.status === 'available').slice(0, 3)
  const soldCount = countByStatus('sold')
  const inStock = CARS.filter((c) => c.status === 'available').length
  const brands = getMakes().length

  const WHY = [
    { icon: ShieldCheck, label: t('home.why.inspected'), sub: t('home.why.inspectedSub') },
    { icon: Wallet, label: t('home.why.finance'), sub: t('home.why.financeSub') },
    { icon: BadgeCheck, label: t('home.why.warranty'), sub: t('home.why.warrantySub') },
    { icon: RefreshCw, label: t('home.why.tradein'), sub: t('home.why.tradeinSub') },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative flex flex-col justify-end" style={{ height: '100svh', minHeight: 600, maxHeight: 900, paddingTop: 102 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=80")' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.88) 0%, rgba(8,10,14,0.4) 55%, rgba(8,10,14,0.15) 100%)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 sm:pb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-[2px]" style={{ background: 'var(--accent-light)' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('hero.eyebrow')}</span>
          </div>
          <h1 className="font-bold text-white mb-5 leading-[1.04] tracking-[-0.02em] display" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
            {t('hero.title1')} <span style={{ color: 'var(--accent-light)' }}>{t('hero.titleAccent')}</span><br />{t('hero.title2')}
          </h1>
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 480 }}>{t('hero.subtitle')}</p>
          <HeroSearch />
          <div className="flex gap-8 sm:gap-12 mt-10 flex-wrap">
            {[
              { value: String(inStock), label: t('hero.stat.inStock') },
              { value: '900+', label: t('hero.stat.sold') },
              { value: String(brands), label: t('hero.stat.brands') },
              { value: '12', label: t('hero.stat.years') },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-white text-2xl sm:text-3xl font-bold tracking-tight display">{s.value}</div>
                <div className="text-[10px] font-bold uppercase mt-1" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {arrivals.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <SectionHead eyebrow={t('home.newArrivals')} title={t('home.newArrivalsSub')} href="/inventory" cta={t('common.viewAll')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {arrivals.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED */}
      <section className="py-20 sm:py-24" style={{ background: 'var(--bg-off)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHead eyebrow={t('home.featured')} title={t('home.featuredSub')} href="/inventory" cta={t('common.browseAll')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase mb-3" style={{ letterSpacing: '0.22em', color: 'var(--accent)' }}>{t('home.why')}</p>
          <h2 className="font-bold text-[var(--ink)] mb-3 display" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>{t('home.whyTitle')}</h2>
          <p className="mb-10 leading-relaxed max-w-2xl" style={{ color: 'var(--ink-2)', fontSize: 15 }}>{t('home.whyBody')}</p>
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
      </section>

      {/* SOLD STRIP */}
      {soldCount > 0 && (
        <section style={{ background: 'var(--surface-dark)' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase mb-2" style={{ letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)' }}>Archive</p>
              <h2 className="font-bold text-white display" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>{t('home.soldTitle')}</h2>
              <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{soldCount} {t('home.soldSub')}</p>
            </div>
            <Link href="/sold" className="shrink-0 px-6 py-3 text-sm font-semibold text-white rounded-xl" style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}>{t('home.viewSold')} →</Link>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase mb-3" style={{ letterSpacing: '0.22em', color: 'var(--accent)' }}>{t('home.reviews')}</p>
          <h2 className="font-bold text-[var(--ink)] display" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>{t('home.reviewsTitle')}</h2>
          <p className="text-xs mt-2 mb-10" style={{ color: 'var(--ink-3)' }}>{t('home.reviewsNote')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS[locale].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-7 flex flex-col gap-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-amber-400" />)}</div>
                <p className="flex-1 text-[var(--ink)]" style={{ fontSize: 15, lineHeight: 1.7 }}>“{r.quote}”</p>
                <p className="text-xs font-semibold text-[var(--ink-3)] pt-2" style={{ borderTop: '1px solid var(--border)' }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-white display" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>{t('home.ctaTitle')}</h2>
            <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{t('home.ctaSub')}</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/contact" className="px-6 py-3 text-sm font-bold rounded-xl whitespace-nowrap bg-white" style={{ color: 'var(--accent)' }}>{t('nav.bookTestDrive')}</Link>
            <Link href="/inventory" className="px-6 py-3 text-sm font-semibold text-white rounded-xl whitespace-nowrap" style={{ border: '1.5px solid rgba(255,255,255,0.4)' }}>{t('common.browseAll')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHead({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase mb-2" style={{ letterSpacing: '0.22em', color: 'var(--accent)' }}>{eyebrow}</p>
        <h2 className="font-bold text-[var(--ink)] display" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>{title}</h2>
      </div>
      <Link href={href} className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors" style={{ border: '1.5px solid var(--border)', color: 'var(--ink-2)' }}>{cta} →</Link>
    </div>
  )
}
