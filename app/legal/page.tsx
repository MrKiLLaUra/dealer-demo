import type { Metadata } from 'next'
import Link from 'next/link'
import { DEMO } from '@/lib/demo'

export const metadata: Metadata = {
  title: 'Legal & Privacy',
  description: 'Disclaimer, privacy notice and terms for this demonstration website.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[var(--ink)] mb-3 display">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-[var(--ink-2)]">{children}</div>
    </section>
  )
}

export default function LegalPage() {
  return (
    <div className="pt-[102px] min-h-screen bg-[var(--bg)]">
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent)' }}>Transparency</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)] display">Legal &amp; Privacy</h1>
          <p className="text-[var(--ink-3)] mt-2 text-sm">Please read this — it explains exactly what this website is, and isn&apos;t.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 mb-12">
          <p className="text-sm leading-relaxed text-[var(--ink)]">
            <strong>This is a demonstration website.</strong> {DEMO.disclaimer}
          </p>
        </div>

        <Section title="Nature of this website">
          <p>
            This site, &ldquo;{DEMO.brand}&rdquo;, is a portfolio demonstration created by{' '}
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--accent)' }}>{DEMO.studioName}</a>{' '}
            to illustrate the design and functionality of a car-dealership website. It is not a real dealership, is not licensed or registered as one, and does not sell vehicles or provide financial, credit or any other professional services.
          </p>
        </Section>

        <Section title="Fictional content">
          <p>
            All vehicles, photographs, prices, mileages, specifications, VINs, reference numbers, history notes, reviews and contact details shown here are fictional or illustrative. VINs are deliberately fake and cannot match a real vehicle. Vehicle imagery is licensed stock photography used for illustration only and does not depict cars that are actually for sale.
          </p>
          <p>The finance calculator and any figures, statistics or &ldquo;reviews&rdquo; are illustrative examples and must not be relied upon for any decision.</p>
        </Section>

        <Section title="Contact actions are disabled">
          <p>
            Calling, emailing, WhatsApp, the enquiry, test-drive, trade-in and import forms, and the chat assistant are all intentionally non-functional. The phone number and email address are placeholders that connect to no one, and submitting a form sends and stores nothing. No message you enter reaches any real person.
          </p>
        </Section>

        <Section title="Privacy & cookies">
          <p>This demo does not collect personal data, does not use tracking or advertising cookies, and runs no analytics that identify you. Anything you type into a form stays in your browser and is discarded.</p>
          <p>
            We use your browser&apos;s <strong>local storage</strong> for three small, purely functional things: the cars you tap &ldquo;save&rdquo; on, your chosen language, and remembering that you dismissed the cookie notice. This data never leaves your device and you can clear it any time from your browser settings.
          </p>
        </Section>

        <Section title="No warranty">
          <p>This website is provided &ldquo;as is&rdquo;, for demonstration purposes only, without warranties of any kind. {DEMO.studioName} accepts no liability for any action taken on the basis of its fictional content.</p>
        </Section>

        <Section title="Third-party content">
          <p>Map previews are embedded from Google Maps and show approximate areas only. Photography is served from Unsplash, and QR codes from a third-party generator. These services are subject to their own terms.</p>
        </Section>

        <Section title="Contact about this demo">
          <p>
            Questions about this demonstration, or interested in a website like it? Get in touch with{' '}
            <a href={DEMO.studioUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--accent)' }}>{DEMO.studioName}</a>.
          </p>
        </Section>

        <div className="pt-6 border-t border-[var(--border)]">
          <Link href="/" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>← Back to the demo</Link>
        </div>
      </div>
    </div>
  )
}
