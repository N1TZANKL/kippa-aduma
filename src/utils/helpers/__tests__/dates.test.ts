import moment, { MomentInput } from "moment";

import * as dateHelpers from "../dates";

// function: areSameDates

describe("dates", () => {
    test("should be the same", () => {
        expect(dateHelpers.areSameDates(new Date(), new Date())).toBe(true);
    });

    test("should be the same, different input types but same value", () => {
        expect(dateHelpers.areSameDates(new Date("01-01-1998"), "1997-12-31T22:00:00.000Z")).toBe(true);
    });

    test("should not be the same", () => {
        const dateOne = moment(new Date());
        const dateTwo = moment(new Date()).add(1, "day");
        expect(dateHelpers.areSameDates(dateOne, dateTwo)).toBe(false);
    });
});

// function: getDatesDifference

describe("date difference", () => {
    test("should be zero", () => {
        const now = new Date();
        expect(dateHelpers.getDatesDifference(now, now, "millisecond")).toBe(0);
    });

    test("should be the zero, different input types but same value", () => {
        expect(dateHelpers.getDatesDifference(new Date("01-01-1998"), "1997-12-31T22:00:00.000Z", "day")).toBe(0);
    });

    test("should be 30 minutes", () => {
        const dateOne = moment(new Date());
        const dateTwo = moment(new Date()).add(30, "minute");
        expect(dateHelpers.getDatesDifference(dateOne, dateTwo, "minute")).toBe(30);
    });
});

// function: formatDate

describe("formatted date", () => {
    test('should match "January 11"', () => {
        const randomOldDate = "1998-01-11";
        expect(dateHelpers.formatDate(randomOldDate)).toBe("January 11");
    });

    test('should match "Last [weekday]"', () => {
        const sixDaysAgo = moment().subtract(6, "day");
        expect(dateHelpers.formatDate(sixDaysAgo)).toMatch(/^Last [A-Za-z]*day$/);
    });

    test('should match "Today"', () => {
        expect(dateHelpers.formatDate(new Date())).toBe("Today");
    });

    test('should match "Yesterday"', () => {
        const yesterday = moment(new Date()).subtract(1, "day");
        expect(dateHelpers.formatDate(yesterday)).toBe("Yesterday");
    });

    test('should match "Tomorrow"', () => {
        const tomorrow = moment(new Date()).add(1, "day");
        expect(dateHelpers.formatDate(tomorrow)).toBe("Tomorrow");
    });

    test('should match "Tomorrow at 12:34" (withTime flag)', () => {
        const tomorrow = moment(new Date()).add(1, "day").set({ hour: 12, minute: 34 });
        expect(dateHelpers.formatDate(tomorrow, true)).toBe("Tomorrow at 12:34");
    });
});

// function: formatTime

describe("formatted time", () => {
    test("should match format [hour]:[minutes]", () => {
        expect(dateHelpers.formatTime("2011-11-11 22:23:24")).toBe("22:23");
    });
});

// function: sortObjectArrayByDate

describe("sorted array", () => {
    type ExampleArrayItemType = { id: number; timestamp: MomentInput };

    const exampleArray: ExampleArrayItemType[] = [
        { id: 1, timestamp: moment().add(1, "day") }, // now + 1 day
        { id: 2, timestamp: moment().subtract(3, "day") }, // now - 3 days
        { id: 3, timestamp: moment() },
        { id: 4, timestamp: moment().add(1, "minute") }, // now + 1 minute
        { id: 5, timestamp: moment().subtract(10, "minute") }, // now - 10 minutes
    ];

    test("should be defaultively sorted from oldest to newest", () => {
        const sortedArrayAscending = dateHelpers.sortObjectArrayByDate<ExampleArrayItemType>(exampleArray, "timestamp");
        expect(sortedArrayAscending.map((item) => item.id)).toStrictEqual([2, 5, 3, 4, 1]);
    });

    test('should be sorted from newest to oldest if third parameter is not "asc"', () => {
        const sortedArrayAscending = dateHelpers.sortObjectArrayByDate<ExampleArrayItemType>(exampleArray, "timestamp", "desc");
        expect(sortedArrayAscending.map((item) => item.id)).toStrictEqual([2, 5, 3, 4, 1].reverse());
    });

    test("should stay the same if the dates are the same", () => {
        const now = moment();
        const arr: ExampleArrayItemType[] = [
            { id: 1, timestamp: now },
            { id: 2, timestamp: now },
        ];
        const sortedArrayAscending = dateHelpers.sortObjectArrayByDate<ExampleArrayItemType>(arr, "timestamp");
        expect(sortedArrayAscending.map((item) => item.id)).toStrictEqual([1, 2]);
    });
});

// function: getTodaysData

describe("today's data", () => {
    test("should match format [weekday], [month] [day] at XX:XX AM/PM", () => {
        expect(dateHelpers.getTodaysData()).toMatch(/^[a-z]*day, [a-z]* \d{1,2} at \d{1,2}:\d{1,2} [AP]M$/i);
    });
});
