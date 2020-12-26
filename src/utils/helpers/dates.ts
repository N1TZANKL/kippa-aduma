import moment, { MomentInput } from "moment";

const CALENDAR_FORMATS = {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[Last] dddd",
    nextWeek: "dddd",
    sameElse: "MMMM DD",
};

export function areSameDates(firstDate: MomentInput, secondDate: MomentInput): boolean {
    return moment(firstDate).isSame(moment(secondDate), "date");
}

export function getDatesDifference(date: MomentInput, newerDate: MomentInput, unitOfTime: moment.unitOfTime.Diff): number {
    const dateA = moment(date);
    const dateB = moment(newerDate);
    return dateB.diff(dateA, unitOfTime);
}

export function formatDate(date: MomentInput, withTime = false): string {
    moment.updateLocale("en", { calendar: CALENDAR_FORMATS });

    if (!date) return "";

    const parsedDate = moment(date).calendar();

    if (withTime) return `${parsedDate} at ${formatTime(date)}`;
    return parsedDate;
}

export function formatTime(date: MomentInput): string {
    return moment(date).format("HH:mm");
}

export function sortObjectArrayByDate<T extends Record<string, unknown>>(array: T[], sortKey: string, sortType = "asc"): T[] {
    const sortedArray = array.sort((a, b) => {
        const dateA = moment(a[sortKey] as MomentInput);
        const dateB = moment(b[sortKey] as MomentInput);
        if (dateA.isAfter(dateB)) return 1;
        if (dateA.isBefore(dateB)) return -1;
        return 0;
    });

    return sortType === "asc" ? sortedArray : sortedArray.reverse();
}
