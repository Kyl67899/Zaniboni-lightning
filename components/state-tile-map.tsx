"use client"

import { cn } from "@/lib/utils"

/** A tile-grid map: every state is one equal square placed roughly where it sits on a US map. */
const tiles: [string, string, number, number][] = [
  ["AK", "Alaska", 0, 0],
  ["ME", "Maine", 0, 10],
  ["WI", "Wisconsin", 1, 5],
  ["VT", "Vermont", 1, 9],
  ["NH", "New Hampshire", 1, 10],
  ["WA", "Washington", 2, 0],
  ["ID", "Idaho", 2, 1],
  ["MT", "Montana", 2, 2],
  ["ND", "North Dakota", 2, 3],
  ["MN", "Minnesota", 2, 4],
  ["IL", "Illinois", 2, 5],
  ["MI", "Michigan", 2, 6],
  ["NY", "New York", 2, 8],
  ["MA", "Massachusetts", 2, 9],
  ["OR", "Oregon", 3, 0],
  ["NV", "Nevada", 3, 1],
  ["WY", "Wyoming", 3, 2],
  ["SD", "South Dakota", 3, 3],
  ["IA", "Iowa", 3, 4],
  ["IN", "Indiana", 3, 5],
  ["OH", "Ohio", 3, 6],
  ["PA", "Pennsylvania", 3, 7],
  ["NJ", "New Jersey", 3, 8],
  ["CT", "Connecticut", 3, 9],
  ["RI", "Rhode Island", 3, 10],
  ["CA", "California", 4, 0],
  ["UT", "Utah", 4, 1],
  ["CO", "Colorado", 4, 2],
  ["NE", "Nebraska", 4, 3],
  ["MO", "Missouri", 4, 4],
  ["KY", "Kentucky", 4, 5],
  ["WV", "West Virginia", 4, 6],
  ["VA", "Virginia", 4, 7],
  ["MD", "Maryland", 4, 8],
  ["DE", "Delaware", 4, 9],
  ["AZ", "Arizona", 5, 1],
  ["NM", "New Mexico", 5, 2],
  ["KS", "Kansas", 5, 3],
  ["AR", "Arkansas", 5, 4],
  ["TN", "Tennessee", 5, 5],
  ["NC", "North Carolina", 5, 6],
  ["SC", "South Carolina", 5, 7],
  ["DC", "Washington, D.C.", 5, 8],
  ["OK", "Oklahoma", 6, 3],
  ["LA", "Louisiana", 6, 4],
  ["MS", "Mississippi", 6, 5],
  ["AL", "Alabama", 6, 6],
  ["GA", "Georgia", 6, 7],
  ["HI", "Hawaii", 7, 0],
  ["TX", "Texas", 7, 3],
  ["FL", "Florida", 7, 8],
]

export const stateNames = Object.fromEntries(tiles.map(([code, name]) => [code, name]))

export function StateTileMap({
  counts,
  selected,
  onSelect,
}: {
  counts: Record<string, number>
  selected: string | null
  onSelect: (code: string | null) => void
}) {
  return (
    <div
      role="group"
      aria-label="Filter representatives by state"
      className="grid gap-[3px] sm:gap-1"
      style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
    >
      {tiles.map(([code, name, row, column]) => {
        const count = counts[code] ?? 0
        const isSelected = selected === code
        return (
          <button
            key={code}
            type="button"
            disabled={count === 0}
            aria-pressed={isSelected}
            aria-label={`${name}: ${count} ${count === 1 ? "representative" : "representatives"}`}
            title={name}
            onClick={() => onSelect(isSelected ? null : code)}
            style={{ gridRow: row + 1, gridColumn: column + 1 }}
            className={cn(
              "aspect-square text-[10px] tracking-wide transition-colors sm:text-xs",
              count === 0 && "cursor-default bg-muted/70 text-muted-foreground/60",
              count > 0 && !isSelected && "bg-secondary/15 text-foreground hover:bg-secondary/35",
              isSelected && "bg-foreground text-background",
            )}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
