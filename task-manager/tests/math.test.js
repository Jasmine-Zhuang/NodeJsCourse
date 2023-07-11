const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math");

test('Should calculate total with tip', () => {
    expect(calculateTip(10, .3)).toBe(13)
}) 

test("Should calculate total with default tip", () => {
  expect(calculateTip(10)).toBe(11.5)
})

test("Should convert 32 fahrenheit to 0 celsius", () => {
  expect(fahrenheitToCelsius(32)).toBe(0)
})

test("Should convert 0 celsius to 32 fahrenheit ", () => {
  expect(celsiusToFahrenheit(0)).toBe(32)
});
