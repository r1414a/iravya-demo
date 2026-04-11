import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Radio, Cpu, ShieldCheck, Siren } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updatePlatformSettings } from "@/lib/features/auth/authSlice"
import { useState } from "react"
import { toast } from "sonner"


function SectionBlock({ icon: Icon, title, children }) {
    return (
        <div className="mb-8 pb-8 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
            <div className="flex items-center gap-2 mb-4">
                <Icon size={14} className="text-maroon" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
            </div>
            {children}
        </div>
    )
}

export function PlatformSection() {
    const dispatch = useDispatch()
const { platformSettings } = useSelector(selectUser)

const [settings, setSettings] = useState(platformSettings)
console.log(settings);


const handleChange = (key, value) => {
    
    setSettings(prev => ({ ...prev, [key]: value }))
}

const handleSave = () => {
    dispatch(updatePlatformSettings(settings))

    toast.success("Platform settings updated",{
        style: {
            color: 'green'
        }
    })
}
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold">Platform settings</h2>
                <p className="text-sm text-gray-500 mt-0.5">System-wide configuration — MQTT, GPS tracking, geofence and alert thresholds</p>
            </div>

            {/* MQTT */}
            <SectionBlock icon={Radio} title="MQTT broker">
                <FieldGroup><FieldSet><FieldGroup>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>Broker host</FieldLabel>
                            <Input 
                                value={settings.mqtt_host}
                                onChange={(e) => handleChange("mqtt_host", e.target.value)}
                                className="font-mono placeholder:text-sm text-sm sm:text-md" placeholder="mqtt.yourdomain.com"/>
                        </Field>
                        <Field>
                            <FieldLabel>Port</FieldLabel>
                            <Input 
                                value={settings.port}
                                onChange={(e) => handleChange("port", e.target.value)} 
                                className="font-mono placeholder:text-sm text-sm sm:text-md" 
                                placeholder="8883" 
                            />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>Topic prefix</FieldLabel>
                        <Input 
                            value={settings.topic_prefix}
                            onChange={(e) => handleChange("topic_prefix", e.target.value)}
                            className="font-mono placeholder:text-sm text-sm sm:text-md" 
                            placeholder="trucks" />
                        <FieldDescription className="text-xs">
                            Devices publish to <span className="font-mono bg-gray-100 px-1 rounded text-xs">{"prefix/{deviceId}/location"}</span>
                        </FieldDescription>
                    </Field>
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            {/* GPS */}
            <SectionBlock icon={Cpu} title="GPS tracking">
                <FieldGroup><FieldSet><FieldGroup>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>Ping interval (seconds)</FieldLabel>
                            <Input 
                                type="number" 
                                value={settings.ping_interval} 
                                onChange={(e) => handleChange("ping_interval", e.target.value)}
                                min="5" 
                                max="60" 
                                className="mt-4 sm:mt-0 placeholder:text-sm text-sm sm:text-md" />
                            <FieldDescription className="text-xs">Lower = more accurate, higher data cost</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>Offline threshold (minutes)</FieldLabel>
                            <Input 
                                type="number" 
                                value={settings.offline_threshold}
                                onChange={(e) => handleChange("offline_threshold", e.target.value)}
                                min="1" max="10" className="placeholder:text-sm text-sm sm:text-md" />
                            <FieldDescription className="text-xs">Marked offline if no ping in this window</FieldDescription>
                        </Field>
                    </div>
                    {/* <Field>
                        <FieldLabel>GPS data retention</FieldLabel>
                        <Select defaultValue="12">
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-white border shadow-md">
                                <SelectGroup>
                                    <SelectLabel>Retention period</SelectLabel>
                                    <SelectItem value="3">3 months</SelectItem>
                                    <SelectItem value="6">6 months</SelectItem>
                                    <SelectItem value="12">1 year</SelectItem>
                                    <SelectItem value="24">2 years</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldDescription className="text-xs">Raw GPS points older than this are compressed and archived automatically</FieldDescription>
                    </Field> */}
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            {/* Geofence defaults */}
            <SectionBlock icon={ShieldCheck} title="Geofence defaults">
                <FieldGroup><FieldSet><FieldGroup>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>Default store radius (m)</FieldLabel>
                            <Input 
                                type="number" 
                                value={settings.store_radius}
                                onChange={(e) => handleChange("store_radius", e.target.value)}
                                min="200" max="500" className="mt-4 sm:mt-0 placeholder:text-sm text-sm sm:text-md"/>
                        </Field>
                        <Field>
                        <FieldLabel>Near-arrival notification (km before store)</FieldLabel>
                        <Input type="number" value={settings.near_arrival} onChange={(e) => handleChange("near_arrival", e.target.value)}  min="5" max="10" />
                        <FieldDescription className="text-xs">Store manager gets a push notification when truck is within this distance</FieldDescription>
                    </Field>
                        {/* <Field>
                            <FieldLabel>Default DC radius (m)</FieldLabel>
                            <Input type="number" defaultValue="300" />
                        </Field> */}
                    </div>
                    
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            {/* Alert thresholds */}
            <SectionBlock icon={Siren} title="Alert thresholds">
                <FieldGroup><FieldSet><FieldGroup>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>Speeding threshold (km/h)</FieldLabel>
                            <Input type="number" value={settings.speed_limit} onChange={(e) => handleChange("speed_limit", e.target.value)} className="placeholder:text-sm text-sm sm:text-md"/>
                            <FieldDescription className="text-xs">Alert fires when truck exceeds this speed</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>Long stop threshold (minutes)</FieldLabel>
                            <Input type="number" value={settings.long_stop} onChange={(e) => handleChange("long_stop", e.target.value)} className="placeholder:text-sm text-sm sm:text-md"/>
                            <FieldDescription className="text-xs">Alert fires when truck is idle this long on a trip</FieldDescription>
                        </Field>
                    </div>
                    {/* <Field>
                        <FieldLabel>Device at store — pickup reminder (hours)</FieldLabel>
                        <Input type="number" defaultValue="24" className="placeholder:text-sm text-sm sm:text-md"/>
                        <FieldDescription className="text-xs">Notify DC operator if a device sits at a store uncollected beyond this duration</FieldDescription>
                    </Field> */}
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            <div className="mt-6">
                <Button onClick={handleSave} className="bg-maroon hover:bg-maroon-dark text-white">Save platform settings</Button>
            </div>
        </div>
    )
}