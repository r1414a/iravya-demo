import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { AlertTriangle, LogOut, MonitorX, Trash2, RefreshCw } from "lucide-react"
import { useState } from "react"
import { clearUser, updatePlatformSettings } from "@/lib/features/auth/authSlice"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SUPER_ADMIN_PLATFORMSETTINGS } from "@/constants/constant"


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

export function DangerSection() {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleReset = () => {
        dispatch(updatePlatformSettings(SUPER_ADMIN_PLATFORMSETTINGS))

        toast.success("Platform reset to default", {
            style: {
                color: "green"
            }
        })
    }

    const handleDelete = () => {
        if (input.trim() !== "DELETE") {
            toast.error("Type DELETE correctly")
            return
        }

        dispatch(clearUser())

        localStorage.removeItem("demo-auth-user")

        toast.success("Account deleted", {
            style: {
                color: 'green'
            }
        })

        // redirect
        setTimeout(() => {
        navigate("/")
    }, 500)
    }


    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold text-red-600 flex items-center gap-2">
                    <AlertTriangle size={16} /> Danger zone
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">Irreversible actions — proceed with caution</p>
            </div>



            {/* Danger action cards */}
            <div className="flex flex-col gap-4">

                <DangerCard
                    icon={RefreshCw}
                    onClick={handleReset}
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
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type DELETE"
                                className="border-red-300 focus-visible:ring-red-300 placeholder:text-sm text-sm sm:text-md"
                            />
                        </Field>
                        <Button 
                            onClick={handleDelete} 
                            disabled={input !== "DELETE"}
                            className="bg-red-600 hover:bg-red-700 text-white disabled:cursor-not-allowed shrink-0"
                        >Confirm</Button>
                        <Button variant="outline" 
                            onClick={() => {
                                setConfirmDelete(false)
                                setInput("")
                            }} className="shrink-0">Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    )
}