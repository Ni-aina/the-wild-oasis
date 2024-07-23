import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import UseCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {

  const [searchParams] = useSearchParams()

  const { isLoading, cabins } = UseCabins();

  if (isLoading) return <Spinner />

  if (!cabins.length) return <Empty resourceName="cabins" />

  let filteredCabins;
  const filterValue = searchParams.get("discount") || "all";

  // 1 FILTER
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter(item =>item.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter(item => item.discount > 0);

  // 2 SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === "name") {
      if (a.name < b.name) return -1 * modifier;
      if (a.name > b.name) return 1 * modifier;
      return 0;
    }
    return (a[field] - b[field]) * modifier;
  });

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
          data={sortedCabins} 
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