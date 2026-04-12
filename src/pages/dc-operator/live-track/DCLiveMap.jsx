// DCLiveMap.jsx
// ─────────────────────────────────────────────────────────────────────────────
// DC Operator — Live dispatch map
// • All active trips from THIS DC shown as animated trucks on real Mapbox map
// • Each truck moves along its real Mapbox road route (pre-fetched on load)
// • Click any truck → right side panel slides in with full trip details
//   (driver, truck, stops, alerts) — like a flight tracker
// • Top bar: trip count badges, legend, last-updated timestamp
// • All Tailwind — no custom CSS
// • Mock data inline — swap MOCK_DC_TRIPS for your RTK Query hook
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import AdminSubHeader from "@/components/AdminSubHeader"
import {
    X, Truck, Users, MapPin, Clock, AlertTriangle,
    CheckCircle2, Circle, Star, Phone, Navigation,
    Package, RefreshCw, Radio,
} from "lucide-react"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
    in_transit: { label: "In Transit", dot: "bg-sky-500", badge: "bg-sky-100 text-sky-700", bar: "#0ea5e9", markerBg: "#0369a1" },
    delayed: { label: "Delayed", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700", bar: "#f59e0b", markerBg: "#b45309" },
    completed: { label: "Completed", dot: "bg-green-500", badge: "bg-green-100 text-green-700", bar: "#16a34a", markerBg: "#15803d" },
}

// ── Mock data — replace with useGetDCActiveTripsQuery(dcId) ──────────────────
// Each trip has waypoints (for Mapbox Directions) and progressFraction (0-1)
const MOCK_DC_TRIPS = [
    {
        id: "TRP-2841",
        status: "in_transit",
        progressFraction: 0.42,
        truck: { reg: "MH12AB4567", model: "Tata Ace Gold", type: "LCV", capacity: "750 kg" },
        driver: { name: "Ramesh Kumar", id: "DRV-4821", phone: "+91 98765 43210", experience: "8 years", trips: 142, rating: 4.8, avatar: "RK" },
        trip: { cargo: "Apparel — 240 units", startTime: "09:30 AM", eta: "11:45 AM", distance: "28 km", dcName: "Westside Pune Warehouse" },
        alerts: ["Speed: 94 km/h near Wakad — over limit"],
        stops: [
            { name: "Westside — Phoenix Marketcity", address: "Nagar Rd, Pune 411014", status: "pending", time: "10:15 AM" },
            { name: "Westside — Amanora Mall", address: "Hadapsar, Pune 411028", status: "pending", time: "11:45 AM" },
        ],
        waypoints: [[18.6298, 73.7997], [18.5592, 73.9052], [18.5014, 73.9313]],
    },
    {
        id: "TRP-2842",
        status: "in_transit",
        progressFraction: 0.61,
        truck: { reg: "MH14GH5544", model: "Tata 407", type: "MCV", capacity: "3 ton" },
        driver: { name: "Suresh Patil", id: "DRV-3309", phone: "+91 97654 32109", experience: "6 years", trips: 87, rating: 4.5, avatar: "SP" },
        trip: { cargo: "Footwear — 380 pairs", startTime: "08:00 AM", eta: "10:30 AM", distance: "22 km", dcName: "Westside Pune Warehouse" },
        alerts: [],
        stops: [
            { name: "Westside — Seasons Mall", address: "Magarpatta, Pune 411028", status: "completed", time: "09:20 AM" },
            { name: "Westside — Koregaon Park", address: "North Main Rd, Pune", status: "completed", time: "10:05 AM" },
            { name: "Westside — Baner", address: "Balewadi High St, Pune", status: "pending", time: "10:30 AM" },
        ],
        waypoints: [[18.6298, 73.7997], [18.5175, 73.9292], [18.5377, 73.8962], [18.5590, 73.7873]],
    },
    {
        id: "TRP-2843",
        status: "delayed",
        progressFraction: 0.28,
        truck: { reg: "MH12CD8823", model: "Ashok Leyland Dost", type: "LCV", capacity: "1.25 ton" },
        driver: { name: "Anil Deshmukh", id: "DRV-5512", phone: "+91 96543 21098", experience: "12 years", trips: 210, rating: 4.9, avatar: "AD" },
        trip: { cargo: "Accessories — 120 units", startTime: "10:00 AM", eta: "01:30 PM", distance: "35 km", dcName: "Westside Pune Warehouse" },
        alerts: ["Long stop: vehicle stationary 22 min near Kothrud", "Route deviation: 1.8 km off-route"],
        stops: [
            { name: "Westside — Kothrud", address: "FC Road, Pune 411038", status: "pending", time: "11:15 AM" },
            { name: "Westside — Karve Nagar", address: "Karve Rd, Pune 411052", status: "pending", time: "12:20 AM" },
            { name: "Westside — Warje", address: "Mumbai-Bangalore Hwy", status: "pending", time: "01:30 PM" },
        ],
        waypoints: [[18.6298, 73.7997], [18.5074, 73.8077], [18.4938, 73.8143], [18.4829, 73.7932]],
    },
]

// ── Fetch road route from Mapbox Directions API ───────────────────────────────
async function fetchRoute(waypoints) {
    const token = import.meta.env.VITE_MAPBOX_TOKEN
    const coords = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";")
    const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&overview=full&access_token=${token}`
    )
    const data = await res.json()
    if (!data.routes?.length) throw new Error("No route")
    return data.routes[0].geometry.coordinates
}

// ── Interpolate position along route at fraction ──────────────────────────────
function interpolate(pts, t) {
    if (!pts?.length) return null

    if (t <= 0) return pts[0]
    if (t >= 1) return pts[pts.length - 1]

    let total = 0
    const segs = []

    for (let i = 1; i < pts.length; i++) {
        const dx = pts[i][0] - pts[i - 1][0] // lng
        const dy = pts[i][1] - pts[i - 1][1] // lat
        const d = Math.hypot(dx, dy)
        segs.push(d)
        total += d
    }

    let target = total * t

    for (let i = 0; i < segs.length; i++) {
        if (target <= segs[i]) {
            const f = target / segs[i]

            return [
                pts[i][0] + f * (pts[i + 1][0] - pts[i][0]), // lng
                pts[i][1] + f * (pts[i + 1][1] - pts[i][1]), // lat
            ]
        }
        target -= segs[i]
    }

    return pts[pts.length - 1]
}

function splitRouteByFraction(pts, t) {
    if (!pts?.length) return { done: [], rest: [] }

    let total = 0
    const segs = []

    for (let i = 1; i < pts.length; i++) {
        const dx = pts[i][0] - pts[i - 1][0]
        const dy = pts[i][1] - pts[i - 1][1]
        const d = Math.hypot(dx, dy)
        segs.push(d)
        total += d
    }

    let target = total * t
    const done = [pts[0]]

    for (let i = 0; i < segs.length; i++) {
        if (target <= segs[i]) {
            const f = target / segs[i]

            const interpolated = [
                pts[i][0] + f * (pts[i + 1][0] - pts[i][0]),
                pts[i][1] + f * (pts[i + 1][1] - pts[i][1]),
            ]

            done.push(interpolated)

            return {
                done,
                rest: [interpolated, ...pts.slice(i + 1)],
            }
        }

        done.push(pts[i + 1])
        target -= segs[i]
    }

    return { done: pts, rest: [] }
}

// ── Small reusable UI bits ────────────────────────────────────────────────────
function SectionLabel({ children }) {
    return <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">{children}</p>
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between items-start py-2 border-t border-slate-100 text-sm first:border-t-0">
            <span className="text-slate-500 shrink-0 mr-3">{label}</span>
            <span className="text-slate-800 font-medium text-right">{value}</span>
        </div>
    )
}

function InfoGrid({ items }) {
    return (
        <div className="grid grid-cols-2 gap-2 mb-3">
            {items.map(({ label, value }) => (
                <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-2.5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-xs font-medium text-gray-800">{value || "—"}</p>
                </div>
            ))}
        </div>
    )
}

// ── Trip detail panel (slides in from right on truck click) ───────────────────
function TripDetailPanel({ trip, onClose }) {
    const statusCfg = STATUS[trip.status]
    const completedStops = trip.stops.filter(s => s.status === "completed").length
    const progress = Math.round((completedStops / trip.stops.length) * 100)

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-maroon/10 flex items-center justify-center shrink-0">
                            <Truck size={18} className="text-maroon" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900">{trip.truck.reg}</p>
                            <p className="text-xs text-slate-400 font-mono">{trip.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${statusCfg.dot} ${trip.status === "in_transit" ? "animate-pulse" : ""}`} />
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.badge}`}>
                                {statusCfg.label}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Alerts if any */}
                {trip.alerts.length > 0 && (
                    <div className="mt-3 bg-amber-50 rounded-lg px-3 py-2 flex flex-col gap-1">
                        {trip.alerts.map((a, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-amber-800">
                                <AlertTriangle size={11} className="shrink-0" /> {a}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">

                {/* Stop progress */}
                <div className="px-4 py-4">
                    <SectionLabel>Stop progress</SectionLabel>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                        <span>🏭 {trip.trip.dcName.split(" ").slice(0, 2).join(" ")}</span>
                        <span className="font-semibold text-slate-700">{completedStops}/{trip.stops.length} done</span>
                        <span>🏪 Final stop</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                        <div className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%`, background: statusCfg.bar }} />
                    </div>

                    {/* Stop timeline */}
                    <div className="flex flex-col">
                        {trip.stops.map((stop, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full border-2 mt-1 shrink-0 ${stop.status === "completed"
                                        ? "border-green-500 bg-green-500"
                                        : "border-slate-300 bg-white"
                                        }`} />
                                    {i < trip.stops.length - 1 && (
                                        <div className={`w-px flex-1 my-0.5 ${stop.status === "completed" ? "bg-green-300" : "bg-slate-200"}`} />
                                    )}
                                </div>
                                <div className="pb-3 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-xs font-medium truncate ${stop.status === "completed" ? "text-slate-700" : "text-slate-400"}`}>
                                            {stop.name}
                                        </p>
                                        {stop.status === "completed"
                                            ? <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full shrink-0">Done</span>
                                            : <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full shrink-0">Pending</span>
                                        }
                                    </div>
                                    <p className="text-[11px] text-slate-400 truncate">{stop.address}</p>
                                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                        <Clock size={9} /> ETA {stop.time}
                                        {stop.status === "completed" && <CheckCircle2 size={9} className="text-green-500 ml-1" />}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trip stats */}
                <div className="px-4 py-4">
                    <SectionLabel>Trip details</SectionLabel>
                    <InfoGrid items={[
                        { label: "Departed", value: trip.trip.startTime },
                        { label: "ETA", value: trip.trip.eta },
                        { label: "Distance", value: trip.trip.distance },
                        { label: "Cargo", value: trip.trip.cargo },
                    ]} />
                    <DetailRow label="📦 Vehicle type" value={`${trip.truck.type} · ${trip.truck.capacity}`} />
                    <DetailRow label="🚛 Model" value={trip.truck.model} />
                    <DetailRow label="📡 GPS device" value={`GPS-${trip.id.split("-")[1]}-PUNE`} />
                </div>

                {/* Driver */}
                <div className="px-4 py-4">
                    <SectionLabel>Driver</SectionLabel>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                            style={{ background: "linear-gradient(135deg,#d49a3a,#b47820)" }}>
                            {trip.driver.avatar}
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900">{trip.driver.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{trip.driver.id}</p>
                            <div className="flex items-center gap-0.5 mt-0.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star key={s} size={10}
                                        className={s <= Math.floor(trip.driver.rating)
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-200 fill-slate-200"} />
                                ))}
                                <span className="text-xs text-slate-400 ml-1">{trip.driver.rating}</span>
                            </div>
                        </div>
                    </div>
                    <InfoGrid items={[
                        { label: "Experience", value: trip.driver.experience },
                        { label: "Total trips", value: trip.driver.trips.toLocaleString() },
                    ]} />
                    <a href={`tel:${trip.driver.phone}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-sm font-semibold hover:bg-sky-100 transition-colors">
                        <Phone size={13} /> {trip.driver.phone}
                    </a>
                </div>

                {/* Public tracking link */}
                {/* <div className="px-4 py-4 pb-6">
                    <SectionLabel>Tracking</SectionLabel>
                    <a
                        href={`/track?id=${trip.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-maroon/10 border border-maroon/20 text-maroon text-xs font-semibold hover:bg-maroon/15 transition-colors"
                    >
                        <Navigation size={13} /> Open public tracking URL
                    </a>
                </div> */}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DCLiveMap() {
    const mapContainerRef = useRef(null)
    const mapRef = useRef(null)
    const markersRef = useRef({})   // { tripId: mapboxgl.Marker }
    const routesRef = useRef({})   // { tripId: [lat,lng][] }
    const fractionsRef = useRef({})   // { tripId: number }
    const intervalRef = useRef(null)
    const dcMarkersRef = useRef([])
    const stopMarkersRef = useRef([])

    const [fractions, setFractions] = useState(() =>
        Object.fromEntries(MOCK_DC_TRIPS.map(t => [t.id, t.progressFraction]))
    )
    const [routesLoaded, setRoutesLoaded] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [trips] = useState(MOCK_DC_TRIPS)

    const activeCount = trips.filter(t => t.status === "in_transit").length
    const delayedCount = trips.filter(t => t.status === "delayed").length

    // ── Init Mapbox once ──────────────────────────────────────────────────────
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [73.85, 18.56],
            zoom: 10,
        })
        mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right")
    }, [])

    // ── Fetch all routes, draw layers, create markers ─────────────────────────
    useEffect(() => {
        const map = mapRef.current
        if (!map) return

        const TRIP_COLORS = {
            "TRP-2841": "#0369a1",
            "TRP-2842": "#15803d",
            "TRP-2843": "#b45309",
        }

        const addSourceSafe = (id, data) => {
            if (!map.getSource(id)) {
                map.addSource(id, { type: "geojson", data })
            }
        }

        const addLayerSafe = (layer) => {
            if (!map.getLayer(layer.id)) {
                map.addLayer(layer)
            }
        }

        const loadAll = async () => {
            const results = await Promise.allSettled(
                trips.map(t =>
                    fetchRoute(t.waypoints)
                        .then(route => ({ id: t.id, route }))
                        .catch(err => {
                            console.error("Route failed for", t.id, err)
                            return null
                        })
                )
            )

            const drawOnMap = () => {
                const bounds = new mapboxgl.LngLatBounds()

                dcMarkersRef.current.forEach(m => m.remove())
                stopMarkersRef.current.forEach(m => m.remove())

                dcMarkersRef.current = []
                stopMarkersRef.current = []

                results.forEach(r => {
                    if (r.status !== "fulfilled" || !r.value) return

                    const { id, route } = r.value
                    const trip = trips.find(t => t.id === id)

                    routesRef.current[id] = route
                    fractionsRef.current[id] =
                        trip?.progressFraction ?? 0

                    // 🏭 DC marker (first coordinate)
                    if (dcMarkersRef.current.length === 0) {
                        const dcEl = document.createElement("div")
                        dcEl.innerHTML = "🏭"
                        dcEl.style.fontSize = "22px"

                        const popup = new mapboxgl.Popup({
                            offset: 25,
                        }).setHTML(`
    <div style="font-size:12px">
        <strong>${trip.trip.dcName}</strong><br/>
        <span style="color:#64748b">Dispatch Center</span>
    </div>
`)

                        const dcMarker = new mapboxgl.Marker(dcEl)
                            .setLngLat(route[0])
                            .setPopup(popup) // ✅ attach popup
                            .addTo(map)

                        dcMarkersRef.current.push(dcMarker)
                    }

                    // 🏪 Store stops (remaining coordinates)
                    // 🏪 Store stops (use actual waypoints, skip DC)
                   trip.waypoints.slice(1).forEach(([lat, lng], idx) => {
    const stop = trip.stops[idx]

    const stopEl = document.createElement("div")
    stopEl.innerHTML = "🏪"
    stopEl.style.fontSize = "18px"
    stopEl.style.cursor = "pointer"

    const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
    }).setHTML(`
        <div style="font-size:12px">
            <strong>${stop?.name || "Store Stop"}</strong><br/>
            <span style="color:#64748b">${stop?.address || ""}</span>
        </div>
    `)

    const marker = new mapboxgl.Marker(stopEl)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map)

    stopMarkersRef.current.push(marker)
})

                    // 🚛 Truck marker
                    const pos = interpolate(route, fractionsRef.current[id])

                    if (pos) {
                        if (!markersRef.current[id]) {
                            const el = document.createElement("div")
                            el.innerHTML = "🚛"
                            el.style.fontSize = "24px"
                            el.style.cursor = "pointer"

                            const marker = new mapboxgl.Marker(el)
                                .setLngLat(pos)
                                .addTo(map)

                            el.addEventListener("click", () => {
                                setSelectedTrip(trip)
                            })

                            markersRef.current[id] = marker
                        }
                    }

                    route.forEach(coord => bounds.extend(coord))
                })

                if (!bounds.isEmpty()) {
                    map.fitBounds(bounds, { padding: 80 })
                }
            }

            // ✅ FIX: Proper map load check
            if (map.isStyleLoaded()) {
                drawOnMap()
                setRoutesLoaded(true)
            } else {
                map.once("load", () => {
                    drawOnMap()
                    setRoutesLoaded(true)
                })
            }
        }

        loadAll()
    }, [])

    // ── Animate all trucks simultaneously ─────────────────────────────────────
    useEffect(() => {
        if (!routesLoaded) return

        intervalRef.current = setInterval(() => {
            setFractions(prev => {
                const next = { ...prev }
                trips.forEach(trip => {
                    if (trip.status === "in_transit" || trip.status === "delayed") {
                        const speed = trip.status === "delayed" ? 0.0005 : 0.0012
                        next[trip.id] = Math.min((prev[trip.id] || 0) + speed, 0.95)
                    }
                })
                return next
            })
            setLastUpdated(new Date())
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [routesLoaded, trips])

    // ── Update marker positions + route splits on every fraction tick ─────────
    useEffect(() => {
        const map = mapRef.current
        if (!map) return

        Object.entries(fractions).forEach(([id, frac]) => {
            const route = routesRef.current[id]
            const marker = markersRef.current[id]

            if (!route || !marker) return

            // 🚛 Move marker
            const pos = interpolate(route, frac)
            if (pos) marker.setLngLat(pos)

            // ✅ ONLY update route for SELECTED trip
            if (selectedTrip?.id !== id) return

            const { done, rest } = splitRouteByFraction(route, frac)

            // const doneCoords = route.slice(0, splitIdx + 1)
            // const restCoords = route.slice(splitIdx)

            const gj = (c) => ({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: c,
                },
            })

            // ✅ Update selected route layers
            if (map.getSource("src-done")) {
                map.getSource("src-done").setData(gj(done))
            }

            if (map.getSource("src-rest")) {
                map.getSource("src-rest").setData(gj(rest))
            }
        })
    }, [fractions, selectedTrip])

    // ── Pan map to selected truck ─────────────────────────────────────────────
    useEffect(() => {
        if (!selectedTrip) return
        const route = routesRef.current[selectedTrip.id]
        const frac = fractions[selectedTrip.id] || selectedTrip.progressFraction
        const map = mapRef.current
        if (!route || !map) return

        if (!map.isStyleLoaded()) {
            map.once("idle", () => drawRouteForTrip(selectedTrip.id))
            return
        }

        drawRouteForTrip(selectedTrip.id)
        const pos = interpolate(route, frac)
        if (pos) {
            map.easeTo({
                center: pos,
                zoom: 12,
                duration: 800,
                offset: [-180, 0],  // offset left to account for panel
            })
        }
    }, [selectedTrip])


    const drawRouteForTrip = (tripId) => {
        const map = mapRef.current
        const route = routesRef.current[tripId]

        if (!map || !route) return

        // ✅ FIX: use LIVE fraction
        const frac = fractions[tripId] ?? 0

        const splitIdx = Math.floor(frac * (route.length - 1))

        const doneCoords = route.slice(0, splitIdx + 1)
        const restCoords = route.slice(splitIdx)

        const makeGeoJSON = (coords) => ({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coords,
            },
        })

        const colorMap = {
            "TRP-2841": "#0369a1",
            "TRP-2842": "#15803d",
            "TRP-2843": "#b45309",
        }

        const color = colorMap[tripId] || "#701a40"

        // 🔥 CLEAN OLD
        const removeIfExists = (id) => {
            if (map.getLayer(id)) map.removeLayer(id)
            if (map.getSource(id)) map.removeSource(id)
        }

        ["full", "done", "rest"].forEach(key => {
            removeIfExists(`lyr-${key}`)
            removeIfExists(`src-${key}`)
        })

        // ── FULL ROUTE ──
        map.addSource("src-full", {
            type: "geojson",
            data: makeGeoJSON(route),
        })

        map.addLayer({
            id: "lyr-full",
            type: "line",
            source: "src-full",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
                "line-color": "#e2e8f0",
                "line-width": 4,
            },
        })

        // ── DONE ──
        map.addSource("src-done", {
            type: "geojson",
            data: makeGeoJSON(doneCoords),
        })

        map.addLayer({
            id: "lyr-done",
            type: "line",
            source: "src-done",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
                "line-color": color,
                "line-width": 4,
            },
        })

        // ── REMAINING ──
        map.addSource("src-rest", {
            type: "geojson",
            data: makeGeoJSON(restCoords),
        })

        map.addLayer({
            id: "lyr-rest",
            type: "line",
            source: "src-rest",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
                "line-color": color,
                "line-width": 3,
                "line-dasharray": [4, 3],
            },
        })
    }

    return (
        <section className="h-screen flex flex-col overflow-hidden">
            <AdminSubHeader
                to="/dc"
                heading="Live Dispatch Map"
                subh="All active trucks from this DC — click any truck to see details"
                CreateButton={<></>}
            />

            {/* ── Status bar ─────────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 px-4 lg:px-8 py-2.5 flex items-center gap-4 flex-wrap shrink-0">

                {/* Live indicator */}
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-green-700">Live</span>
                </div>

                <div className="w-px h-4 bg-slate-200" />

                {/* Trip count badges */}
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-sky-100 text-sky-700 font-semibold px-2.5 py-1 rounded-full">
                        {activeCount} in transit
                    </span>
                    {delayedCount > 0 && (
                        <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">
                            {delayedCount} delayed
                        </span>
                    )}
                    <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-full">
                        {trips.length} total
                    </span>
                </div>

                <div className="w-px h-4 bg-slate-200" />

                {/* Route legend */}
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-1.5 bg-sky-600 rounded-full" />TRP-2841
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-1.5 bg-green-600 rounded-full" />TRP-2842
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-1.5 bg-amber-600 rounded-full" />TRP-2843
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                    <RefreshCw size={11} className="animate-spin" />
                    Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
            </div>

            {/* ── Map + panel ────────────────────────────────────────────────── */}
            <div className="flex-1 relative flex overflow-hidden">

                {/* Map */}
                <div ref={mapContainerRef} className="flex-1 h-full" />

                {/* Loading overlay */}
                {!routesLoaded && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 gap-3">
                        <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#701a40" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <p className="text-sm font-medium text-slate-500">Loading live routes…</p>
                        <p className="text-xs text-slate-400">Fetching Mapbox road data for {trips.length} active trucks</p>
                    </div>
                )}

                {/* Click-to-select hint */}
                {routesLoaded && !selectedTrip && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 bg-white border border-slate-200 shadow-md rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-slate-600 pointer-events-none">
                        <Truck size={13} className="text-maroon" />
                        Click any truck on the map to see full trip details
                    </div>
                )}

                {/* Map legend (bottom right) */}
                {routesLoaded && (
                    <div className="absolute bottom-5 right-5 z-10 bg-white rounded-xl border border-slate-200 shadow-md px-3 py-2.5 text-xs space-y-1.5">
                        <div className="flex items-center gap-2"><span className="w-6 h-1.5 bg-slate-300 rounded-full inline-block" />Route (planned)</div>
                        <div className="flex items-center gap-2"><span className="w-6 h-1.5 bg-sky-600 rounded-full inline-block" />Covered</div>
                        <div className="flex items-center gap-2"><svg width="24" height="6"><line x1="0" y1="3" x2="24" y2="3" stroke="#64748b" strokeWidth="2.5" strokeDasharray="5 3" /></svg>Remaining</div>
                        <div className="flex items-center gap-2"><span className="text-sm">🏭</span>Data center</div>
                        <div className="flex items-center gap-2"><span className="text-sm">🏪</span>Store stop</div>
                        <div className="flex items-center gap-2"><span className="text-sm">🚛</span>Truck (live)</div>
                    </div>
                )}

                {/* ── Trip detail panel — slides in from right ───────────────── */}
                <div className={`absolute top-0 right-0 h-full bg-white border-l border-slate-200 shadow-2xl z-30 transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${selectedTrip ? "w-full sm:w-96" : "w-0"
                    }`}>
                    {selectedTrip && (
                        <TripDetailPanel
                            trip={selectedTrip}
                            onClose={() => {
                                setSelectedTrip(null)
                                // Zoom back out to show all trucks
                                if (mapRef.current) {
                                    const bounds = new mapboxgl.LngLatBounds()
                                    Object.values(routesRef.current).forEach(route => {
                                        route.forEach((coord) => bounds.extend(coord))
                                    })
                                    if (!bounds.isEmpty()) {
                                        mapRef.current.fitBounds(bounds, { padding: 80, duration: 800 })
                                    }
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}