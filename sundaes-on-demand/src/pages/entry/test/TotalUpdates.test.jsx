import {render,screen} from "../../../test-utils/testing-library-details";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";


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
});

test('initial value of topping and then update value',async()=>{
    render(<Options optionType="toppings" />)
    const user = userEvent.setup();
    //initial value 
    const toppingSubtotal = screen.getByText('Toppings total: $',{exact:false});
    expect(toppingSubtotal).toHaveTextContent('0.00');
    
    //cherry topping
    const cheries = await screen.findByRole('checkbox',{
        name:"Cherries"
    });
    await user.click(cheries);
    expect(cheries).toHaveTextContent('1.50');
    //hot fudge topping
    const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
    await user.click(hotFudgeCheckbox);
    expect(toppingSubtotal).toHaveTextContent("3.00");

    //unchecking both
    await user.click(cheries);
    await user.click(hotFudgeCheckbox);
    expect(toppingSubtotal).toHaveTextContent("0.00");
    });

    describe("grand total",()=>{
        test("Initial grand total",()=>{
            const {unmount} = render(<OrderEntry />);
            const grandTotal = screen.getByText('Grand total: $',{exact:false});
            expect(grandTotal).toHaveTextContent('0.00')
            unmount();
        });
        test("updates scoop properly if scoop added first",async()=>{
            const user = userEvent.setup();
            render(<OrderEntry />);
            const grandTotal = screen.getByText('Grand total: $',{exact:false});
            //adding 2 scoops of Vanilla
            const vanillaTotal = await screen.findByRole('spinbutton',{
                name:"Vanilla"
            });
            await user.clear(vanillaTotal);
            await user.type(vanillaTotal,"2");
            expect(grandTotal).toHaveTextContent('4.00');
            //checking cherries
            const cherriesTotal = await screen.findByRole('spinbutton',{
                name : "Cherries"
            });
            await user.click(cherriesTotal);
            expect(grandTotal).toHaveTextContent('5.50');

        });
        test("updates topping properly if topping added first",async ()=>{
            render(<OrderEntry />);
            const user = userEvent.setup();
            const grandTotal = screen.getByText('Grand total: $',{exact:false});
            //adding cherries
            const cherriesTotal = await screen.findByRole('spinbutton',{
                name : "Cherries"
            });
            await user.click(cherriesTotal);
            expect(grandTotal).toHaveTextContent('1.50');

            //adding Vanilla
            const vanillaTotal = await screen.findByRole('spinbutton',{
                name:"Vanilla"
            });
            await user.clear(vanillaTotal);
            await user.type(vanillaTotal,"2");
            expect(grandTotal).toHaveTextContent('5.50');
        });
        test("grand total updates if one get removed",async()=>{
            render(<OrderEntry />)
            const user = userEvent.setup();
            const grandTotal = screen.getByText('Grand total: $',{exact:false});
            //Checking cherries
            const cherriesTotal = await screen.findByRole('spinbutton',{
                name : "Cherries"
            });
            await user.click(cherriesTotal); // 1.50
            //adding 2 scoops of Vanilla
            const vanillaTotal = await screen.findByRole('spinbutton',{
                name:"Vanilla"
            });
            await user.clear(vanillaTotal);
            await user.type(vanillaTotal,"2");

            //removing 1 scoop of Vanilla
            await user.clear(vanillaTotal);
            await user.type(vanillaTotal,"1");
            expect(grandTotal).toHaveTextContent('3.50');
            
            //unchecking Cherries
            await user.click(cherriesTotal);
            expect(grandTotal).toHaveTextContent('2.00');
        });
    });