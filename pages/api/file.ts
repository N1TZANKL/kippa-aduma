import fs from "fs";
import path from "path";

import { NextApiResponse } from "next";

import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import withDBConnection from "utils/middlewares/mongodb";

async function getFile(filePath: string, res: NextApiResponse) {
    const fullPath = path.normalize(path.join(process.cwd(), "/server/storage", filePath));
    if (!fs.existsSync(fullPath)) res.status(400).send("File does not exist");
    else {
        const fileStream = fs.createReadStream(fullPath);
        await new Promise((resolve) => {
            fileStream.pipe(res);
            fileStream.on("end", resolve);
        });
    }
}

// GET /api/file?path=[]
const fileHandler = withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    const { path: filePath } = req.query;
    if (!filePath || typeof filePath !== "string") return res.status(400).send("No file requested");

    // TODO: Protect from directory traversal
    if (typeof filePath !== "string") return res.status(400).send("Path supplied is invalid");

    try {
        return await getFile(filePath, res);
    } catch (error) {
        log("Caught error while attempting to fetch file:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});

export default withDBConnection(fileHandler);
