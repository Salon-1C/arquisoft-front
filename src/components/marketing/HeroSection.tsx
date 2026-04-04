'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart2, CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuestionOption {
  letter: string
  text: string
}

const questionOptions: QuestionOption[] = [
  { letter: 'a', text: 'Una variable que almacena una constante' },
  { letter: 'b', text: 'Una variable que almacena un símbolo especial' },
  { letter: 'c', text: 'Una variable que almacena una dirección de memoria' },
  { letter: 'd', text: 'Una variable que almacena un valor numérico' },
]

const cardBase =
  'rounded-xl border border-white/50 bg-white/85 p-4 shadow-lg backdrop-blur-md'

export default function HeroSection() {
  const [vote, setVote] = useState<'si' | 'no'>('si')
  const [answer, setAnswer] = useState<string>('a')

  return (
    <section className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-center justify-center gap-10 overflow-hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">

      {/* Copy */}
      <div className="w-full px-6 text-center md:px-12 lg:pl-12 lg:pr-0 lg:text-left">
        <h1 className="mx-auto max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:mx-0">
          Clases virtuales que sí funcionan
        </h1>
        <p className="mx-auto mt-5 max-w-[48ch] text-muted-foreground lg:mx-0">
          Controles contra distracciones, evaluaciones en vivo, toma de asistencia y más.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Button className="rounded-full transition-colors" size="lg" asChild>
            <Link href="/registro">Empieza gratis</Link>
          </Button>
          <Button className="rounded-full transition-colors" size="lg" variant="outline" asChild>
            <Link href="/explorar">
              Ver clases <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Image + pills + floating cards */}
      <div className="relative w-full lg:flex lg:h-full lg:items-center">

        {/* Pills */}
        <div
          className="pointer-events-none absolute inset-0 mask-[linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] lg:mask-none 2xl:hidden"
          aria-hidden="true"
        >
          <div className="absolute top-[10%] left-[18%] h-14 w-[88%] rounded-full bg-muted" />
          <div className="absolute top-1/2 left-[72%] h-14 w-[42%] -translate-y-1/2 rounded-full bg-muted" />
          <div className="absolute bottom-[10%] left-[4%]  h-14 w-[40%] rounded-full bg-muted" />
          <div className="absolute bottom-[10%] left-[54%] h-14 w-[58%] rounded-full bg-muted" />
        </div>

        {/* Image — left-aligned on desktop, slightly smaller to leave room for Card 2 */}
        <div className="relative z-10 mx-6 my-16 aspect-video md:mx-12 lg:mx-0 lg:my-14 lg:ml-6 lg:w-[76%]">

          {/* Actual image — overflow-hidden scoped here for rounded corners */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <Image
              src="/static/hero_section_image.png"
              alt="Clase en vivo en Blume"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Card 1 — Pregunta · top-left of image · tablet+ */}
          <div className={cn('absolute -left-8 -top-16 hidden w-68 md:block lg:-left-14 lg:-top-28', cardBase)}>
            <div className="mb-2 flex items-center gap-1.5 text-primary">
              <CircleHelp className="size-3.5" />
              <span className="text-xs font-medium">Pregunta</span>
            </div>
            <p className="mb-3 text-xs font-semibold text-foreground">
              ¿Qué es un puntero?
            </p>
            <div className="space-y-1.5">
              {questionOptions.map(({ letter, text }) => (
                <button
                  key={letter}
                  onClick={() => setAnswer(letter)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-left transition-colors',
                    answer === letter
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-border/50 hover:border-border'
                  )}
                >
                  <span className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-colors',
                    answer === letter
                      ? 'bg-primary text-white'
                      : 'bg-muted/40 text-muted-foreground'
                  )}>
                    {letter}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{text}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-primary px-4 py-2 text-center text-xs font-semibold text-white transition-colors cursor-pointer hover:bg-primary/90">
              Enviar
            </div>
          </div>
        </div>

        {/* Card 2 — Encuesta virtual · bottom-right of outer container · tablet+
            Positioned relative to the image+pills column, hugging the right padding edge */}
        <div className={cn('absolute bottom-[8%] right-16 z-20 hidden w-48 md:block', cardBase)}>
          <div className="mb-2 flex items-center gap-1.5 text-primary">
            <BarChart2 className="size-3.5" />
            <span className="text-xs font-medium">Encuesta virtual</span>
          </div>
          <p className="mb-3 text-xs font-medium text-foreground">
            ¿Estás de acuerdo con mover el quiz 2 para el 22 de marzo?
          </p>
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => setVote('si')}
              className={cn(
                'flex-1 cursor-pointer rounded-lg border px-3 py-1.5 text-center text-xs font-medium transition-colors',
                vote === 'si'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border bg-background text-foreground hover:border-border/80 hover:bg-muted'
              )}
            >
              Sí
            </button>
            <button
              onClick={() => setVote('no')}
              className={cn(
                'flex-1 cursor-pointer rounded-lg border px-3 py-1.5 text-center text-xs font-medium transition-colors',
                vote === 'no'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border bg-background text-foreground hover:border-border/80 hover:bg-muted'
              )}
            >
              No
            </button>
          </div>
          <div className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary/90">
            Enviar
          </div>
        </div>

      </div>
    </section>
  )
}
