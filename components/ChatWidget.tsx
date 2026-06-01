'use client'

import { useState, useRef, useEffect } from 'react'
import { X, MessageCircle, Send, Loader2 } from 'lucide-react'
import { useT } from '@/lib/i18n/context'
import type { Locale } from '@/lib/types'
import { CARS, queryCars } from '@/lib/data'
import { DEMO } from '@/lib/demo'

interface Msg { role: 'user' | 'assistant'; text: string }

const nAvail = CARS.filter((c) => c.status === 'available').length
const nSuv = queryCars({ body: 'suv', status: 'available' }).length
const nEv = queryCars({ fuel: 'electric', status: 'available' }).length

// Scripted, inventory-aware responses per language. Demonstration only.
const RESP: Record<Locale, Record<string, string>> = {
  en: {
    available: `We currently have ${nAvail} cars in stock — from city hatchbacks to SUVs and a few performance picks. What kind of car are you after?`,
    suv: `We have ${nSuv} SUVs available right now, petrol, diesel, hybrid and electric. Want me to filter by budget?`,
    electric: `We've got ${nEv} fully-electric cars in stock. Happy to talk range, charging and the finance on those.`,
    finance: `Most cars can be financed in-house — typically 10% deposit over 12–84 months. Try the finance calculator on any car page for an instant estimate.`,
    testdrive: `Test drives are easy to arrange — pick a date and time on any car's page and we'll confirm. Which car caught your eye?`,
    greeting: `Hi! I can help you find a car, talk finance, or arrange a test drive. What are you looking for?`,
    fallback: `Good question! On a live site I'd pull this straight from the dealer's inventory. This is a scripted demo — leave your details below and you'll see how a lead is captured.`,
  },
  ru: {
    available: `Сейчас в наличии ${nAvail} авто — от городских хэтчбеков до внедорожников и пары «заряженных» вариантов. Какой автомобиль вы ищете?`,
    suv: `Сейчас доступно ${nSuv} внедорожников: бензин, дизель, гибрид и электро. Отфильтровать по бюджету?`,
    electric: `В наличии ${nEv} полностью электрических авто. Расскажу про запас хода, зарядку и финансирование.`,
    finance: `Большинство авто можно купить в рассрочку — обычно 10% взнос на срок 12–84 мес. Используйте калькулятор на странице авто для расчёта.`,
    testdrive: `Тест-драйв легко организовать — выберите дату и время на странице авто, и мы подтвердим. Какое авто вам понравилось?`,
    greeting: `Привет! Помогу подобрать авто, рассказать про финансирование или записать на тест-драйв. Что вы ищете?`,
    fallback: `Хороший вопрос! На реальном сайте ответ брался бы из базы дилера. Это демо — оставьте данные ниже, чтобы увидеть, как фиксируется заявка.`,
  },
  el: {
    available: `Έχουμε αυτή τη στιγμή ${nAvail} αυτοκίνητα διαθέσιμα — από μικρά hatchback έως SUV και μερικές sport επιλογές. Τι ψάχνετε;`,
    suv: `Έχουμε ${nSuv} SUV διαθέσιμα τώρα: βενζίνη, diesel, υβριδικά και ηλεκτρικά. Να φιλτράρω με βάση τον προϋπολογισμό;`,
    electric: `Έχουμε ${nEv} πλήρως ηλεκτρικά αυτοκίνητα. Ευχαρίστως να συζητήσουμε αυτονομία, φόρτιση και χρηματοδότηση.`,
    finance: `Τα περισσότερα αυτοκίνητα χρηματοδοτούνται — συνήθως 10% προκαταβολή για 12–84 μήνες. Δοκιμάστε τον υπολογιστή σε κάθε σελίδα αυτοκινήτου.`,
    testdrive: `Η δοκιμαστική οδήγηση κλείνεται εύκολα — επιλέξτε ημερομηνία και ώρα σε κάθε σελίδα αυτοκινήτου. Ποιο σας τράβηξε το μάτι;`,
    greeting: `Γεια! Μπορώ να σας βοηθήσω να βρείτε αυτοκίνητο, για χρηματοδότηση ή δοκιμαστική. Τι ψάχνετε;`,
    fallback: `Καλή ερώτηση! Σε πραγματικό site η απάντηση θα ερχόταν από το stock του εμπόρου. Είναι demo — αφήστε τα στοιχεία σας πιο κάτω.`,
  },
}

function intent(input: string): string {
  const s = input.toLowerCase()
  if (/(suv|jeep|внедорож|τζιπ)/.test(s)) return 'suv'
  if (/(electric|ev|tesla|электр|ηλεκτρ)/.test(s)) return 'electric'
  if (/(financ|loan|payment|рассроч|кредит|δόση|χρηματοδ)/.test(s)) return 'finance'
  if (/(test|drive|тест|δοκιμ)/.test(s)) return 'testdrive'
  if (/(stock|available|нали|διαθέσ|τι έχ)/.test(s)) return 'available'
  if (/(hi|hello|hey|привет|γεια)/.test(s)) return 'greeting'
  return 'fallback'
}

export default function ChatWidget() {
  const { t, locale } = useT()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadDone, setLeadDone] = useState(false)
  const [lead, setLead] = useState({ name: '', phone: '' })
  const end = useRef<HTMLDivElement>(null)

  // Seed greeting in the current language when opened the first time.
  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ role: 'assistant', text: t('chat.greeting') }])
  }, [open, messages.length, t])

  useEffect(() => {
    if (open) end.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (text: string) => {
    const msg = text.trim()
    if (!msg) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: msg }])
    setThinking(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: RESP[locale][intent(msg)] ?? RESP[locale].fallback }])
      setThinking(false)
      setMessages((m) => {
        const userCount = m.filter((x) => x.role === 'user').length
        if (userCount >= 1 && !leadOpen && !leadDone) {
          setTimeout(() => {
            setMessages((mm) => [...mm, { role: 'assistant', text: t('chat.leadPrompt') }])
            setLeadOpen(true)
          }, 700)
        }
        return m
      })
    }, 650)
  }

  const submitLead = () => {
    if (!lead.name || !lead.phone) return
    setLeadDone(true)
    setLeadOpen(false)
    setMessages((m) => [...m, { role: 'assistant', text: t('chat.leadDone', { name: lead.name }) }])
  }

  const quick = ['chat.q.available', 'chat.q.suv', 'chat.q.finance', 'chat.q.testdrive']

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: 'var(--accent)' }}
        aria-label="Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] bg-[var(--panel)] rounded-lg shadow-2xl border border-[var(--border-2)] flex flex-col overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ background: 'var(--surface-dark)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold display shrink-0" style={{ background: 'var(--accent)' }}>LC</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{t('chat.header')}</div>
              <div className="text-xs text-white/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> {t('chat.status')}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-72 bg-[var(--bg-off)]">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message-enter max-w-[85%] px-3 py-2 rounded-md text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-[var(--panel-2)] border border-[var(--border)] text-[var(--ink)] self-start' : 'text-white self-end'}`} style={m.role === 'user' ? { background: 'var(--accent)' } : undefined}>
                {m.text}
              </div>
            ))}
            {thinking && (
              <div className="self-start bg-[var(--panel-2)] border border-[var(--border)] px-3 py-2 rounded-md text-sm text-[var(--ink-3)] flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" /> …
              </div>
            )}
            {leadOpen && !leadDone && (
              <div className="self-start bg-[var(--panel-2)] border border-[var(--border)] rounded-md p-3 flex flex-col gap-2 w-full chat-message-enter">
                <input type="text" placeholder={t('chat.leadName')} value={lead.name} onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))} className="field" />
                <input type="tel" placeholder={t('chat.leadPhone')} value={lead.phone} onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))} className="field" />
                <button onClick={submitLead} className="text-sm py-2 text-white rounded-lg font-medium" style={{ background: 'var(--accent)' }}>{t('chat.leadCta')}</button>
              </div>
            )}
            <div ref={end} />
          </div>

          {!leadOpen && (
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-[var(--border)] bg-[var(--panel)] no-scrollbar">
              {quick.map((q) => (
                <button key={q} onClick={() => send(t(q))} className="shrink-0 text-xs px-2.5 py-1.5 border border-[var(--border)] rounded-full text-[var(--ink-2)] hover:bg-[var(--bg-soft)] transition-colors">
                  {t(q)}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 p-3 border-t border-[var(--border)] bg-[var(--panel)]">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(input) }} placeholder={t('chat.placeholder')} className="field flex-1" />
            <button onClick={() => send(input)} disabled={!input.trim()} className="w-8 h-8 flex items-center justify-center text-white rounded-lg disabled:opacity-40 shrink-0" style={{ background: 'var(--accent)' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
