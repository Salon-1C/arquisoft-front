import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    /*
      Section has NO horizontal padding — padding lives on each child individually.
      This lets the image+pills column be truly full-width so pills can bleed to
      the viewport edge without negative-margin hacks.
    */
    <section className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">

      {/* Copy — carries its own horizontal padding */}
      <div className="w-full px-6 text-center md:px-12 lg:pl-12 lg:pr-0 lg:text-left">
        <h1 className="mx-auto max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:mx-0">
          Clases virtuales que sí funcionan
        </h1>
        <p className="mx-auto mt-5 max-w-[48ch] text-muted-foreground lg:mx-0">
          Controles contra distracciones, evaluaciones en vivo, toma de asistencia y más.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

      {/* Image + pills — padding-free, spans full column width.
          overflow-hidden clips pills at the column's right edge (viewport edge on desktop). */}
      <div className="relative w-full overflow-hidden lg:flex lg:h-full lg:items-center">

        {/* Pills
            Mobile  → mask fades both sides.
            Desktop → mask removed; overflow-hidden cuts at the viewport right edge. */}
        <div
          className="pointer-events-none absolute inset-0 mask-[linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] lg:mask-none 2xl:hidden"
          aria-hidden="true"
        >
          {/* Row 1 — top */}
          <div className="absolute top-[10%] left-[18%] h-14 w-[88%] rounded-full bg-muted" />
          {/* Row 2 — mid, stub visible to the right of the image */}
          <div className="absolute top-1/2 left-[72%] h-14 w-[42%] -translate-y-1/2 rounded-full bg-muted" />
          {/* Row 3 — bottom, two pills */}
          <div className="absolute bottom-[10%] left-[4%]  h-14 w-[40%] rounded-full bg-muted" />
          <div className="absolute bottom-[10%] left-[54%] h-14 w-[58%] rounded-full bg-muted" />
        </div>

        {/* Image — mx matches copy padding on mobile, centered on desktop */}
        <div className="relative z-10 mx-6 my-16 aspect-video overflow-hidden rounded-2xl md:mx-12 lg:mx-auto lg:my-14 lg:w-[88%]">
          <Image
            src="/static/hero_section_image.png"
            alt="Clase en vivo en Blume"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    </section>
  )
}
