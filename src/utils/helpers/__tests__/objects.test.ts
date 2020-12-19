import * as objectHelpers from "../objects";

// function: filterDuplicatesFromArray

describe("filtered array", () => {
    test("should filter out duplicates from all primitive types", () => {
        const filteredArray = objectHelpers.filterDuplicatesFromArray([1, false, 1, true, null, undefined, true, null, undefined, 1, "hi", true]);
        expect(filteredArray).toStrictEqual([1, false, true, null, undefined, "hi"]);
    });

    test("should not filter out non-primitive values that are essentially the same", () => {
        const filteredArray = objectHelpers.filterDuplicatesFromArray([{ a: 1 }, { b: 2 }, { a: 1 }]);
        expect(filteredArray).toStrictEqual([{ a: 1 }, { b: 2 }, { a: 1 }]);
    });

    test("should stay the same if no duplicate values", () => {
        const filteredArray = objectHelpers.filterDuplicatesFromArray(["hi", "hello"]);
        expect(filteredArray).toStrictEqual(["hi", "hello"]);
    });
});
