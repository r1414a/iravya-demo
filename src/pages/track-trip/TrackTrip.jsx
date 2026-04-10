import AdminSubHeader from "@/components/AdminSubHeader"
import TrackingForm from "./TrackingForm"
import { MOCK_TRIPS } from "@/constants/mock_trip_tracking";


// const MOCK_TRIPS = {
//   "TRP-001": {
//     driver: { name: "Rajesh Kumar", id: "DRV-4821", phone: "+91 98765 43210", license: "MH12-2019-0045321", avatar: "RK", rating: 4.8, trips: 1240, experience: "8 years", vehicle: "Heavy Freight" },
//     trip: {
//       truck: "MH-12-AB-4567", type: "Heavy Freight", capacity: "20 Tons",
//       start: "Pune Logistics Hub, Pimpri-Chinchwad", end: "Mumbai Port, JNPT",
//       startTime: "06:30 AM", eta: "11:00 AM", distance: "147 km",
//       status: "in_transit", progress: 62,
//       currentLocation: "Khopoli Toll Plaza, NH-48",
//       speed: "72 km/h", fuel: 68, temp: "22°C", cargo: "Electronics",
//     },
//     path: [
//       { x: 75, y: 340, label: "Pune Hub" },
//       { x: 135, y: 300, label: "Wakad" },
//       { x: 195, y: 265, label: "Talegaon" },
//       { x: 255, y: 230, label: "Khandala" },
//       { x: 305, y: 205, label: "Khopoli", current: true },
//       { x: 370, y: 185, label: "Panvel" },
//       { x: 435, y: 165, label: "Vashi" },
//       { x: 495, y: 148, label: "JNPT" },
//     ],
//     onRoute: true,
//     actualPath: [
//       { x: 75, y: 340 }, { x: 135, y: 300 }, { x: 195, y: 265 }, { x: 255, y: 230 }, { x: 305, y: 205 }
//     ],
//     checkpoints: [
//       { name: "Pune Logistics Hub", time: "06:30 AM", done: true },
//       { name: "Wakad Toll", time: "07:05 AM", done: true },
//       { name: "Talegaon", time: "08:10 AM", done: true },
//       { name: "Khopoli Toll Plaza", time: "09:45 AM", done: true },
//       { name: "Panvel Junction", time: "10:15 AM", done: false },
//       { name: "Mumbai Port, JNPT", time: "11:00 AM", done: false },
//     ],
//     alerts: ["Route deviation detected near Sinnar"]
//   },
//   "TRP-002": {
//     driver: { name: "Suresh Patil", id: "DRV-3309", phone: "+91 97654 32109", license: "MH-2020-0078234", avatar: "SP", rating: 4.5, trips: 876, experience: "6 years", vehicle: "Medium Carrier" },
//     trip: {
//       truck: "MH-14-CD-8823", type: "Medium Carrier", capacity: "10 Tons",
//       start: "Nashik Industrial Area", end: "Aurangabad Warehouse",
//       startTime: "07:00 AM", eta: "12:30 PM", distance: "188 km",
//       status: "delayed", progress: 38,
//       currentLocation: "Sinnar Bypass, NH-160",
//       speed: "45 km/h", fuel: 42, temp: "28°C", cargo: "Textiles",
//     },
//     path: [
//       { x: 75, y: 340, label: "Nashik" },
//       { x: 155, y: 298, label: "Sinnar" },
//       { x: 240, y: 258, label: "Shirdi" },
//       { x: 330, y: 225, label: "Kopargaon" },
//       { x: 415, y: 205, label: "Gangapur" },
//       { x: 495, y: 148, label: "Aurangabad" },
//     ],
//     onRoute: false,
//     actualPath: [
//       { x: 75, y: 340 }, { x: 155, y: 298 }, { x: 200, y: 335 }, { x: 218, y: 355 }, { x: 238, y: 342 }
//     ],
//     checkpoints: [
//       { name: "Nashik Industrial Area", time: "07:00 AM", done: true },
//       { name: "Sinnar Toll", time: "07:55 AM", done: true },
//       { name: "Shirdi", time: "10:00 AM", done: false },
//       { name: "Kopargaon", time: "11:00 AM", done: false },
//       { name: "Aurangabad Warehouse", time: "12:30 PM", done: false },
//     ],
//     alerts: ["Route deviation detected near Sinnar", "Speed below expected threshold"]
//   },
//   "TRP-003": {
//     driver: { name: "Anil Deshmukh", id: "DRV-5512", phone: "+91 96543 21098", license: "MH-2018-0056789", avatar: "AD", rating: 4.9, trips: 2105, experience: "12 years", vehicle: "Light Commercial" },
//     trip: {
//       truck: "MH-20-EF-1122", type: "Light Commercial", capacity: "5 Tons",
//       start: "Nagpur Distribution Center", end: "Amravati Depot",
//       startTime: "08:00 AM", eta: "10:30 AM", distance: "150 km",
//       status: "delivered", progress: 100,
//       currentLocation: "Amravati Depot (Arrived)",
//       speed: "0 km/h", fuel: 55, temp: "31°C", cargo: "FMCG Goods",
//     },
//     path: [
//       { x: 75, y: 340, label: "Nagpur DC" },
//       { x: 160, y: 293, label: "Wardha" },
//       { x: 248, y: 252, label: "Dhamangaon" },
//       { x: 348, y: 218, label: "Badnera" },
//       { x: 495, y: 148, label: "Amravati", current: true },
//     ],
//     onRoute: true,
//     actualPath: [
//       { x: 75, y: 340 }, { x: 160, y: 293 }, { x: 248, y: 252 }, { x: 348, y: 218 }, { x: 495, y: 148 }
//     ],
//     checkpoints: [
//       { name: "Nagpur Distribution Center", time: "08:00 AM", done: true },
//       { name: "Wardha", time: "08:52 AM", done: true },
//       { name: "Dhamangaon", time: "09:30 AM", done: true },
//       { name: "Badnera", time: "10:00 AM", done: true },
//       { name: "Amravati Depot", time: "10:28 AM", done: true },
//     ],
//     alerts: []
//   }
// };
 
const STATUS_CONFIG = {
  in_transit: { label: "In Transit", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200", dot: "bg-sky-500", badge: "bg-sky-100 text-sky-700" },
  delayed: { label: "Delayed", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  delivered: { label: "Delivered", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700" },
};
 
const ISSUE_TYPES = [
  { id: "no_contact", emoji: "📞", label: "Can't reach the driver", desc: "Driver not answering calls or messages" },
  { id: "not_arrived", emoji: "⏰", label: "Delivery not arrived yet", desc: "Past estimated arrival time" },
  { id: "wrong_location", emoji: "📍", label: "Wrong delivery location", desc: "Driver heading to incorrect address" },
  { id: "damaged", emoji: "📦", label: "Damaged goods concern", desc: "Concern about cargo condition" },
  { id: "breakdown", emoji: "🔧", label: "Vehicle breakdown", desc: "Driver reported vehicle issue" },
  { id: "other", emoji: "💬", label: "Other issue", desc: "Describe your issue in detail" },
];


export default function TrackTrip (){
    
    return(<>
        <section>
            <AdminSubHeader
                to="/dc"
                heading="Delivery Tracker"
                subh="Real-time freight & logistics monitoring"
                CreateButton={<></>}
            />
            <TrackingForm 
            MOCK_TRIPS={MOCK_TRIPS}
            />
            
        </section>
    </>)
}