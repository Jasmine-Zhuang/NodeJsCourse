const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require("../src/math");

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
})

test('Should add 2 numbers', (done) => {
    add(1, 3).then((sum) => {
        expect(sum).toBe(4)
        done()
    })
})

test("Should add 2 numbers async/await", async () => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
})