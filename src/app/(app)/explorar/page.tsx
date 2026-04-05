import { getClasses } from '@/lib/api/classes'
import ExplorarClient from '@/components/classes/ExplorarClient'

export default async function ExplorarPage() {
  const result = await getClasses()
  console.log('[explorar] clases recibidas:', result.data.items)
  console.log('[explorar] total:', result.data.total)

  return (
    <div className="flex h-full">

      {/* Main content */}
      <div className="flex-1 overflow-y-auto md:bg-muted">
        <ExplorarClient classes={result.data.items} />
      </div>

      {/* Right panel — same width as left sidebar, desktop only */}
      <div className="hidden md:block w-(--sidebar-width) shrink-0 border-l border-border bg-muted" />

    </div>
  )
}
