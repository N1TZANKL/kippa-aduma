import log, { LogTypes } from "utils/logger";

const test = async (req: any, res: any) => {
    log(`test routing`, LogTypes.INFO);
    return res.status(200).send();
};

export default test;
