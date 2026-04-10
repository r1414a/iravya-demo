import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { AlertTriangle, LogOut, MonitorX, Trash2, RefreshCw } from "lucide-react"
import { useState } from "react"
 
function DangerCard({ icon: Icon, title, desc, buttonLabel, onClick }) {
    return (
        <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
                <Icon size={15} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                    <p className="text-sm font-semibold text-red-700">{title}</p>
                    <p className="text-xs text-red-500 mt-0.5 leading-snug">{desc}</p>
                </div>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={onClick}
                className="shrink-0 text-red-600 border-red-300 hover:bg-red-100 hover:border-red-400"
            >
                {buttonLabel}
            </Button>
        </div>
    )
}
 
// function SessionRow({ device, location, time, current }) {
//     return (
//         <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//             <div className="-space-y-0.5">
//                 <div className="flex items-center gap-2">
//                     <p className="text-sm font-medium">{device}</p>
//                     {current && (
//                         <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Current</span>
//                     )}
//                 </div>
//                 <p className="text-xs text-gray-400">{location} · {time}</p>
//             </div>
//             {!current && (
//                 <button className="text-xs text-red-500 hover:underline">Revoke</button>
//             )}
//         </div>
//     )
// }
 
export function DangerSection() {
    const [confirmDelete, setConfirmDelete] = useState(false)
 
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold text-red-600 flex items-center gap-2">
                    <AlertTriangle size={16} /> Danger zone
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">Irreversible actions — proceed with caution</p>
            </div>
 
            {/* Active sessions */}
            {/* <div className="mb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Active sessions</p>
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4">
                    <SessionRow device="Chrome on macOS"  location="Pune, Maharashtra"   time="Now"         current />
                    <SessionRow device="Chrome on Windows" location="Mumbai, Maharashtra" time="2 days ago"  />
                    <SessionRow device="Safari on iPhone" location="Pune, Maharashtra"   time="5 days ago"  />
                </div>
                <button className="text-xs text-red-500 hover:underline mt-3 flex items-center gap-1">
                    <MonitorX size={12} /> Revoke all other sessions
                </button>
            </div> */}
 
            {/* Danger action cards */}
            <div className="flex flex-col gap-4">
                {/* <DangerCard
                    icon={LogOut}
                    title="Sign out everywhere"
                    desc="Immediately invalidates all active sessions across all devices. You will need to log in again."
                    buttonLabel="Sign out all"
                /> */}
                <DangerCard
                    icon={RefreshCw}
                    title="Reset platform settings"
                    desc="Resets all platform-level settings (MQTT config, GPS interval, alert thresholds) to defaults. Does not affect user data."
                    buttonLabel="Reset settings"
                />
                <DangerCard
                    icon={Trash2}
                    title="Delete super admin account"
                    desc="Permanently deletes this super admin account. The platform remains active. You must assign another super admin first."
                    buttonLabel="Delete account"
                    onClick={() => setConfirmDelete(true)}
                />
            </div>
 
            {/* Inline confirm — same pattern as AddStoreForm slug confirm */}
            {confirmDelete && (
                <div className="mt-4 p-4 border border-red-300 bg-red-50 rounded-lg">
                    <p className="text-sm font-semibold text-red-700 mb-3">
                        Type <span className="font-mono bg-red-100 px-1 rounded">DELETE</span> to confirm
                    </p>
                    <div className="flex gap-3">
                        <Field className="flex-1">
                            <Input placeholder="Type DELETE" className="border-red-300 focus-visible:ring-red-300 placeholder:text-sm text-sm sm:text-md" />
                        </Field>
                        <Button className="bg-red-600 hover:bg-red-700 text-white shrink-0">Confirm</Button>
                        <Button variant="outline" onClick={() => setConfirmDelete(false)} className="shrink-0">Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    )
}