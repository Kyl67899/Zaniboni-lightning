import type React from "react"

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-border pb-14 pt-36 md:pb-20 md:pt-44">
      <div className="shell">
        <p className="eyebrow mb-6 text-secondary">{eyebrow}</p>
        <h1 className="display max-w-4xl">{title}</h1>
        {description && <p className="lede mt-7 max-w-2xl">{description}</p>}
        {children}
      </div>
    </section>
  )
}
