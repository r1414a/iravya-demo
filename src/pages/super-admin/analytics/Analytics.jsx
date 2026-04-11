// pages/superadmin/Analytics.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Super admin analytics page
// • All Tailwind CSS — no custom CSS
// • Recharts for all charts
// • Same UI patterns as manage pages: maroon, slate cards, AdminSubHeader
// • Fully self-contained with mock data (swap for RTK hooks when ready)
// • Components: StatCard, SectionTitle, ChartCard, TripStatusBadge
// ─────────────────────────────────────────────────────────────────────────────

import {
    ResponsiveContainer,
    AreaChart, Area,
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    RadialBarChart, RadialBar,
} from "recharts"
import AdminSubHeader from "@/components/AdminSubHeader"
import { useState } from "react"
import {
    Truck, Users, MapPin, Route, AlertTriangle,
    TrendingUp, TrendingDown, Minus, Activity,
    LocateFixed, Package, Clock, CheckCircle2,
} from "lucide-react"

// ── Colour palette (consistent with your maroon theme) ───────────────────────
const C = {
    maroon:  "#701a40",
    sky:     "#0ea5e9",
    green:   "#16a34a",
    amber:   "#d97706",
    red:     "#dc2626",
    violet:  "#7c3aed",
    teal:    "#0f766e",
    slate:   "#64748b",
    cyan:    "#0e7490",
}

// ── Mock data — replace with useGetAnalyticsQuery() when ready ────────────────
const TRIPS_WEEKLY = [
    { day: "Mon", completed: 18, cancelled: 2, scheduled: 5 },
    { day: "Tue", completed: 24, cancelled: 1, scheduled: 8 },
    { day: "Wed", completed: 21, cancelled: 3, scheduled: 6 },
    { day: "Thu", completed: 29, cancelled: 0, scheduled: 9 },
    { day: "Fri", completed: 32, cancelled: 2, scheduled: 11 },
    { day: "Sat", completed: 27, cancelled: 1, scheduled: 7 },
    { day: "Sun", completed: 14, cancelled: 0, scheduled: 3 },
]

const TRIPS_MONTHLY = [
    { month: "Jul",  completed: 312, cancelled: 18, scheduled: 44 },
    { month: "Aug",  completed: 341, cancelled: 22, scheduled: 51 },
    { month: "Sep",  completed: 298, cancelled: 15, scheduled: 39 },
    { month: "Oct",  completed: 387, cancelled: 27, scheduled: 63 },
    { month: "Nov",  completed: 421, cancelled: 19, scheduled: 58 },
    { month: "Dec",  completed: 358, cancelled: 24, scheduled: 47 },
    { month: "Jan",  completed: 445, cancelled: 21, scheduled: 72 },
]

const BRAND_TRIPS = [
    { brand: "Westside", trips: 421, stores: 4, dcs: 2 },
    { brand: "Zudio",    trips: 583, stores: 4, dcs: 2 },
    { brand: "Tanishq",  trips: 198, stores: 2, dcs: 1 },
    { brand: "Tata Cliq",trips: 267, stores: 2, dcs: 1 },
]

const ALERT_TYPES = [
    { name: "Speeding",        value: 84,  color: C.red    },
    { name: "Long stop",       value: 61,  color: C.amber  },
    { name: "Route deviation", value: 47,  color: C.violet },
    { name: "Geofence enter",  value: 112, color: C.green  },
    { name: "Device offline",  value: 23,  color: C.slate  },
    { name: "Low battery",     value: 38,  color: C.cyan   },
]

const DRIVER_PERFORMANCE = [
    { name: "Ramesh Kumar",   trips: 42, onTime: 39, rating: 4.8, alerts: 2  },
    { name: "Anil Deshmukh",  trips: 38, onTime: 38, rating: 4.9, alerts: 0  },
    { name: "Vijay Salunkhe", trips: 31, onTime: 28, rating: 4.5, alerts: 5  },
    { name: "Prakash Thorat", trips: 29, onTime: 27, rating: 4.7, alerts: 3  },
    { name: "Mohan Waghmare", trips: 26, onTime: 22, rating: 4.2, alerts: 8  },
]

const FLEET_STATUS = [
    { name: "On trip",    value: 4,  color: C.sky    },
    { name: "Idle",       value: 4,  color: C.green  },
    { name: "Maintenance",value: 0,  color: C.amber  },
]

const GPS_HEALTH = [
    { name: "Online",  value: 4, color: C.green  },
    { name: "Offline", value: 0, color: C.red    },
    { name: "At DC",   value: 4, color: C.slate  },
]

const DELIVERY_RATE_TREND = [
    { week: "W1", rate: 91 }, { week: "W2", rate: 94 },
    { week: "W3", rate: 89 }, { week: "W4", rate: 96 },
    { week: "W5", rate: 93 }, { week: "W6", rate: 97 },
    { week: "W7", rate: 95 }, { week: "W8", rate: 98 },
]

const DC_ACTIVITY = [
    { dc: "Westside Pune",  dispatched: 124, completed: 119 },
    { dc: "Westside Mum",   dispatched:  87, completed:  84 },
    { dc: "Zudio Pune",     dispatched: 163, completed: 154 },
    { dc: "Zudio Nashik",   dispatched:  71, completed:  68 },
    { dc: "Tanishq Pune",   dispatched:  58, completed:  57 },
    { dc: "Cliq Navi Mum",  dispatched:  76, completed:  71 },
]

const TOP_STORES = [
    { store: "Westside Phoenix",    deliveries: 64, brand: "Westside" },
    { store: "Zudio Koregaon Park", deliveries: 58, brand: "Zudio"    },
    { store: "Zudio Baner",         deliveries: 51, brand: "Zudio"    },
    { store: "Cliq Viviana Mall",   deliveries: 47, brand: "Tata Cliq"},
    { store: "Tanishq KP",          deliveries: 41, brand: "Tanishq"  },
    { store: "Westside Amanora",    deliveries: 39, brand: "Westside" },
]

// ── Summary KPIs ─────────────────────────────────────────────────────────────
const STATS = [
    { label: "Total trips",       value: "1,469", sub: "+12% vs last month", trend: "up",   icon: Route,        color: "bg-slate-800",   iconBg: "bg-slate-700"  },
    { label: "Active right now",  value: "4",     sub: "trucks in transit",  trend: "flat", icon: Truck,        color: "bg-sky-700",     iconBg: "bg-sky-600"    },
    { label: "Delivery rate",     value: "96.4%", sub: "+2.1% vs last month",trend: "up",   icon: CheckCircle2, color: "bg-green-700",   iconBg: "bg-green-600"  },
    { label: "Avg trip time",     value: "2h 18m",sub: "-4min vs last month",trend: "up",   icon: Clock,        color: "bg-violet-700",  iconBg: "bg-violet-600" },
    // { label: "Open alerts",       value: "7",     sub: "3 high severity",    trend: "down", icon: AlertTriangle, color: "bg-red-800",    iconBg: "bg-red-700"    },
    { label: "Active drivers",    value: "10",    sub: "3 on trip today",    trend: "flat", icon: Users,        color: "bg-amber-700",   iconBg: "bg-amber-600"  },
    { label: "GPS devices",       value: "8",     sub: "4 online, 4 at DC",  trend: "flat", icon: LocateFixed,  color: "bg-teal-700",    iconBg: "bg-teal-600"   },
    { label: "Stores served",     value: "12",    sub: "across 4 brands",    trend: "flat", icon: MapPin,       color: "bg-cyan-700",    iconBg: "bg-cyan-600"   },
]

// ── Reusable components ───────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, icon: Icon, color, iconBg }) {
    const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
    const trendColor = trend === "up"
        ? "text-green-300"
        : trend === "down"
        ? "text-red-300"
        : "text-slate-300"

    return (
        <div className={`${color} rounded-2xl p-4 flex items-start gap-3 shadow-sm`}>
            <div className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={20} color="white" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{label}</p>
                <p className="text-white text-2xl font-bold mt-0.5 leading-tight">{value}</p>
                <div className={`flex items-center gap-1 mt-1 ${trendColor}`}>
                    <TrendIcon size={11} />
                    <p className="text-[11px] leading-none">{sub}</p>
                </div>
            </div>
        </div>
    )
}

function SectionTitle({ children, action }) {
    return (
        <div className="flex items-center justify-between mb-3">
            <div>
                {/* <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                    Analytics
                </p> */}
                <h2 className="text-md font-semibold text-slate-800">{children}</h2>
            </div>
            {action}
        </div>
    )
}

function ChartCard({ title, subtitle, children, className = "" }) {
    return (
        <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}>
            <div className="mb-4">
                <p className="text-sm font-bold text-slate-800">{title}</p>
                {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
            <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
            {payload.map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                    <span className="text-slate-500">{entry.name}:</span>
                    <span className="font-semibold text-slate-800">{entry.value}</span>
                </div>
            ))}
        </div>
    )
}

// ── Range toggle ──────────────────────────────────────────────────────────────
function RangeToggle({ value, onChange }) {
    return (
        <div className="flex bg-slate-100 rounded-lg p-0.5">
            {["Weekly", "Monthly"].map(opt => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        value === opt
                            ? "bg-white shadow-sm text-slate-800"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Analytics() {
    const [tripRange, setTripRange] = useState("Weekly")
    const tripData = tripRange === "Weekly" ? TRIPS_WEEKLY : TRIPS_MONTHLY
    const tripKey  = tripRange === "Weekly" ? "day" : "month"

    return (
        <section className="min-h-screen bg-slate-50">
            <AdminSubHeader
                to="/admin"
                heading="Analytics"
                subh="Fleet performance, delivery metrics and operational insights"
                CreateButton={<></>}
            />

            <div className="px-4 lg:px-10 py-6 flex flex-col gap-8">

                {/* ── KPI stat cards ──────────────────────────────────────── */}
                <section>
                    <SectionTitle>Platform overview</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {STATS.map(stat => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </section>

                {/* ── Trip volume + delivery rate ──────────────────────────── */}
                <section>
                    <SectionTitle
                        action={<RangeToggle value={tripRange} onChange={setTripRange} />}
                    >
                        Trip volume
                    </SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {/* Stacked bar — trip volume */}
                        <ChartCard
                            title="Trips by status"
                            subtitle={`${tripRange} breakdown`}
                            // className="lg:col-span-2"
                        >
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={tripData} barSize={tripRange === "Weekly" ? 28 : 20}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey={tripKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                                    <Bar dataKey="completed" name="Completed" stackId="a" fill={C.green}  radius={[0,0,0,0]} />
                                    <Bar dataKey="scheduled" name="Scheduled" stackId="a" fill={C.sky}    radius={[0,0,0,0]} />
                                    <Bar dataKey="cancelled" name="Cancelled" stackId="a" fill={C.red}    radius={[4,4,0,0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>

                        {/* Delivery rate line */}
                        <ChartCard title="Delivery success rate" subtitle="8-week rolling trend">
                            <ResponsiveContainer width="100%" height={240}>
                                <AreaChart data={DELIVERY_RATE_TREND}>
                                    <defs>
                                        <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={C.green} stopOpacity={0.15} />
                                            <stop offset="95%" stopColor={C.green} stopOpacity={0}    />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="%" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone" dataKey="rate" name="Success rate"
                                        stroke={C.green} strokeWidth={2.5}
                                        fill="url(#rateGrad)" dot={{ r: 3, fill: C.green }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            <div className="mt-3 flex items-center justify-between px-1">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Current rate</p>
                                    <p className="text-xl font-bold text-green-700">98%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">8-wk avg</p>
                                    <p className="text-xl font-bold text-slate-700">94.1%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Best week</p>
                                    <p className="text-xl font-bold text-slate-700">98%</p>
                                </div>
                            </div>
                        </ChartCard>
                    </div>
                </section>

                {/* ── Brand breakdown + DC activity ────────────────────────── */}
                <section>
                    <SectionTitle>Distribution centers & alerts</SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                         {/* DC dispatched vs completed */}
                        <ChartCard title="DC dispatch performance" subtitle="Trips dispatched vs completed per DC" 
                        // className="lg:col-span-2"
                        >
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={DC_ACTIVITY} barGap={2} barSize={14}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="dc" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                                    <Bar dataKey="dispatched" name="Dispatched" fill={C.sky}   radius={[3,3,0,0]} />
                                    <Bar dataKey="completed"  name="Completed"  fill={C.green} radius={[3,3,0,0]} />
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Completion rate pills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {DC_ACTIVITY.map(dc => {
                                    const rate = Math.round((dc.completed / dc.dispatched) * 100)
                                    const color = rate >= 97 ? "bg-green-100 text-green-700"
                                        : rate >= 93 ? "bg-amber-100 text-amber-700"
                                        : "bg-red-100 text-red-700"
                                    return (
                                        <div key={dc.dc} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
                                            <span>{dc.dc}</span>
                                            <span className="font-bold">{rate}%</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </ChartCard>

                        {/* Alert type breakdown */}
                        <ChartCard title="Alert breakdown" subtitle="By type — last 30 days">
                            <div className="flex flex-col gap-2.5">
                                {ALERT_TYPES.map(a => {
                                    const max = Math.max(...ALERT_TYPES.map(x => x.value))
                                    const pct = Math.round((a.value / max) * 100)
                                    return (
                                        <div key={a.name}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-slate-600">{a.name}</span>
                                                <span className="text-xs font-bold text-slate-800">{a.value}</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%`, background: a.color }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-xs text-slate-500">Total alerts</p>
                                <p className="text-lg font-bold text-slate-800">
                                    {ALERT_TYPES.reduce((s, a) => s + a.value, 0)}
                                </p>
                            </div>
                        </ChartCard>

                       
                    </div>
                </section>


                {/* ── Driver performance + Top stores ──────────────────────── */}
                <section>
                    <SectionTitle>Drivers & stores</SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {/* Top stores + store delivery bar */}
                        <ChartCard title="Top stores by deliveries" subtitle="Most deliveries received — all time">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={TOP_STORES} layout="vertical" barSize={14}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        dataKey="store" type="category"
                                        tick={{ fontSize: 10, fill: "#64748b" }}
                                        axisLine={false} tickLine={false} width={120}
                                        tickFormatter={v => v.length > 18 ? v.slice(0, 17) + "…" : v}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="deliveries" name="Deliveries" fill={C.teal} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Store cards */}
                            {/* <div className="mt-4 pt-3 border-t border-slate-100">
                                <p className="text-xs text-slate-500 mb-2">Brand distribution</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {[...new Set(TOP_STORES.map(s => s.brand))].map(brand => {
                                        const count = TOP_STORES.filter(s => s.brand === brand).length
                                        const total = TOP_STORES.filter(s => s.brand === brand).reduce((a, s) => a + s.deliveries, 0)
                                        return (
                                            <div key={brand} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                                                <p className="text-xs font-semibold text-slate-700">{brand}</p>
                                                <p className="text-sm font-bold text-slate-900">{total} <span className="text-[10px] text-slate-400 font-normal">deliveries</span></p>
                                                <p className="text-[10px] text-slate-400">{count} store{count > 1 ? "s" : ""} in top 6</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </ChartCard>
                    </div>
                </section>
            </div>
        </section>
    )
}