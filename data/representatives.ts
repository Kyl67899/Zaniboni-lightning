export type RepRegion = "United States" | "Canada" | "Puerto Rico" | "International"

export interface Representative {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state?: string
  zip: string
  region: RepRegion
}

export const repRegions: RepRegion[] = ["United States", "Canada", "Puerto Rico", "International"]

// Fictional sample data. Phone numbers use ranges reserved for fictional use, and email uses example.com.
export const representatives: Representative[] = [
  { name: "Alder Street Lighting", phone: "(206) 555-0101", email: "hello@example.com", address: "210 Sample Street", city: "Seattle", state: "WA", zip: "00001", region: "United States" },
  { name: "Golden Span Lighting Group", phone: "(415) 555-0102", email: "hello@example.com", address: "88 Demo Avenue", city: "San Francisco", state: "CA", zip: "00002", region: "United States" },
  { name: "Palm Row Lighting Partners", phone: "(213) 555-0103", email: "hello@example.com", address: "1400 Sample Boulevard", city: "Los Angeles", state: "CA", zip: "00003", region: "United States" },
  { name: "Red Mesa Lighting Sales", phone: "(602) 555-0104", email: "hello@example.com", address: "75 Demo Road", city: "Phoenix", state: "AZ", zip: "00004", region: "United States" },
  { name: "High Plains Lighting", phone: "(303) 555-0105", email: "hello@example.com", address: "320 Sample Way", city: "Denver", state: "CO", zip: "00005", region: "United States" },
  { name: "Lone Oak Lighting Associates", phone: "(214) 555-0106", email: "hello@example.com", address: "600 Demo Parkway", city: "Dallas", state: "TX", zip: "00006", region: "United States" },
  { name: "Bayou Light & Controls", phone: "(713) 555-0107", email: "hello@example.com", address: "45 Sample Lane", city: "Houston", state: "TX", zip: "00007", region: "United States" },
  { name: "Lakeshore Lighting Works", phone: "(312) 555-0108", email: "hello@example.com", address: "900 Demo Street", city: "Chicago", state: "IL", zip: "00008", region: "United States" },
  { name: "North Star Lighting Reps", phone: "(612) 555-0109", email: "hello@example.com", address: "12 Sample Court", city: "Minneapolis", state: "MN", zip: "00009", region: "United States" },
  { name: "Motor City Lighting Group", phone: "(313) 555-0110", email: "hello@example.com", address: "510 Demo Drive", city: "Detroit", state: "MI", zip: "00010", region: "United States" },
  { name: "Peachtree Lighting Source", phone: "(404) 555-0111", email: "hello@example.com", address: "33 Sample Plaza", city: "Atlanta", state: "GA", zip: "00011", region: "United States" },
  { name: "Tidewater Lighting Partners", phone: "(305) 555-0112", email: "hello@example.com", address: "700 Demo Causeway", city: "Miami", state: "FL", zip: "00012", region: "United States" },
  { name: "Capital Lighting Associates", phone: "(202) 555-0113", email: "hello@example.com", address: "18 Sample Square", city: "Washington", state: "DC", zip: "00013", region: "United States" },
  { name: "Liberty Bell Lighting Sales", phone: "(215) 555-0114", email: "hello@example.com", address: "250 Demo Row", city: "Philadelphia", state: "PA", zip: "00014", region: "United States" },
  { name: "Hudson Line Lighting", phone: "(212) 555-0115", email: "hello@example.com", address: "64 Sample Avenue", city: "New York", state: "NY", zip: "00015", region: "United States" },
  { name: "Harbor Light Reps", phone: "(617) 555-0116", email: "hello@example.com", address: "9 Demo Wharf", city: "Boston", state: "MA", zip: "00016", region: "United States" },
  { name: "Maple Line Lighting", phone: "(416) 555-0117", email: "hello@example.com", address: "120 Sample Street", city: "Toronto", state: "ON", zip: "A0A 0A0", region: "Canada" },
  { name: "Cascade Lighting Agency", phone: "(604) 555-0118", email: "hello@example.com", address: "75 Demo Avenue", city: "Vancouver", state: "BC", zip: "A0A 0A1", region: "Canada" },
  { name: "Isla Lighting Partners", phone: "(787) 555-0119", email: "hello@example.com", address: "40 Calle Demo", city: "San Juan", state: "PR", zip: "00017", region: "Puerto Rico" },
  { name: "Thames Light Studio", phone: "+44 20 7946 0142", email: "hello@example.com", address: "5 Sample Yard", city: "London", zip: "AA0 0AA", region: "International" },
]
