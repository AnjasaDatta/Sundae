import { render, screen } from "../../../test-utils/testing-library-details";
import ScoopOption from "../ScoopOption";
import { userEvent } from "@testing-library/user-event/dist/types/setup";

test("Red input box for invalid scoop", async () => {
  render(<ScoopOption />);
  const user = userEvent.setup();
  const vanillaInput = screen.getByRole("spinbutton");
  //negative value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  //decimal value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  //too high value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  //valid input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");

});
