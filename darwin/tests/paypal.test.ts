import { generateAccessToken } from "../lib/paypal/paypal";

//Test to generate token from paypal
test("generates token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});
