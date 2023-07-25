import { render, screen } from "../../../test-utils/testing-library-details";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("error response from server", async () => {
  render(<OrderConfirmation setOrderPhase={jest.fn()}/>);
  server.resetHandlers(
    rest.get("http//localhost:3030/order", (req, res, ctx) => (
      res(ctx.status(500))
  )));
  const alerts = await screen.findAllByRole('alert');
  expect(alerts).toHaveTextContent('An unexpected error occured'); 

});
