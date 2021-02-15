import { NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";

async function getFile(filePath: string, res: NextApiResponse) {
    const fullPath = path.normalize(path.join(process.cwd(), "/server/storage", filePath));
    if (!fs.existsSync(fullPath)) return res.status(400).send("File does not exist");

    const fileStream = fs.createReadStream(fullPath);
    await new Promise(function (resolve) {
        fileStream.pipe(res);
        fileStream.on("end", resolve);
    });
}

// GET /api/file?path=[]
export default withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    const { path } = req.query;
    if (!path || typeof path !== "string") return res.status(400).send("No file requested");

    // TODO: Protect from directory traversal
    if (typeof path !== "string") return res.status(400).send("Path supplied is invalid");

    try {
        await getFile(path, res);
    } catch (error) {
        log("Caught error while attempting to fetch file:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});
