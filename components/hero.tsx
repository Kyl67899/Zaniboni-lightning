"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

function SlotCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
    const startTime = Date.now()
    const endTime = startTime + duration

    const animate = () => {
      const now = Date.now()
      const remaining = endTime - now

      if (remaining <= 0) {
        setCount(end)
        setIsAnimating(false)
        return
      }

      // Ease out quad function for smooth deceleration
      const progress = 1 - Math.pow(remaining / duration, 2)
      const currentCount = Math.floor(progress * end)
      setCount(currentCount)

      requestAnimationFrame(animate)
    }

    const timeout = setTimeout(() => {
      animate()
    }, 500) // Delay start for staggered effect

    return () => clearTimeout(timeout)
  }, [end, duration])

  return (
    <div className="relative h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] overflow-hidden">
      <div
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white transition-transform duration-100 ${
          isAnimating ? "animate-slot-spin" : ""
        }`}
      >
        {count}
        {suffix}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-architectural-lighting-in-luxury-commercial.jpg"
          alt="Zaniboni Lighting showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight text-balance px-2">
            Lighting Excellence
            <span className="block text-accent mt-2">Beautifully Crafted</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty px-4">
            Premium architectural lighting solutions. 100% independent, Made in the USA. We better the world by lighting
            it beautifully.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 sm:px-8 w-full sm:w-auto"
            >
              Explore Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 sm:px-8 bg-transparent w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </div>

          {/* Stats - Updated with casino slot machine counter effect */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-12 max-w-2xl mx-auto px-4">
            <div className="text-center">
              <SlotCounter end={25} suffix="+" duration={2000} />
              <div className="text-xs sm:text-sm text-white/70 mt-1">Years Excellence</div>
            </div>
            <div className="text-center border-x border-white/20">
              <SlotCounter end={5000} suffix="+" duration={2500} />
              <div className="text-xs sm:text-sm text-white/70 mt-1">Projects Completed</div>
            </div>
            <div className="text-center">
              <SlotCounter end={100} suffix="%" duration={2200} />
              <div className="text-xs sm:text-sm text-white/70 mt-1">Made in USA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 -mt-6 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
