import styled from "styled-components";
import UseRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import UseRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingOne } = UseRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingTwo } = UseRecentStays();
  if (isLoadingOne || isLoadingTwo) return <Spinner />
  return ( 
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
 
export default DashboardLayout;