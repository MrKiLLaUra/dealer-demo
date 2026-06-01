import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: 102 }}>
      <p className="text-6xl font-bold display" style={{ color: 'var(--accent)' }}>404</p>
      <p className="mt-3 text-lg font-semibold text-[var(--ink)]">Page not found</p>
      <Link href="/" className="mt-6 px-6 py-3 rounded-xl text-white text-sm font-semibold" style={{ background: 'var(--accent)' }}>
        Back to home
      </Link>
    </div>
  )
}
