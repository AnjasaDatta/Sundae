import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test('Order phase for happy path',async ()=>{
const user = userEvent.setup();
//render the app
const {unmount} = render(<App />);
//add ice cream scoops and toppings
const VanillaScoop = await screen.findByRole('spinbutton',{
    name:"Vanilla"
});
await user.clear(VanillaScoop);
await user.type(VanillaScoop,'1')

const CherryTopping = await screen.findByRole('spinbutton',{
    name:"Cherries"
});
await user.click(CherryTopping);
//find and click order button
const orderButton = screen.getByRole('button',{
    name:/order sundae/i
});
await user.click(orderButton);
//check summary info based on order
const summaryHeading = screen.getByRole('heading',{
    name:"Order Summary"
});
expect(summaryHeading).toBeInTheDocument();
const scoopHeading = screen.getByRole('heading',{
    name:'Scoops: $2.00'
});
expect(scoopHeading).toBeInTheDocument();
const toppingHeading = screen.getByRole('heading',{
    name:"Toppings: $1.50"
});
expect(toppingHeading).toBeInTheDocument();
//check summary option items
expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
expect(screen.getByText("Cherries")).toBeInTheDocument();

//accept terms and conditions and click to confirm order
const checkbox = screen.getByRole('checkbox',{
    name:/terms and conditions/i
});
await user.click(checkbox);
const confirmButton = screen.getByRole('button',{
    name:/confirm order/i
});
await user.click(confirmButton);
//expect loader
const loader = screen.getByText(/loading/i);
expect(loader).toBeInTheDocument();

//confirm order no on the confirmation page
const header = await screen.findByRole('heading',{
    name:/thank you/i
});
expect(header).toBeInTheDocument();
const notLoading = screen.queryByText('loading');
expect(notLoading).not.toBeInTheDocument();

const orderNo = await screen.findByText(/order number/i);
expect(orderNo).toBeInTheDocument();

//click new order button on the confirmation page
const newOrderButton = screen.getByRole('button',{
    name:/new order/i
});
await user.click(newOrderButton);

//check scoops total and topping total is reset to 0

const scooptotal = await screen.findByText('Scoops total: $',{exact:false});
expect(scooptotal).toHaveTextContent('0.00')
const toppingTotal = await screen.findByText('Toppings total: $',{exact:false});
expect(toppingTotal).toHaveTextContent('0.00')

unmount();
})