import * as stringHelpers from "../strings";

// function: firstLetterUppercase

test("should make first letter of string uppercase", () => {
    const string = stringHelpers.firstLetterUppercase("kippa");
    expect(string).toBe("Kippa");
});
