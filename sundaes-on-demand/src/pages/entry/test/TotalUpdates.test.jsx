import {render,screen} from "../../../test-utils/testing-library-details";
import userEvent from "@testing-library/user-event";
import Options from "../Options";


test('initial value of scoop and then update value',async()=>{
render(<Options optionType="scoops" />)
const user = userEvent.setup();
//initial value 
const scoopSubtotal = screen.getByText('Scoops total: $',{exact:false});
expect(scoopSubtotal).toHaveTextContent('0.00');

//vanilla scoop
const vanillaTotal = await screen.findByRole('spinbutton',{
    name:"Vanilla"
});
await user.clear(vanillaTotal);
await user.type(vanillaTotal,"1");
expect(vanillaTotal).toHaveTextContent('2.00');

//Chocolate scoop
const chocolateTotal = await screen.findByRole('spinbutton',{
    name:"Chocolate"
});
await user.clear(chocolateTotal);
await user.type(chocolateTotal,"2");
expect(chocolateTotal).toHaveTextContent('6.00');
})