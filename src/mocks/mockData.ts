import type { Order } from '@/types/order';

export const mockOrders: Order[] = [
  {
    id: "1",
    reference: "ORD-2024-001",
    provider: "Global Shipping Co",
    status: "IN_TRANSIT",
    eta: "2024-07-20",
    creationDate: "2024-07-10",
    origin: "Shanghai, China",
    destination: "Los Angeles, CA",
    trackingNumber: "GSC123456789",
    notes: "Express delivery requested"
  },
  {
    id: "2",
    reference: "ORD-2024-002",
    provider: "Maritime Express",
    status: "DELIVERED",
    eta: "2024-07-15",
    creationDate: "2024-07-05",
    origin: "Hamburg, Germany",
    destination: "New York, NY",
    trackingNumber: "ME987654321",
    notes: "Customs cleared successfully"
  },
  {
    id: "3",
    reference: "ORD-2024-003",
    provider: "Pacific Logistics",
    status: "PENDING",
    eta: "2024-07-25",
    creationDate: "2024-07-12",
    origin: "Tokyo, Japan",
    destination: "Seattle, WA",
    trackingNumber: "PL456789123",
    notes: "Awaiting customs documentation"
  },
  {
    id: "4",
    reference: "ORD-2024-004",
    provider: "Atlantic Freight",
    status: "PROBLEM",
    eta: "2024-07-18",
    creationDate: "2024-07-08",
    origin: "Rotterdam, Netherlands",
    destination: "Miami, FL",
    trackingNumber: "AF789123456",
    notes: "Weather delay at origin port"
  },
  {
    id: "5",
    reference: "ORD-2024-005",
    provider: "Global Shipping Co",
    status: "CANCELLED",
    eta: "2024-07-22",
    creationDate: "2024-07-11",
    origin: "Busan, South Korea",
    destination: "Long Beach, CA",
    trackingNumber: "GSC234567890",
    notes: "Cancelled due to supplier issues"
  },
  {
    id: "6",
    reference: "ORD-2024-006",
    provider: "Euro Transport",
    status: "IN_TRANSIT",
    eta: "2024-07-19",
    creationDate: "2024-07-09",
    origin: "Barcelona, Spain",
    destination: "Houston, TX",
    trackingNumber: "ET345678901",
    notes: "Container loaded on vessel MSC Diana"
  },
  {
    id: "7",
    reference: "ORD-2024-007",
    provider: "Pacific Logistics",
    status: "DELIVERED",
    eta: "2024-07-16",
    creationDate: "2024-07-06",
    origin: "Hong Kong",
    destination: "Oakland, CA",
    trackingNumber: "PL567890234",
    notes: "Early delivery completed"
  },
  {
    id: "8",
    reference: "ORD-2024-008",
    provider: "Maritime Express",
    status: "PENDING",
    eta: "2024-07-26",
    creationDate: "2024-07-13",
    origin: "Antwerp, Belgium",
    destination: "Savannah, GA",
    trackingNumber: "ME678901345",
    notes: "Documentation under review"
  },
  {
    id: "9",
    reference: "ORD-2024-009",
    provider: "Asia Pacific Shipping",
    status: "IN_TRANSIT",
    eta: "2024-07-21",
    creationDate: "2024-07-07",
    origin: "Singapore",
    destination: "Norfolk, VA",
    trackingNumber: "APS789012456",
    notes: "Transit via Suez Canal"
  },
  {
    id: "10",
    reference: "ORD-2024-010",
    provider: "Atlantic Freight",
    status: "DELIVERED",
    eta: "2024-07-17",
    creationDate: "2024-07-04",
    origin: "Le Havre, France",
    destination: "Charleston, SC",
    trackingNumber: "AF890123567",
    notes: "Successfully delivered to warehouse"
  },
  {
    id: "11",
    reference: "ORD-2024-011",
    provider: "Mediterranean Lines",
    status: "PENDING",
    eta: "2024-07-27",
    creationDate: "2024-07-14",
    origin: "Valencia, Spain",
    destination: "Jacksonville, FL",
    trackingNumber: "ML901234678",
    notes: "Waiting for vessel assignment"
  },
  {
    id: "12",
    reference: "ORD-2024-012",
    provider: "Global Shipping Co",
    status: "IN_TRANSIT",
    eta: "2024-07-23",
    creationDate: "2024-07-10",
    origin: "Qingdao, China",
    destination: "Tacoma, WA",
    trackingNumber: "GSC012345789",
    notes: "Container secured on deck"
  },
  {
    id: "13",
    reference: "ORD-2024-013",
    provider: "Nordic Transport",
    status: "PROBLEM",
    eta: "2024-07-24",
    creationDate: "2024-07-12",
    origin: "Gothenburg, Sweden",
    destination: "Boston, MA",
    trackingNumber: "NT123456890",
    notes: "Equipment failure, alternative vessel arranged"
  },
  {
    id: "14",
    reference: "ORD-2024-014",
    provider: "Pacific Logistics",
    status: "DELIVERED",
    eta: "2024-07-14",
    creationDate: "2024-07-03",
    origin: "Yokohama, Japan",
    destination: "Portland, OR",
    trackingNumber: "PL234567901",
    notes: "Expedited clearance completed"
  },
  {
    id: "15",
    reference: "ORD-2024-015",
    provider: "Euro Transport",
    status: "PENDING",
    eta: "2024-07-28",
    creationDate: "2024-07-15",
    origin: "Genoa, Italy",
    destination: "New Orleans, LA",
    trackingNumber: "ET345679012",
    notes: "Awaiting berth availability"
  },
  {
    id: "16",
    reference: "ORD-2024-016",
    provider: "Asia Pacific Shipping",
    status: "IN_TRANSIT",
    eta: "2024-07-20",
    creationDate: "2024-07-08",
    origin: "Manila, Philippines",
    destination: "San Francisco, CA",
    trackingNumber: "APS456780123",
    notes: "On schedule for delivery"
  },
  {
    id: "17",
    reference: "ORD-2024-017",
    provider: "Atlantic Freight",
    status: "CANCELLED",
    eta: "2024-07-29",
    creationDate: "2024-07-16",
    origin: "Liverpool, UK",
    destination: "Baltimore, MD",
    trackingNumber: "AF567891234",
    notes: "Order cancelled by customer request"
  },
  {
    id: "18",
    reference: "ORD-2024-018",
    provider: "Maritime Express",
    status: "DELIVERED",
    eta: "2024-07-13",
    creationDate: "2024-07-02",
    origin: "Felixstowe, UK",
    destination: "Elizabeth, NJ",
    trackingNumber: "ME678902345",
    notes: "Delivered ahead of schedule"
  },
  {
    id: "19",
    reference: "ORD-2024-019",
    provider: "Mediterranean Lines",
    status: "IN_TRANSIT",
    eta: "2024-07-25",
    creationDate: "2024-07-11",
    origin: "Piraeus, Greece",
    destination: "Galveston, TX",
    trackingNumber: "ML789013456",
    notes: "Vessel departed on schedule"
  },
  {
    id: "20",
    reference: "ORD-2024-020",
    provider: "Global Shipping Co",
    status: "PENDING",
    eta: "2024-07-30",
    creationDate: "2024-07-17",
    origin: "Kaohsiung, Taiwan",
    destination: "Los Angeles, CA",
    trackingNumber: "GSC890124567",
    notes: "Preparing for shipment"
  },
  {
    id: "21",
    reference: "ORD-2024-021",
    provider: "Nordic Transport",
    status: "DELIVERED",
    eta: "2024-07-12",
    creationDate: "2024-07-01",
    origin: "Oslo, Norway",
    destination: "Philadelphia, PA",
    trackingNumber: "NT901235678",
    notes: "Cold chain maintained throughout transit"
  },
  {
    id: "22",
    reference: "ORD-2024-022",
    provider: "Pacific Logistics",
    status: "PROBLEM",
    eta: "2024-07-26",
    creationDate: "2024-07-13",
    origin: "Kobe, Japan",
    destination: "Seattle, WA",
    trackingNumber: "PL012346789",
    notes: "Customs hold - additional documentation required"
  },
  {
    id: "23",
    reference: "ORD-2024-023",
    provider: "Euro Transport",
    status: "IN_TRANSIT",
    eta: "2024-07-22",
    creationDate: "2024-07-09",
    origin: "Marseille, France",
    destination: "Mobile, AL",
    trackingNumber: "ET123457890",
    notes: "Container loaded on MV Atlantic Star"
  },
  {
    id: "24",
    reference: "ORD-2024-024",
    provider: "Asia Pacific Shipping",
    status: "PENDING",
    eta: "2024-07-31",
    creationDate: "2024-07-18",
    origin: "Jakarta, Indonesia",
    destination: "San Pedro, CA",
    trackingNumber: "APS234568901",
    notes: "Export license verification in progress"
  },
  {
    id: "25",
    reference: "ORD-2024-025",
    provider: "Atlantic Freight",
    status: "IN_TRANSIT",
    eta: "2024-07-24",
    creationDate: "2024-07-12",
    origin: "Bremerhaven, Germany",
    destination: "Virginia Beach, VA",
    trackingNumber: "AF345679012",
    notes: "Transshipment in Rotterdam completed"
  },
  {
    id: "26",
    reference: "ORD-2024-026",
    provider: "Global Shipping Co",
    status: "PENDING",
    eta: "2024-08-01",
    creationDate: "2024-07-19",
    origin: "Shenzhen, China",
    destination: "Oakland, CA",
    trackingNumber: "GSC345678901",
    notes: "Awaiting export documentation"
  },
  {
    id: "27",
    reference: "ORD-2024-027",
    provider: "Mediterranean Lines",
    status: "DELIVERED",
    eta: "2024-07-11",
    creationDate: "2024-06-30",
    origin: "Naples, Italy",
    destination: "Savannah, GA",
    trackingNumber: "ML456789012",
    notes: "Successfully delivered to consignee"
  },
  {
    id: "28",
    reference: "ORD-2024-028",
    provider: "Nordic Transport",
    status: "IN_TRANSIT",
    eta: "2024-07-30",
    creationDate: "2024-07-15",
    origin: "Stockholm, Sweden",
    destination: "New York, NY",
    trackingNumber: "NT567890123",
    notes: "Container loaded, vessel departed"
  },
  {
    id: "29",
    reference: "ORD-2024-029",
    provider: "Pacific Logistics",
    status: "CANCELLED",
    eta: "2024-08-02",
    creationDate: "2024-07-20",
    origin: "Busan, South Korea",
    destination: "Tacoma, WA",
    trackingNumber: "PL678901234",
    notes: "Cancelled - change in delivery requirements"
  },
  {
    id: "30",
    reference: "ORD-2024-030",
    provider: "Asia Pacific Shipping",
    status: "PROBLEM",
    eta: "2024-07-28",
    creationDate: "2024-07-14",
    origin: "Port Klang, Malaysia",
    destination: "Long Beach, CA",
    trackingNumber: "APS789012345",
    notes: "Vessel delayed due to port congestion"
  },
  {
    id: "31",
    reference: "ORD-2024-031",
    provider: "Euro Transport",
    status: "DELIVERED",
    eta: "2024-07-08",
    creationDate: "2024-06-28",
    origin: "Lisbon, Portugal",
    destination: "Norfolk, VA",
    trackingNumber: "ET890123456",
    notes: "Early delivery, no issues reported"
  },
  {
    id: "32",
    reference: "ORD-2024-032",
    provider: "Maritime Express",
    status: "IN_TRANSIT",
    eta: "2024-08-03",
    creationDate: "2024-07-18",
    origin: "Cork, Ireland",
    destination: "Boston, MA",
    trackingNumber: "ME901234567",
    notes: "Transatlantic route, on schedule"
  },
  {
    id: "33",
    reference: "ORD-2024-033",
    provider: "Atlantic Freight",
    status: "PENDING",
    eta: "2024-08-05",
    creationDate: "2024-07-21",
    origin: "Casablanca, Morocco",
    destination: "Charleston, SC",
    trackingNumber: "AF012345678",
    notes: "Pending vessel space allocation"
  },
  {
    id: "34",
    reference: "ORD-2024-034",
    provider: "Global Shipping Co",
    status: "DELIVERED",
    eta: "2024-07-05",
    creationDate: "2024-06-25",
    origin: "Ningbo, China",
    destination: "Seattle, WA",
    trackingNumber: "GSC123456790",
    notes: "Delivered ahead of schedule"
  },
  {
    id: "35",
    reference: "ORD-2024-035",
    provider: "Mediterranean Lines",
    status: "PROBLEM",
    eta: "2024-08-01",
    creationDate: "2024-07-17",
    origin: "Algeciras, Spain",
    destination: "Miami, FL",
    trackingNumber: "ML234567891",
    notes: "Customs inspection delay"
  }
]; 