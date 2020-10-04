import { withIronSession } from "utils/session";

export default withIronSession(async (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});
