"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { USMapSVG } from "@/components/us-map-svg"
import { representatives } from "@/data/representatives"
import { Search, MapPin, Phone, Mail, Navigation, Building2, Globe } from "lucide-react"

export default function RepresentativesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestRep, setNearestRep] = useState<string | null>(null)
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt")
  const [activeTab, setActiveTab] = useState<"representatives" | "distributors">("representatives")

  // Request user location
  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          setLocationPermission("granted")
          findNearestRepresentative(location)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationPermission("denied")
        },
      )
    }
  }

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Find nearest representative based on user location
  const findNearestRepresentative = (location: { lat: number; lng: number }) => {
    let nearest = representatives[0]
    let minDistance = calculateDistance(location.lat, location.lng, representatives[0].lat, representatives[0].lng)

    representatives.forEach((rep) => {
      const distance = calculateDistance(location.lat, location.lng, rep.lat, rep.lng)
      if (distance < minDistance) {
        minDistance = distance
        nearest = rep
      }
    })

    setNearestRep(nearest.id)
  }

  // Filter representatives
  const filteredReps = representatives.filter((rep) => {
    const matchesType = rep.type === activeTab.slice(0, -1) // Remove 's' from 'representatives' or 'distributors'

    const matchesSearch =
      searchQuery === "" ||
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.states.some((state) => state.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rep.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.state.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesState = selectedStates.length === 0 || rep.stateAbbreviations.some((s) => selectedStates.includes(s))

    return matchesType && matchesSearch && matchesState
  })

  const handleStateClick = (stateAbbr: string) => {
    setSelectedStates((prev) => (prev.includes(stateAbbr) ? prev.filter((s) => s !== stateAbbr) : [...prev, stateAbbr]))
  }

  const clearFilters = () => {
    setSelectedStates([])
    setSearchQuery("")
    setNearestRep(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Find Your Local Expert
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-balance">
              Representatives & Distributors
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty px-4">
              Connect with Zaniboni Lighting representatives and authorized distributors in your area. Our network of
              experienced professionals is ready to help with your lighting projects.
            </p>

            {/* Location Permission */}
            {locationPermission === "prompt" && (
              <div className="flex justify-center pt-4">
                <Button onClick={requestLocation} size="lg" className="gap-2 w-full sm:w-auto">
                  <Navigation className="h-5 w-5" />
                  Find Nearest Location
                </Button>
              </div>
            )}

            {locationPermission === "granted" && userLocation && (
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <MapPin className="h-4 w-4" />
                Location detected - showing nearest location
              </div>
            )}

            {locationPermission === "denied" && (
              <div className="text-sm text-muted-foreground">
                Location access denied. You can still search manually below.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-10 sm:py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">Interactive Coverage Map</h2>
              <p className="text-sm sm:text-base text-muted-foreground px-4">Click on a state to filter by location</p>
            </div>

            <Card className="p-3 sm:p-4 md:p-8 bg-gradient-to-br from-card via-card to-muted/20 border-2 shadow-xl">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <USMapSVG
                  selectedStates={selectedStates}
                  onStateClick={handleStateClick}
                  hoveredState={hoveredState}
                  onStateHover={setHoveredState}
                />
              </div>

              {selectedStates.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                  <span className="text-sm sm:text-base font-medium">Selected states:</span>
                  {selectedStates.map((state) => (
                    <Badge key={state} variant="secondary" className="gap-1">
                      {state}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStates([])}>
                    Clear
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Listings */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, company, state, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
              {(searchQuery || selectedStates.length > 0 || nearestRep) && (
                <Button variant="outline" onClick={clearFilters} className="w-full md:w-auto bg-transparent">
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Tabs to separate Representatives and Distributors */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "representatives" | "distributors")}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="representatives" className="text-xs sm:text-sm">
                  Representatives
                </TabsTrigger>
                <TabsTrigger value="distributors" className="text-xs sm:text-sm">
                  Distributors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="representatives" className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                {/* Results Count */}
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Showing {filteredReps.length} {filteredReps.length === 1 ? "representative" : "representatives"}
                  {selectedStates.length > 0 && ` in ${selectedStates.join(", ")}`}
                </div>

                {/* Representatives Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filteredReps.map((rep) => (
                    <Card
                      key={rep.id}
                      className={`p-6 hover:shadow-lg transition-all ${
                        nearestRep === rep.id ? "ring-2 ring-primary shadow-lg" : ""
                      }`}
                    >
                      {nearestRep === rep.id && (
                        <Badge className="mb-4 bg-green-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          Nearest to You
                        </Badge>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{rep.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm">{rep.company}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                            <div>
                              <div>{rep.address}</div>
                              <div>
                                {rep.city}, {rep.state} {rep.zip}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${rep.phone}`} className="hover:text-primary transition-colors">
                              {rep.phone}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${rep.email}`} className="hover:text-primary transition-colors">
                              {rep.email}
                            </a>
                          </div>

                          {rep.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`https://${rep.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                              >
                                {rep.website}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border">
                          <div className="text-sm font-medium mb-2">Coverage Area:</div>
                          <div className="flex flex-wrap gap-1">
                            {rep.stateAbbreviations.map((state) => (
                              <Badge key={state} variant="outline" className="text-xs">
                                {state}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">{rep.territories}</div>
                        </div>

                        <Button className="w-full" asChild>
                          <a href={`mailto:${rep.email}`}>Contact Representative</a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredReps.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No representatives found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filters. Contact us directly for assistance.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="distributors" className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                {/* Results Count */}
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Showing {filteredReps.length} {filteredReps.length === 1 ? "distributor" : "distributors"}
                  {selectedStates.length > 0 && ` in ${selectedStates.join(", ")}`}
                </div>

                {/* Distributors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filteredReps.map((rep) => (
                    <Card
                      key={rep.id}
                      className={`p-6 hover:shadow-lg transition-all ${
                        nearestRep === rep.id ? "ring-2 ring-primary shadow-lg" : ""
                      }`}
                    >
                      {nearestRep === rep.id && (
                        <Badge className="mb-4 bg-green-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          Nearest to You
                        </Badge>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{rep.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm">{rep.company}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                            <div>
                              <div>{rep.address}</div>
                              <div>
                                {rep.city}, {rep.state} {rep.zip}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${rep.phone}`} className="hover:text-primary transition-colors">
                              {rep.phone}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${rep.email}`} className="hover:text-primary transition-colors">
                              {rep.email}
                            </a>
                          </div>

                          {rep.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`https://${rep.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                              >
                                {rep.website}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border">
                          <div className="text-sm font-medium mb-2">Coverage Area:</div>
                          <div className="flex flex-wrap gap-1">
                            {rep.stateAbbreviations.map((state) => (
                              <Badge key={state} variant="outline" className="text-xs">
                                {state}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">{rep.territories}</div>
                        </div>

                        <Button className="w-full" asChild>
                          <a href={`mailto:${rep.email}`}>Contact Distributor</a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredReps.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No distributors found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filters. Contact us directly for assistance.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">Can't Find a Representative?</h2>
            <p className="text-base sm:text-lg opacity-90 px-4">
              Contact our main office and we'll connect you with the right lighting expert for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <a href="/contact">Contact Us</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
                asChild
              >
                <a href="tel:+18005551234">Call +1 (800) 555-1234</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
