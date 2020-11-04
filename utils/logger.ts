import chalk from "chalk";

import { getCurrentTimestamp } from "./helpers/dates";

// TODO: Switch to external library?

export enum LogTypes {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

const LOG_TYPE_TO_FUNCTION: Record<LogTypes, (m: string, e?: ExtendedError) => string> = {
    [LogTypes.SUCCESS]: logSuccess,
    [LogTypes.ERROR]: logError,
    [LogTypes.WARNING]: logWarning,
    [LogTypes.INFO]: logInfo,
};

type ExtendedError = Error & { codeName: string; code: string | number };

export default function log(message: string, type: LogTypes, error?: ExtendedError): void {
    const logFunction = LOG_TYPE_TO_FUNCTION[type];
    // eslint-disable-next-line no-console
    console.log(logFunction(`[${getCurrentTimestamp()}] ${message}`, error));
}

function logSuccess(message: string) {
    return chalk.green(`[kippa-aduma] ${message}`);
}

function logError(message: string, error?: ExtendedError) {
    const errorMessage = `[kippa-aduma] ${message} ${
        error ? `${error.name} ${error.codeName || error.message || ""} (error code ${error.code || "unknown"})` : ""
    }`;
    return chalk.red(errorMessage);
}

function logWarning(message: string) {
    return chalk.yellow(`[kippa-aduma] ${message}`);
}

function logInfo(message: string) {
    return chalk.cyan(`[kippa-aduma] ${message}`);
}
