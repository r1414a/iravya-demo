export const MOCK_TRIPS = {
  "TRP-001": {
    driver: {
      name: "Rajesh Kumar",
      id: "DRV-4821",
      phone: "+91 98765 43210",
      avatar: "RK",
      rating: 4.8,
      trips: 1240,
      experience: "8 years",
      vehicle: "Heavy Freight",
    },
    trip: {
      truck: "MH-12-AB-4567",
      type: "Heavy Freight",
      capacity: "20 Tons",
      start: "Pune Logistics Hub, Pimpri-Chinchwad",
      end: "Phoenix Palladium, Mumbai",
      startTime: "06:30 AM",
      eta: "11:00 AM",
      distance: "147 km",
      status: "in_transit",
      cargo: "Apparel & Accessories",
      speed: "72 km/h",
      fuel: 68,
    },
    status: "in_transit",
    progressFraction: 0.42,
    alerts: ["Minor slowdown near expressway"],
    waypoints: [
      [18.6298, 73.8008], // Pimpri-Chinchwad [lat,lng]
      [18.5204, 73.8567], // Pune
      [18.3635, 73.8664], // Khopoli
      [18.9667, 72.8333], // Navi Mumbai
      [19.0760, 72.8777], // Mumbai
    ],
  },

  "TRP-002": {
    driver: {
      name: "Suresh Patil",
      id: "DRV-3309",
      phone: "+91 97654 32109",
      avatar: "SP",
      rating: 4.5,
      trips: 876,
      experience: "6 years",
      vehicle: "Medium Carrier",
    },
    trip: {
      truck: "MH-14-CD-8823",
      type: "Medium Carrier",
      capacity: "10 Tons",
      start: "Nashik DC, MIDC Satpur",
      end: "Zudio Store, Aurangabad Mall",
      startTime: "07:00 AM",
      eta: "12:30 PM",
      distance: "188 km",
      status: "delayed",
      cargo: "Textiles",
      speed: "45 km/h",
      fuel: 42,
    },
    status: "delayed",
    progressFraction: 0.28,
    alerts: ["Route deviation detected near Sinnar", "Speed below expected threshold"],
    waypoints: [
      [19.9975, 73.7898], // Nashik
      [19.8486, 74.0133], // Sinnar
      [19.7654, 74.4762], // Shirdi
      [19.7263, 74.7378], // Kopargaon
      [19.8762, 75.3433], // Aurangabad
    ],
  },

  "TRP-003": {
    driver: {
      name: "Anil Deshmukh",
      id: "DRV-5512",
      phone: "+91 96543 21098",
      avatar: "AD",
      rating: 4.9,
      trips: 2105,
      experience: "12 years",
      vehicle: "Light Commercial",
    },
    trip: {
      truck: "MH-20-EF-1122",
      type: "Light Commercial",
      capacity: "5 Tons",
      start: "Nagpur Distribution Center",
      end: "Tata Cliq Store, Amravati",
      startTime: "08:00 AM",
      eta: "10:30 AM",
      distance: "150 km",
      status: "delivered",
      cargo: "FMCG Goods",
      speed: "0 km/h",
      fuel: 55,
    },
    status: "delivered",
    progressFraction: 1,
    alerts: [],
    waypoints: [
      [21.1458, 79.0882], // Nagpur
      [21.0564, 78.5625], // Wardha
      [20.9912, 78.1178], // Dhamangaon
      [20.9374, 77.7796], // Amravati
    ],
  },
};

export const STATUS_CONFIG = {
  in_transit: {
    label: "In Transit",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    text: "#0369a1",
  },
  delayed: {
    label: "Delayed",
    color: "#f59e0b",
    bg: "#fef3c7",
    text: "#b45309",
  },
  delivered: {
    label: "Delivered",
    color: "#10b981",
    bg: "#d1fae5",
    text: "#047857",
  },
};