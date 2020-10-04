import moment from "moment";

export function areSameDates(firstDate, secondDate, timeUnit = "date") {
    return moment(firstDate).isSame(moment(secondDate), timeUnit);
}

export function formatDate(date, withTime = false) {
    moment.updateLocale("en", {
        calendar: {
            lastDay: "[Yesterday]",
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            lastWeek: "dddd (MMM DD)",
            nextWeek: "[Next] dddd",
            sameElse: "MMM DD",
        },
    });

    const parsedDate = moment(date).calendar();

    if (withTime) return `${parsedDate} at ${formatTime(date)}`;
    return parsedDate;
}

export function formatTime(date) {
    return moment(date).format("HH:mm");
}

export function sortByDate(a, b, sortType = "asc") {
    const dateA = moment(a);
    const dateB = moment(b);
    const sort = dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
    return sortType === "asc" ? sortType : sortType * -1;
}

export function sortObjectArrayByDate(array, sortKey, sortType = "asc") {
    const sortedArray = array.sort((a, b) => {
        const dateA = moment(a[sortKey]);
        const dateB = moment(b[sortKey]);
        return dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
    });

    return sortType === "asc" ? sortedArray : sortedArray.reverse();
}

export function getDatesDifference(a, b, unitOfTime) {
    const dateA = moment(a);
    const dateB = moment(b);
    return dateB.diff(dateA, unitOfTime);
}

export function getCurrentTimestamp() {
    return moment(new Date()).locale("en-il").format("L LTS");
}
