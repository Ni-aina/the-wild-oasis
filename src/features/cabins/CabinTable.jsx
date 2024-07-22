import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import UseCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {

  const [searchParams] = useSearchParams()

  const { isLoading, cabins } = UseCabins();

  if (isLoading) return <Spinner />

  let filteredCabins;
  const filterValue = searchParams.get("discount") || "all";

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter(item =>item.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter(item => item.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body 
          data={filteredCabins} 
          render={
            cabin => 
              <CabinRow 
                key={cabin.id}
                cabin={cabin}            
              />
            } 
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;