import AdminSubHeader from "@/components/AdminSubHeader"
import TrackingForm from "./TrackingForm"
import { MOCK_TRIPS } from "@/constants/mock_trip_tracking";


export default function TrackTrip (){
    
    return(<>
        <section>
            <AdminSubHeader
                to="/dc"
                heading="Delivery Tracker"
                subh="Real-time freight & logistics monitoring"
                CreateButton={<></>}
                isTrack={true}
            />
            <TrackingForm 
            MOCK_TRIPS={MOCK_TRIPS}
            />
            
        </section>
    </>)
}