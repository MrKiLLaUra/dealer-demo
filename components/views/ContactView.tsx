'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import { DEMO } from '@/lib/demo'
import InquiryForm from '@/components/inventory/InquiryForm'

const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884'

export default function ContactView() {
  const { t } = useT()
  return (
    <div className="pt-[100px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <p className="eyebrow mb-2" style={{ color: 'var(--accent)' }}>{t('nav.contact')}</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] display uppercase">{t('nav.bookTestDrive')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="panel rounded-lg p-6 sm:p-7">
          <InquiryForm defaultType="test_drive" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="panel rounded-lg p-6">
            <p className="eyebrow mb-5" style={{ color: 'var(--accent)' }}>{t('contact.reach')}</p>
            <div className="flex flex-col">
              {[
                { Icon: Phone, label: t('common.callDealer'), value: DEMO.phone, href: `tel:${DEMO.phone.replace(/\s/g, '')}` },
                { Icon: Mail, label: t('common.email'), value: DEMO.email, href: `mailto:${DEMO.email}` },
                { Icon: MapPin, label: t('spec.location'), value: DEMO.address, href: '#' },
                { Icon: Clock, label: t('contact.hours'), value: t('contact.hoursVal'), href: undefined },
              ].map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', color: 'var(--accent)' }}><Icon size={15} /></div>
                    <div>
                      <div className="eyebrow mb-0.5">{label}</div>
                      <div className="mono text-[13px] text-[var(--ink)]">{value}</div>
                    </div>
                  </>
                )
                return href ? (
                  <a key={label} href={href} className="flex items-start gap-3 py-3.5 border-t border-[var(--border)] first:border-t-0 text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors">{inner}</a>
                ) : (
                  <div key={label} className="flex items-start gap-3 py-3.5 border-t border-[var(--border)] text-[var(--ink-2)]">{inner}</div>
                )
              })}
            </div>
          </div>

          <div className="panel rounded-lg overflow-hidden">
            <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(DEMO.mapQuery)}&z=12&output=embed`} className="w-full h-64 border-0" loading="lazy" title="Map" style={{ filter: 'invert(0.92) hue-rotate(180deg)' }} />
          </div>

          <a href={`https://wa.me/${DEMO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg p-5 text-white" style={{ background: '#25d366' }}>
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d={WA_PATH} /></svg>
            <div>
              <div className="font-semibold">{t('wa.label')}</div>
              <div className="text-sm text-white/80">{t('common.demoNote')}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
