import type { Metadata } from 'next'
import TradeInView from '@/components/views/TradeInView'

export const metadata: Metadata = { title: 'Trade-in valuation' }

export default function Page() {
  return <TradeInView />
}
