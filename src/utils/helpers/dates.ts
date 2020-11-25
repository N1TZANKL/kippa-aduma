import moment, { MomentInput } from "moment";

export function areSameDates(firstDate: MomentInput, secondDate: MomentInput): boolean {
    return moment(firstDate).isSame(moment(secondDate), "date");
}

export function formatDate(date: MomentInput, withTime = false): string {
    moment.updateLocale("en", {
        calendar: {
            lastDay: "[Yesterday]",
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            lastWeek: "dddd (MMM. D)",
            nextWeek: "[Next] dddd",
            sameElse: "MMM DD",
        },
    });

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

export function getDatesDifference(a: MomentInput, b: MomentInput, unitOfTime: moment.unitOfTime.Diff): number {
    const dateA = moment(a);
    const dateB = moment(b);
    return dateB.diff(dateA, unitOfTime);
}

export function getCurrentTimestamp(): string {
    return moment(new Date()).locale("en-il").format("L LTS");
}
