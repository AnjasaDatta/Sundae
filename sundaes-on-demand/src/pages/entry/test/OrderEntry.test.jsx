import { render, screen,waitFor } from "../../../test-utils/testing-library-details";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { userEvent } from "@testing-library/user-event/dist/types/setup";

test("handle errors for scoops and topping routes", async () => {
  server.resetHandlers(
    rest.get("http//localhost:3030/scoops", (req, res, ctx) => (
      res(ctx.status(500))
  )),
    rest.get("http//localhost:3030/toppings", (req, res, ctx) => (
        res(ctx.status(500))
    ))
  );
  render(<OrderEntry setOrderPhase={jest.fn()}/>);
  await waitFor(async()=>{
    const alerts = await screen.findAllByRole('alert');
  expect(alerts).toHaveLength(2);
  });
});
test("order button should be disabled",async ()=>{
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const orderButton = screen.getByRole('button',{
    name:/order sundae/i
  });
  expect(orderButton).toBeDiabled();
  //adding 1 scoop of Vanilla

  const Vanilla = await screen.findByRole('spinbutton',{
    name:"Vanilla"
  });
  await user.clear(Vanilla);
  await user.type(Vanilla,"1");
  expect(orderButton).toBeEnabled();

  //removing 1 scoop of Vanilla
  await user.clear(Vanilla);
  await user.type(Vanilla,"0")
  expect(orderButton).toBeDiabled();
})
