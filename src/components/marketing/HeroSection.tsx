import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="mx-auto grid h-full w-full max-w-screen-2xl items-center gap-12 px-6 md:px-12 lg:grid-cols-2">
      {/* Left — copy */}
      <div>
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Clases virtuales que sí funcionan
        </h1>
        <p className="mt-5 max-w-[48ch] text-muted-foreground">
          Controles contra distracciones, evaluaciones en vivo, toma de asistencia y más.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button className="rounded-full" size="lg" asChild>
            <Link href="/registro">Empieza gratis</Link>
          </Button>
          <Button className="rounded-full" size="lg" variant="outline" asChild>
            <Link href="/explorar">
              Ver clases <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Right — image with pill decorations behind */}
      <div className="relative flex h-full items-center overflow-hidden">

        {/* Decoration pills — desktop only */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {/* Row 1 — top, above image, extends off right edge */}
          <div className="absolute top-[10%] left-[18%] h-14 w-[88%] rounded-full bg-muted" />

          {/* Row 2 — mid height, emerges from behind image on the right */}
          <div className="absolute top-1/2 left-[72%] h-14 w-[42%] -translate-y-1/2 rounded-full bg-muted" />

          {/* Row 3 — bottom, two pills, second extends off right edge */}
          <div className="absolute bottom-[10%] left-[4%]  h-14 w-[40%] rounded-full bg-muted" />
          <div className="absolute bottom-[10%] left-[54%] h-14 w-[58%] rounded-full bg-muted" />
        </div>

        {/* Image — 88% wide so row-2 pill stub is visible to the right */}
        <div className="relative z-10 my-14 aspect-video w-[88%] rounded-2xl bg-muted" />
      </div>
    </section>
  )
}
