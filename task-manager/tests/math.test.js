const { calculateTip } = require('../src/math')

test('Should calculate total with tip', () => {
    expect(calculateTip(10, .3)).toBe(13)
}) 

test("Should calculate total with default tip", () => {
  expect(calculateTip(10)).toBe(11.5);
}); 