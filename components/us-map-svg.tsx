"use client"

interface USMapSVGProps {
  selectedStates: string[]
  onStateClick: (stateAbbr: string) => void
  hoveredState: string | null
  onStateHover: (stateAbbr: string | null) => void
}

// State data with accurate SVG paths and coordinates
const statesData = [
  {
    id: "AL",
    name: "Alabama",
    path: "M786,455l1,5l2,5l2,3l2,4l1,3l2,4l0,3l1,3l1,3l0,3l1,3l0,3l0,3l0,3l0,3l0,3l-1,3l0,3l0,3l0,3l-1,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l-49,3l0,-73l-1,-1l-1,-2l-1,-2l-1,-2l-1,-2l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l1,-2l1,-2l1,-2l1,-2l1,-2l1,-2l17,1l15,1l4,0l4,0z",
  },
  {
    id: "AK",
    name: "Alaska",
    path: "M100,550l3,0l3,1l3,1l3,1l3,1l2,1l2,2l2,2l2,2l1,2l1,3l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l3,-1z",
  },
  {
    id: "AZ",
    name: "Arizona",
    path: "M173,344l0,3l0,71l0,3l0,3l-1,3l-1,3l-1,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l3,-1l3,0l3,0l2,0l-38,-1l1,-54l-24,-5l-2,-33l3,0l71,15l2,1l1,1l1,1l1,2l1,2l0,2l0,3l0,2l-1,2l-1,2l-1,2l-1,1l-2,1l-2,1l-2,0l-2,0l-2,0z",
  },
  {
    id: "AR",
    name: "Arkansas",
    path: "M631,390l1,0l0,15l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l-1,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l-2,0l0,-1l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l0,-2l14,0l14,0l14,0l14,0l14,0l14,0l3,0z",
  },
  {
    id: "CA",
    name: "California",
    path: "M91,227l2,3l2,3l2,3l2,3l2,3l2,3l1,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-2,3l-2,3l-2,2l-2,2l-3,2l-3,1l-3,1l-3,0l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-3l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l1,-3l1,-3l1,-3l1,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l0,-3l1,-3l1,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,0l3,1l3,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2z",
  },
  {
    id: "CO",
    name: "Colorado",
    path: "M329,237l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l0,3l-107,0l0,-112l107,0z",
  },
  {
    id: "CT",
    name: "Connecticut",
    path: "M890,217l2,1l2,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,0z",
  },
  {
    id: "DE",
    name: "Delaware",
    path: "M867,262l1,2l1,2l1,2l1,3l0,3l0,3l0,3l-1,3l-1,2l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  {
    id: "FL",
    name: "Florida",
    path: "M787,518l1,3l1,3l1,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-1,3l-2,3l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-3l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "GA",
    name: "Georgia",
    path: "M787,408l1,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-3l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "HI",
    name: "Hawaii",
    path: "M250,545l3,1l3,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l3,-1l3,0l3,0z",
  },
  {
    id: "ID",
    name: "Idaho",
    path: "M198,89l2,2l2,3l2,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-2,3l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-3l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "IL",
    name: "Illinois",
    path: "M654,243l1,2l1,2l1,2l1,3l0,3l0,3l0,3l-1,3l-1,2l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "IN",
    name: "Indiana",
    path: "M706,258l1,2l1,2l1,3l0,3l0,3l0,3l-1,3l-1,2l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "IA",
    name: "Iowa",
    path: "M573,223l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "KS", name: "Kansas", path: "M468,308l107,0l0,53l-107,0l0,-53z" },
  {
    id: "KY",
    name: "Kentucky",
    path: "M733,330l2,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  {
    id: "LA",
    name: "Louisiana",
    path: "M631,483l1,2l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-1,2l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,1l2,1l2,2l1,2z",
  },
  {
    id: "ME",
    name: "Maine",
    path: "M908,89l1,2l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "MD",
    name: "Maryland",
    path: "M853,271l2,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  {
    id: "MA",
    name: "Massachusetts",
    path: "M890,189l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "MI",
    name: "Michigan",
    path: "M706,189l1,2l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "MN",
    name: "Minnesota",
    path: "M573,129l2,2l2,3l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "MS",
    name: "Mississippi",
    path: "M686,455l1,3l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "MO",
    name: "Missouri",
    path: "M631,308l1,2l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "MT", name: "Montana", path: "M329,89l107,0l0,56l-107,0l0,-56z" },
  { id: "NE", name: "Nebraska", path: "M468,237l107,0l0,36l-107,0l0,-36z" },
  {
    id: "NV",
    name: "Nevada",
    path: "M140,227l2,3l2,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-2,3l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "NH",
    name: "New Hampshire",
    path: "M890,145l1,2l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "NJ",
    name: "New Jersey",
    path: "M872,237l1,2l1,3l0,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "NM", name: "New Mexico", path: "M329,344l107,0l0,90l-107,0l0,-90z" },
  {
    id: "NY",
    name: "New York",
    path: "M836,189l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "NC",
    name: "North Carolina",
    path: "M787,330l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  { id: "ND", name: "North Dakota", path: "M468,89l107,0l0,56l-107,0l0,-56z" },
  {
    id: "OH",
    name: "Ohio",
    path: "M733,258l2,1l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  { id: "OK", name: "Oklahoma", path: "M468,361l107,0l0,53l-107,0l0,-53z" },
  {
    id: "OR",
    name: "Oregon",
    path: "M91,145l2,3l2,3l2,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-2,3l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "PA",
    name: "Pennsylvania",
    path: "M806,237l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "RI",
    name: "Rhode Island",
    path: "M899,203l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "SC",
    name: "South Carolina",
    path: "M787,369l1,3l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "SD", name: "South Dakota", path: "M468,145l107,0l0,56l-107,0l0,-56z" },
  { id: "TN", name: "Tennessee", path: "M733,355l71,0l0,28l-71,0l0,-28z" },
  {
    id: "TX",
    name: "Texas",
    path: "M436,414l2,3l2,3l2,3l2,3l1,3l1,3l1,3l1,3l0,3l0,3l0,3l0,3l-1,3l-1,3l-1,3l-2,3l-2,3l-2,2l-2,2l-2,2l-3,2l-3,1l-3,1l-3,0l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-2,-2l-1,-3l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-2l2,-1l3,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "UT", name: "Utah", path: "M222,237l107,0l0,124l-107,0l0,-124z" },
  {
    id: "VT",
    name: "Vermont",
    path: "M881,129l1,2l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "VA",
    name: "Virginia",
    path: "M787,286l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "WA",
    name: "Washington",
    path: "M91,45l2,2l2,3l2,3l2,3l1,3l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,3l-2,2l-2,2l-2,2l-3,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2l1,2l1,3l0,3l0,3l-1,3l-1,2l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  {
    id: "WV",
    name: "West Virginia",
    path: "M787,271l2,2l2,2l1,2l1,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,1l-2,1l-3,0l-3,0l-3,-1l-2,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-2l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1z",
  },
  {
    id: "WI",
    name: "Wisconsin",
    path: "M654,161l2,2l2,3l1,3l1,3l0,3l0,3l0,3l-1,3l-1,3l-2,2l-2,2l-2,2l-2,1l-3,1l-3,0l-3,0l-3,-1l-3,-1l-2,-2l-2,-2l-1,-2l-1,-3l0,-3l0,-3l1,-3l1,-3l2,-2l2,-2l2,-1l2,-1l3,0l3,0l3,1l2,1l2,2z",
  },
  { id: "WY", name: "Wyoming", path: "M329,145l107,0l0,56l-107,0l0,-56z" },
]

export function USMapSVG({ selectedStates, onStateClick, hoveredState, onStateHover }: USMapSVGProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 960 600" className="w-full h-full" style={{ maxWidth: "100%", maxHeight: "100%" }}>
        <g>
          {statesData.map((state) => {
            const isSelected = selectedStates.includes(state.id)
            const isHovered = hoveredState === state.id

            return (
              <g key={state.id}>
                <path
                  d={state.path}
                  fill={
                    isSelected ? "hsl(var(--primary))" : isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted))"
                  }
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => onStateClick(state.id)}
                  onMouseEnter={() => onStateHover(state.id)}
                  onMouseLeave={() => onStateHover(null)}
                  style={{
                    filter: isHovered || isSelected ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none",
                  }}
                />
              </g>
            )
          })}
        </g>

        {/* State Labels - Only show for hovered or selected states */}
        {statesData.map((state) => {
          const isSelected = selectedStates.includes(state.id)
          const isHovered = hoveredState === state.id

          if (!isSelected && !isHovered) return null

          // Calculate approximate center of state path for label placement
          const bbox = state.path.match(/M([\d,]+)/)?.[1].split(",")
          if (!bbox) return null

          const x = Number.parseFloat(bbox[0])
          const y = Number.parseFloat(bbox[1])

          return (
            <text
              key={`label-${state.id}`}
              x={x}
              y={y}
              textAnchor="middle"
              className="pointer-events-none font-bold text-xs md:text-sm"
              fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
            >
              {state.id}
            </text>
          )
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredState && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium pointer-events-none z-10">
          {statesData.find((s) => s.id === hoveredState)?.name}
        </div>
      )}
    </div>
  )
}
