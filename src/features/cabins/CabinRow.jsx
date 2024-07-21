import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { UseDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import UseCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


const CabinRow = ({ cabin }) => {
  
  const  { isDeleting, deleteCabin } = UseDeleteCabin();
  const { isCreating, createCabin } = UseCreateCabin();

  const { 
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image
  } = cabin;

  const hanleDuplicate = ()=> {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image
    })
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>
        {formatCurrency(regularPrice)}
      </Price>
      {
        discount ?
        <Discount>
          {
            formatCurrency(discount)
          }
        </Discount>
        : <span>&ndash;</span>
      }
      <div
        style={{
          display: "flex",
          columnGap: 5
        }}
      >
        <button
          disabled={isCreating}
          onClick={hanleDuplicate} 
        >
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin" >
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-cabin" >
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete-cabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete 
              resourceName="cabins"
              onConfirm={()=> deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;