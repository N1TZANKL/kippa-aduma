import { IncomingMessage } from "http";
import { Session } from "next-iron-session";

declare module "http" {
    interface IncomingMessage {
        session: Session;
    }
}