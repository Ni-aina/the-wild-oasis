import styled from "styled-components";
import UseRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import UseRecentStays from "./useRecentStays";
import Stats from "./Stats";
import UseCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingOne } = UseRecentBookings();
  const { confirmedStays, numDays, isLoading: isLoadingTwo } = UseRecentStays();
  const { cabins, isLoading: isLoadingThree } = UseCabins();
  const cabinCount = cabins?.length;
  if (isLoadingOne || isLoadingTwo || isLoadingThree) return <Spinner />
  return ( 
    <StyledDashboardLayout>
      <Stats 
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabinCount}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
 
export default DashboardLayout;