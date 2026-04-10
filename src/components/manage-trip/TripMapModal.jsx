import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MapPin } from "lucide-react"

export default function TripMapModal({ open, onClose, trip }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Trip Route Map</DialogTitle>
        </DialogHeader>

        <div className="mt-4">

          {/* Fake Map UI */}
          <div className="h-80 bg-gray-100 border rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              Map view (Google Maps / Mapbox integration goes here)
            </p>
          </div>

          {/* Stops */}
          <div className="mt-4 flex flex-wrap gap-2">
            {trip?.stops?.map((stop, i) => (
              <div
                key={i}
                className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                <MapPin size={10} />
                {stop.name}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}