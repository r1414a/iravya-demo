import { Button } from "@/components/ui/button"
import { selectUser, setNotificationPreferences } from "@/lib/features/auth/authSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

 
const NOTIFICATION_GROUPS = [
    {
        group: "Trips",
        items: [
            { key: "trip_dispatched", label: "Trip dispatched",  desc: "When a DC operator dispatches a new trip"          },
            { key: "trip_completed",  label: "Trip completed",   desc: "When all stops on a trip are confirmed"            },
            { key: "trip_cancelled",  label: "Trip cancelled",   desc: "When a trip is cancelled by an operator"           },
        ],
    },
    {
        group: "Alerts",
        items: [
            { key: "speeding",        label: "Speeding alert",   desc: "When a truck exceeds the speed limit"              },
            { key: "long_stop",       label: "Long stop alert",  desc: "Truck stopped for more than 15 minutes on a trip"  },
            { key: "route_deviation", label: "Route deviation",  desc: "When a truck deviates from its planned route"      },
            { key: "geofence",        label: "Geofence events",  desc: "Truck enters or exits a store or DC geofence"      },
        ],
    },
    {
        group: "Devices",
        items: [
            { key: "device_offline",  label: "Device offline",   desc: "When a GPS device stops sending pings"             },
            // { key: "device_at_store", label: "Device at store",  desc: "Device at store uncollected for more than 24h"     },
            { key: "device_low_batt", label: "Low battery",      desc: "Device battery drops below 20%"                   },
        ],
    },
    {
        group: "System",
        items: [
            { key: "new_user",        label: "New user",         desc: "When a new user account is created"                },
            { key: "platform_errors", label: "Platform errors",  desc: "Critical system errors and MQTT broker issues"     },
        ],
    },
]
 
function ToggleRow({ label, desc, checked, onChange }) {
    return (
        <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex-1 pr-6">
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-maroon cursor-pointer shrink-0"
            />
        </div>
    )
}
 
export function NotificationsSection() {
    const dispatch = useDispatch()
const { notifications } = useSelector(selectUser)

const init = NOTIFICATION_GROUPS
  .flatMap(g => g.items)
  .reduce((a, i) => ({ ...a, [i.key]: true }), {})
  

const [prefs, setPrefs] = useState(notifications || init)

const toggle = (key, val) => setPrefs(p => ({ ...p, [key]: val }))

const handleSave = () => {
    dispatch(setNotificationPreferences(prefs))

    toast.success("Preferences saved", {
        description: "Notification settings updated",
        style: {
                color: 'green'
            }
    })
}
    // const init = NOTIFICATION_GROUPS.flatMap(g => g.items).reduce((a, i) => ({ ...a, [i.key]: true }), {})
    // const [prefs, setPrefs] = useState(init)
 
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold">Notifications</h2>
                <p className="text-sm text-gray-500 mt-0.5">Choose which events send you an email or in-app alert</p>
            </div>
 
            <div className="flex flex-col gap-6">
                {NOTIFICATION_GROUPS.map(({ group, items }) => (
                    <div key={group}>
                        {/* Same xs uppercase tracking-wider section heading as drawers */}
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{group}</p>
                        <div className="bg-gray-50 border border-gray-100 rounded-lg px-4">
                            {items.map(item => (
                                <ToggleRow
                                    key={item.key}
                                    label={item.label}
                                    desc={item.desc}
                                    checked={prefs[item.key]}
                                    onChange={val => toggle(item.key, val)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
 
            <div className="mt-6">
                <Button onClick={handleSave} className="bg-maroon hover:bg-maroon-dark text-white">Save preferences</Button>
            </div>
        </div>
    )
}