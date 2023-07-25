import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";
import Button from "react-bootstrap/Button"


export default function OrderEntry({setOrderPhase}) {
  const {total} = useOrderDetails();
  const orderDisabled = total.scoops === 0;
  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(total.scoops+total.toppings)}</h2>
      <Button disabled={orderDisabled} onClick={()=>setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
}