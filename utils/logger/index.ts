import chalk from "chalk";
import { getCurrentTimestamp } from "utils/helpers/dates";

export enum LogTypes {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

const LOG_TYPE_TO_FUNCTION = {
    [LogTypes.SUCCESS]: logSuccess,
    [LogTypes.ERROR]: logError,
    [LogTypes.WARNING]: logWarning,
    [LogTypes.INFO]: logInfo,
};

export default function log(message: string, type: LogTypes) {
    const logFunction = LOG_TYPE_TO_FUNCTION[type];
    console.log(logFunction(`[${getCurrentTimestamp()}] ${message}`));
}

function logSuccess(message: string) {
    return chalk.green(`[+] ${message}`);
}

function logError(message: string) {
    return chalk.red(`[-] ${message}`);
}

function logWarning(message: string) {
    return chalk.yellow(`[!] ${message}`);
}

function logInfo(message: string) {
    return chalk.cyan(`[*] ${message}`);
}
