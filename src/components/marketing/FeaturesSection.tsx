import ArrowButton from '@/components/ui/ArrowButton'

interface Feature {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: 'Mantén a tus alumnos libres de distracciones',
    description:
      'Contamos con herramientas para detectar cuando tus estudiantes cambian de pestaña o abren otras aplicaciones.',
  },
  {
    title: 'Realiza encuestas y evaluaciones en vivo',
    description:
      'Contamos con herramientas para detectar cuando tus estudiantes cambian de pestaña o abren otras aplicaciones.',
  },
  {
    title: 'Toma la asistencia sin mover un dedo',
    description:
      'Mantenemos un registro de hora de entrada y salida para cada estudiante. Al final de la clase, podrás descargar un Excel con la asistencia.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-screen-2xl px-6 py-24 md:px-12">
      <div className="space-y-24">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-x-16 gap-y-8 md:flex-row md:even:flex-row-reverse"
          >
            {/* Image placeholder */}
            <div className="aspect-4.5/3 w-full rounded-2xl bg-muted md:basis-1/2" />

            {/* Text */}
            <div className="w-full shrink-0 md:basis-1/2">
              <h3 className="max-w-[22ch] text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-muted-foreground">{feature.description}</p>
              <div className="mt-8">
                <ArrowButton href="#">Conoce más</ArrowButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
