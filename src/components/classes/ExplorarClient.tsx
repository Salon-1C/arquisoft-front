'use client'

import { useState, useMemo } from 'react'
import type { Class } from '@/types/class'
import ClassGrid from '@/components/classes/ClassGrid'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, SlidersHorizontal } from 'lucide-react'

interface ExplorarClientProps {
  classes: Class[]
}

export default function ExplorarClient({ classes }: ExplorarClientProps) {
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return classes
    return classes.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
    )
  }, [classes, query])

  return (
    <>
      {/* Search bar */}
      <div className="flex items-center gap-3 px-5 py-3 md:px-20">

        {/* Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>

        {/* Filter button */}
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-lg border border-input bg-background p-2 text-muted-foreground transition-colors hover:bg-muted"
        >
          <SlidersHorizontal className="size-4" />
        </button>

        {/* Join with code */}
        <Button
          onClick={() => setModalOpen(true)}
          className="hidden cursor-pointer shrink-0 md:inline-flex"
        >
          Unirme con código
        </Button>

      </div>

      {/* Class list */}
      <ClassGrid classes={filtered} />

      {/* Join with code modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Unirme con código</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa el código de la clase"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
            <Button
              className="w-full cursor-pointer"
              onClick={() => { /* TODO: join class with code */ }}
            >
              Ingresar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
