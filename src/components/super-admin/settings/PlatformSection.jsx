import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Radio, Cpu, ShieldCheck, Siren } from "lucide-react"

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
                            <Input defaultValue="mqtt.fleettrack.in" className="font-mono placeholder:text-sm text-sm sm:text-md" placeholder="mqtt.yourdomain.com"/>
                        </Field>
                        <Field>
                            <FieldLabel>Port</FieldLabel>
                            <Input defaultValue="8883" className="font-mono placeholder:text-sm text-sm sm:text-md" placeholder="8883" />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>Topic prefix</FieldLabel>
                        <Input defaultValue="trucks" className="font-mono placeholder:text-sm text-sm sm:text-md" placeholder="trucks" />
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
                            <Input type="number" defaultValue="10" min="5" max="60" className="mt-4 sm:mt-0 placeholder:text-sm text-sm sm:text-md" />
                            <FieldDescription className="text-xs">Lower = more accurate, higher data cost</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>Offline threshold (minutes)</FieldLabel>
                            <Input type="number" defaultValue="2" min="1" max="10" className="placeholder:text-sm text-sm sm:text-md" />
                            <FieldDescription className="text-xs">Marked offline if no ping in this window</FieldDescription>
                        </Field>
                    </div>
                    <Field>
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
                    </Field>
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            {/* Geofence defaults */}
            <SectionBlock icon={ShieldCheck} title="Geofence defaults">
                <FieldGroup><FieldSet><FieldGroup>
                    <div className="flex gap-3">
                        <Field>
                            <FieldLabel>Default store radius (m)</FieldLabel>
                            <Input type="number" defaultValue="200" className="mt-4 sm:mt-0 placeholder:text-sm text-sm sm:text-md"/>
                        </Field>
                        <Field>
                        <FieldLabel>Near-arrival notification (km before store)</FieldLabel>
                        <Input type="number" defaultValue="5" min="1" max="20" />
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
                            <Input type="number" defaultValue="80" className="placeholder:text-sm text-sm sm:text-md"/>
                            <FieldDescription className="text-xs">Alert fires when truck exceeds this speed</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>Long stop threshold (minutes)</FieldLabel>
                            <Input type="number" defaultValue="15" className="placeholder:text-sm text-sm sm:text-md"/>
                            <FieldDescription className="text-xs">Alert fires when truck is idle this long on a trip</FieldDescription>
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>Device at store — pickup reminder (hours)</FieldLabel>
                        <Input type="number" defaultValue="24" className="placeholder:text-sm text-sm sm:text-md"/>
                        <FieldDescription className="text-xs">Notify DC operator if a device sits at a store uncollected beyond this duration</FieldDescription>
                    </Field>
                </FieldGroup></FieldSet></FieldGroup>
            </SectionBlock>

            <div className="mt-6">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">Save platform settings</Button>
            </div>
        </div>
    )
}