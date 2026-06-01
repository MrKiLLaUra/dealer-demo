'use client'

import { useState, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)

  const open = useCallback((i: number) => {
    setLightbox(i)
    document.body.classList.add('lightbox-open')
  }, [])
  const close = useCallback(() => {
    setLightbox(null)
    document.body.classList.remove('lightbox-open')
  }, [])
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : 0)), [images.length])
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % images.length : 0)), [images.length])

  if (!images || images.length === 0) {
    return <div className="aspect-video bg-[var(--bg-soft)] rounded-2xl flex items-center justify-center text-[var(--ink-3)] text-sm">No photos</div>
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        <button onClick={() => open(0)} className="col-span-4 sm:col-span-3 row-span-2 relative overflow-hidden group">
          <div className="w-full aspect-[16/10] bg-cover bg-center bg-[#11151c] group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url("${images[0]}")` }} />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg">
            <Expand size={13} /> {images.length}
          </span>
        </button>
        {images.slice(1, 3).map((src, i) => (
          <button key={i} onClick={() => open(i + 1)} className="col-span-2 sm:col-span-1 relative overflow-hidden group hidden sm:block">
            <div className="w-full aspect-square bg-cover bg-center bg-[#11151c] group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url("${src}")` }} />
          </button>
        ))}
      </div>

      {/* Mobile thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto sm:hidden mt-2 pb-1 no-scrollbar">
          {images.slice(1).map((src, i) => (
            <button key={i} onClick={() => open(i + 1)} className="shrink-0 w-20 h-20 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${src}")` }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (dx > 40) prev()
            else if (dx < -40) next()
            touchX.current = null
          }}
        >
          <button onClick={(e) => { e.stopPropagation(); close() }} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
            <ChevronLeft size={22} />
          </button>
          <img src={images[lightbox]} alt={`${title} — ${lightbox + 1}`} className="max-w-[92vw] max-h-[86vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {images.length}</div>
        </div>
      )}
    </>
  )
}
