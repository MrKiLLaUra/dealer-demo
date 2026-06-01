'use client'

import Link from 'next/link'
import { Phone, Mail, Heart, ExternalLink } from 'lucide-react'
import type { Car } from '@/lib/types'
import { useT } from '@/lib/i18n/context'
import { useFavorites } from '@/lib/useFavorites'
import { carText, queryCars } from '@/lib/data'
import { formatPrice, formatNumber, calcMonthly } from '@/lib/utils'
import { DEMO } from '@/lib/demo'
import Gallery from '@/components/inventory/Gallery'
import FinanceCalculator from '@/components/inventory/FinanceCalculator'
import InquiryForm from '@/components/inventory/InquiryForm'
import CarCard from '@/components/inventory/CarCard'
import { Badges } from '@/components/inventory/Badges'

export default function CarDetailView({ car }: { car: Car }) {
  const { t, locale } = useT()
  const { isFav, toggle } = useFavorites()
  const fav = isFav(car.id)

  const title = `${car.make} ${car.model}`
  const monthly = Math.round(calcMonthly(car.price, car.price * 0.1, 6.9, 60))
  const related = queryCars({ make: car.make, status: 'available' }).filter((c) => c.id !== car.id).slice(0, 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cars-demo.limenstudios.com'
  const pageUrl = `${siteUrl}/inventory/${car.slug}`
  const waMsg = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${title} ${car.variant} (Ref: ${car.ref}).`)

  const specs: { label: string; value: string }[] = [
    { label: t('spec.make'), value: car.make },
    { label: t('spec.model'), value: `${car.model} ${car.variant}` },
    { label: t('spec.year'), value: String(car.year) },
    { label: t('spec.mileage'), value: `${formatNumber(car.mileage)} km` },
    { label: t('spec.fuel'), value: t(`fuel.${car.fuel}`) },
    { label: t('spec.transmission'), value: t(`transmission.${car.transmission}`) },
    { label: t('spec.body'), value: t(`body.${car.body}`) },
    { label: t('spec.drivetrain'), value: t(`drivetrain.${car.drivetrain}`) },
    { label: t('spec.engine'), value: car.engine_l ? `${car.engine_l.toFixed(1)} L` : '—' },
    { label: t('spec.power'), value: `${car.power_hp} ${t('spec.hp')}` },
    { label: t('spec.doors'), value: String(car.doors) },
    { label: t('spec.seats'), value: String(car.seats) },
    { label: t('spec.co2'), value: `${car.co2} g/km` },
    { label: t('spec.color'), value: car.color },
    { label: t('spec.condition'), value: t(`condition.${car.condition}`) },
    { label: t('spec.vin'), value: car.vin },
  ]

  return (
    <div className="pt-[100px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center gap-2 mono text-[11px] uppercase tracking-wide text-[var(--ink-3)]">
          <Link href="/" className="hover:text-[var(--ink)]">{t('crumb.home')}</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-[var(--ink)]">{t('crumb.inventory')}</Link>
          <span>/</span>
          <span className="text-[var(--ink)] truncate">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="flex flex-col gap-6">
            <Gallery images={car.images} title={title} />

            {/* Header */}
            <div className="panel rounded-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="mb-3"><Badges car={car} /></div>
                  <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--ink)] display uppercase leading-none">{title}</h1>
                  <p className="text-[var(--ink-3)] mt-1.5">{car.variant}</p>
                </div>
                <div className="text-right">
                  <div className="mono text-3xl font-semibold text-[var(--ink)]">{formatPrice(car.price)}</div>
                  {car.status === 'available' && (
                    <div className="mono text-[11px] uppercase mt-1" style={{ color: 'var(--accent)' }}>{t('common.from')} {formatPrice(monthly)}{t('common.perMonth')}</div>
                  )}
                  <div className="mono text-[11px] text-[var(--ink-3)] mt-1">{t('spec.ref')}: {car.ref}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--border)]">
                <h2 className="eyebrow mb-2">{t('spec.overview')}</h2>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{carText(car.description, locale)}</p>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed mt-3"><span className="text-[var(--ink)] font-medium">{t('spec.history')}:</span> {carText(car.history, locale)}</p>
              </div>
            </div>

            {/* Specs */}
            <div className="panel rounded-lg p-6">
              <h2 className="eyebrow mb-4">{t('spec.specs')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2.5 text-sm border-b border-[var(--border)]">
                    <span className="text-[var(--ink-3)]">{s.label}</span>
                    <span className="mono text-[var(--ink)] text-right text-[13px]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="panel rounded-lg p-6">
                <h2 className="eyebrow mb-4">{t('spec.features')}</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--ink-2)]"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} /> {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Video */}
            {car.video_url && (
              <div className="panel rounded-lg p-6">
                <h2 className="eyebrow mb-4">{t('spec.video')}</h2>
                <div className="relative aspect-video rounded-md overflow-hidden">
                  <iframe src={car.video_url.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title="Video" />
                </div>
              </div>
            )}

            {car.status === 'available' && <FinanceCalculator price={car.price} />}

            {/* Map */}
            <div className="panel rounded-lg p-6">
              <h2 className="eyebrow mb-4">{t('spec.location')}</h2>
              <div className="rounded-md overflow-hidden aspect-[16/7]" style={{ filter: 'invert(0.92) hue-rotate(180deg)' }}>
                <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(DEMO.mapQuery)}&z=11&output=embed`} className="w-full h-full border-0" loading="lazy" title="Map" />
              </div>
              <p className="mt-3 text-xs text-[var(--ink-3)]">{t('spec.locationNote')}</p>
            </div>

            {/* QR */}
            <div className="rounded-lg p-6 flex flex-col sm:flex-row items-center gap-5" style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pageUrl)}`} alt="QR" className="w-24 h-24 rounded-md bg-white p-1.5" />
              <div>
                <h3 className="font-semibold text-[var(--ink)] mb-1 display uppercase">{t('spec.qrTitle')}</h3>
                <p className="text-sm text-[var(--ink-3)] mb-3">{t('spec.qrSub')}</p>
                <a href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" download className="mono text-[11px] uppercase tracking-wide inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                  <ExternalLink size={13} /> {t('spec.downloadQr')}
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="panel rounded-lg p-5 sticky top-[112px]">
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                <div>
                  <div className="font-semibold text-sm text-[var(--ink)] display uppercase">{DEMO.brand}</div>
                  <div className="text-xs text-[var(--ink-3)]">{DEMO.address}</div>
                </div>
                <button onClick={() => toggle(car.id)} className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--border)] shrink-0" aria-label="Save">
                  <Heart size={15} className={fav ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--ink-3)]'} />
                </button>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <a href={`tel:${DEMO.phone.replace(/\s/g, '')}`} className="btn btn-primary w-full py-2.5"><Phone size={14} /> {t('common.callDealer')}</a>
                <a href={`https://wa.me/${DEMO.whatsapp}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn w-full py-2.5 text-white" style={{ background: '#25d366' }}>{t('common.whatsapp')}</a>
                <a href={`mailto:${DEMO.email}?subject=${encodeURIComponent(`${title} (${car.ref})`)}`} className="btn btn-ghost w-full py-2.5"><Mail size={14} /> {t('detail.emailDealer')}</a>
              </div>

              <InquiryForm defaultType="test_drive" />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[var(--ink)] mb-6 display uppercase">{t('spec.related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
