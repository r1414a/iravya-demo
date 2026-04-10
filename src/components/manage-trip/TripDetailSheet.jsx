import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, User } from "lucide-react"

const statusStyles = {
  in_transit: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
}


export default function TripDetailSheet({ trip, open, onClose }) {
  if (!trip) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
        <SheetHeader className="border-b border-gray-200">
          <SheetTitle>Trip Details</SheetTitle>
          <SheetDescription>
            Complete overview of this trip
          </SheetDescription>
        </SheetHeader>

        <div className="p-3 sm:p-4 flex flex-col gap-6 text-sm flex-1 overflow-y-auto" >

          {/* Top Info */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Trip ID</p>
              <p className="font-mono text-xs sm:text-sm text-maroon font-semibold">{trip.id}</p>
            </div>
            {
              trip.gpsDevice &&
              <div>
                <p className="text-xs text-gray-500">GPS Device</p>
                <p className="font-mono text-xs sm:text-sm text-maroon font-semibold">{trip.gpsDevice}</p>
              </div>
            }


            <Badge className={`${statusStyles[trip.status]} border-0 text-xs`}>
              {trip.status?.replace("_", " ") || "_"}
            </Badge>
          </div>

          {/* Truck + Driver */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck size={16} />
              <div>
                <p className="text-xs text-gray-500">Truck</p>
                <p className="font-medium text-xs sm:text-sm">{trip.truck}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User size={16} />
              <div>
                <p className="text-xs text-gray-500">Driver</p>
                <p className="font-medium text-xs sm:text-sm">{trip.driver}</p>
                <p className="text-muted-foreground text-xs">{trip.phone}</p>
              </div>
            </div>
          </div>

          {/* Source */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Source DC</p>
            <p className="font-medium text-xs sm:text-sm">{trip.sourceDC}</p>
          </div>

          {/* Stops */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Stops</p>
            <div className="flex flex-col gap-2">
              {trip.stops.map((stop, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 border px-3 py-2 rounded-md ${stop.status === "completed"
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50"
                    }`}
                >
                  <span className="text-xs text-gray-500">{i + 1}.</span>
                  <MapPin size={14} />
                  <span className="text-xs sm:text-sm">{stop.name}</span>

                  {stop.status === "completed" && (
                    <span className="ml-auto text-xs text-green-600">Done</span>
                  )}
                </div>
                // <div
                //   key={i}
                //   className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-md"
                // >
                //   <span className="text-xs text-gray-500">{i + 1}.</span>
                //   <MapPin size={14} />
                //   <span>{stop}</span>
                // </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Departed</p>
              <p className="text-xs sm:text-sm">{trip.departedAt || "—"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                {trip.completedAt ? "Completed" : "ETA"}
              </p>
              <p className="text-xs sm:text-sm">{trip.completedAt || trip.eta || "—"}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}