import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

const useBooking = () => {

    const { bookingId } = useParams();
    const {
        data: booking,
        error,
        isLoading
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    })

    return { isLoading, error, booking }
}
 
export default useBooking;