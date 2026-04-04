import Link from 'next/link'

interface ArrowButtonProps {
  href: string
  children: React.ReactNode
}

export default function ArrowButton({ href, children }: ArrowButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-6 rounded-full bg-primary transition-all hover:bg-primary/90 pl-4 pr-1 py-1 text-white text-base"
    >
      <span>{children}</span>
      <span className="flex size-7 items-center justify-center rounded-full bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
