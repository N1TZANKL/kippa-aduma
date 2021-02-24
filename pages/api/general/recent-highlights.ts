import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getHighlights } from "server/db/general.controller";
import withDBConnection from "utils/middlewares/mongodb";

// GET /api/general/recent-highlights
const highlightsHandler = withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getHighlights());
    } catch (error) {
        log("Caught error while attempting to fetch recent highlights:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});

export default withDBConnection(highlightsHandler);
