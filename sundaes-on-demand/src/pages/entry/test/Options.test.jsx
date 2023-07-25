import { render, screen } from "../../../test-utils/testing-library-details";
import Options from "../Options";
import userEvent from "@testing-library/user-event"

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});
test("don't update subtotal if scoop no is invalid", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();
  const vanillaInput = screen.getByRole("spinbutton");
  const scoopSubtotal = screen.getByText("Scoops total: $0.00")

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopSubtotal).toHaveTextContent("0.00")

  //decimal value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");
  expect(scoopSubtotal).toHaveTextContent("0.00")

  //too high value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(scoopSubtotal).toHaveTextContent("0.00")

  //right value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(scoopSubtotal).toHaveTextContent("4.00")


});
