'use client'

import { useState, useEffect, useCallback } from 'react'

const KEY = 'lc_favorites'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => {
    setFavs(read())
  }, [])

  const toggle = useCallback((id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const isFav = useCallback((id: string) => favs.includes(id), [favs])

  return { favs, isFav, toggle }
}
