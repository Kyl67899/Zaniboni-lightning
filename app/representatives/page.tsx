"use client"

import { useMemo, useState } from "react"
import { Mail, MapPin, Phone, Search, X } from "lucide-react"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { stateNames, StateTileMap } from "@/components/state-tile-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { repRegions, representatives, type RepRegion } from "@/data/representatives"

export default function RepresentativesPage() {
  const [region, setRegion] = useState<RepRegion>("United States")
  const [state, setState] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const rep of representatives) {
      if (rep.region === "United States" && rep.state) counts[rep.state] = (counts[rep.state] ?? 0) + 1
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return representatives
      .filter((rep) => rep.region === region)
      .filter((rep) => !state || rep.state === state)
      .filter(
        (rep) =>
          !term ||
          [rep.name, rep.city, rep.state, rep.state && stateNames[rep.state], rep.zip].some((value) =>
            value?.toLowerCase().includes(term),
          ),
      )
      .sort((a, b) => (a.state ?? "").localeCompare(b.state ?? "") || a.name.localeCompare(b.name))
  }, [region, state, query])

  const chooseRegion = (next: RepRegion) => {
    setRegion(next)
    setState(null)
  }

  const clearFilters = () => {
    setState(null)
    setQuery("")
  }

  return (
    <main id="main">
      <PageHero
        eyebrow="Representatives"
        title="Find your local representative"
        description="Our network of representatives supports specification, pricing and project delivery in your area."
      />

      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a region">
            {repRegions.map((name) => (
              <button
                key={name}
                type="button"
                className="pill"
                aria-pressed={region === name}
                onClick={() => chooseRegion(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className={`mt-10 grid gap-12 ${region === "United States" ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16" : ""}`}>
            {region === "United States" && (
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-2xl">Representatives by state</h2>
                <p className="mb-6 mt-2 text-sm text-muted-foreground">
                  Select a highlighted state to see the representatives listed there.
                </p>
                <StateTileMap counts={stateCounts} selected={state} onSelect={setState} />
              </div>
            )}

            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <label htmlFor="rep-search" className="sr-only">
                  Search by name, city or state
                </label>
                <Input
                  id="rep-search"
                  type="search"
                  placeholder="Search by name, city or state"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-12 bg-transparent pl-9"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <p role="status">
                  {filtered.length} {filtered.length === 1 ? "representative" : "representatives"}
                  {state ? ` in ${stateNames[state]}` : ""}
                </p>
                {state && (
                  <button
                    type="button"
                    onClick={() => setState(null)}
                    className="inline-flex items-center gap-1 text-foreground underline underline-offset-4"
                  >
                    <X className="h-3 w-3" />
                    Show all states
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <ul className="mt-6 grid gap-x-10 border-t border-border md:grid-cols-2">
                  {filtered.map((rep) => (
                    <li key={rep.name} className="border-b border-border py-6">
                      <h3 className="text-2xl leading-snug">{rep.name}</h3>
                      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <p className="flex gap-2.5">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>
                              <span className="block">{rep.address}</span>
                              {[rep.city, rep.state, rep.zip].filter(Boolean).join(" ")}
                            </span>
                          </p>
                        <p className="flex gap-2.5">
                            <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <a href={`tel:${rep.phone.replace(/[^\d+]/g, "")}`} className="hover:text-foreground">
                              {rep.phone}
                            </a>
                          </p>
                        <p className="flex gap-2.5">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <a href={`mailto:${rep.email}`} className="min-w-0 break-all hover:text-foreground">
                              {rep.email}
                            </a>
                          </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-t border-border py-20 text-center">
                  <h3 className="text-3xl font-light">No representatives match your search</h3>
                  <p className="mt-3 text-muted-foreground">Clear your filters, or contact us and we’ll connect you.</p>
                  <Button onClick={clearFilters} variant="outline" size="lg" className="mt-8 bg-transparent">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Can’t find a representative?"
        description="Contact our team and we’ll connect you with the right person for your project."
      />
    </main>
  )
}
