"use client"

interface USMapInteractiveProps {
  selectedStates: string[]
  onStateClick: (stateAbbr: string) => void
  hoveredState: string | null
  onStateHover: (stateAbbr: string | null) => void
}

//TODO: fix map

export function USMapInteractive({ selectedStates, onStateClick, hoveredState, onStateHover }: USMapInteractiveProps) {
  const getStateClass = (stateAbbr: string) => {
    const isSelected = selectedStates.includes(stateAbbr)
    const isHovered = hoveredState === stateAbbr

    if (isSelected) return "fill-secondary stroke-background stroke-2 cursor-pointer"
    if (isHovered) return "fill-primary/20 stroke-primary stroke-2 cursor-pointer transition-all"
    return "fill-muted hover:fill-primary/10 stroke-border cursor-pointer transition-all"
  }

  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 960 600" className="w-full h-full">
        {/* Simplified US Map with clickable states */}
        {/* California */}
        <path
          d="M 90 180 L 90 350 L 150 370 L 160 200 Z"
          className={getStateClass("CA")}
          onClick={() => onStateClick("CA")}
          onMouseEnter={() => onStateHover("CA")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="115" y="280" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          CA
        </text>

        {/* Texas */}
        <path
          d="M 380 320 L 380 420 L 500 420 L 500 340 L 450 320 Z"
          className={getStateClass("TX")}
          onClick={() => onStateClick("TX")}
          onMouseEnter={() => onStateHover("TX")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="430" y="375" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          TX
        </text>

        {/* Florida */}
        <path
          d="M 700 380 L 750 380 L 760 430 L 720 440 L 700 420 Z"
          className={getStateClass("FL")}
          onClick={() => onStateClick("FL")}
          onMouseEnter={() => onStateHover("FL")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="720" y="415" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          FL
        </text>

        {/* New York */}
        <path
          d="M 760 140 L 820 140 L 820 180 L 760 180 Z"
          className={getStateClass("NY")}
          onClick={() => onStateClick("NY")}
          onMouseEnter={() => onStateHover("NY")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="780" y="165" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          NY
        </text>

        {/* Illinois */}
        <path
          d="M 540 220 L 580 220 L 580 280 L 540 280 Z"
          className={getStateClass("IL")}
          onClick={() => onStateClick("IL")}
          onMouseEnter={() => onStateHover("IL")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="555" y="255" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          IL
        </text>

        {/* Washington */}
        <path
          d="M 100 80 L 180 80 L 180 120 L 100 120 Z"
          className={getStateClass("WA")}
          onClick={() => onStateClick("WA")}
          onMouseEnter={() => onStateHover("WA")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="130" y="105" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          WA
        </text>

        {/* Oregon */}
        <path
          d="M 100 130 L 180 130 L 180 170 L 100 170 Z"
          className={getStateClass("OR")}
          onClick={() => onStateClick("OR")}
          onMouseEnter={() => onStateHover("OR")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="130" y="155" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          OR
        </text>

        {/* Nevada */}
        <path
          d="M 170 180 L 220 180 L 220 280 L 170 280 Z"
          className={getStateClass("NV")}
          onClick={() => onStateClick("NV")}
          onMouseEnter={() => onStateHover("NV")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="190" y="235" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          NV
        </text>

        {/* Arizona */}
        <path
          d="M 170 290 L 260 290 L 260 370 L 170 370 Z"
          className={getStateClass("AZ")}
          onClick={() => onStateClick("AZ")}
          onMouseEnter={() => onStateHover("AZ")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="205" y="335" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          AZ
        </text>

        {/* Colorado */}
        <path
          d="M 270 200 L 370 200 L 370 280 L 270 280 Z"
          className={getStateClass("CO")}
          onClick={() => onStateClick("CO")}
          onMouseEnter={() => onStateHover("CO")}
          onMouseLeave={() => onStateHover(null)}
        />
        <text x="310" y="245" className="text-[12px] fill-foreground pointer-events-none font-semibold">
          CO
        </text>

        {/* Additional states - simplified for demonstration */}
        {/* Add more states as needed */}
      </svg>
    </div>
  )
}
