import mongoose from "mongoose";

import Models from "../models";

export enum CredentialTypes {
    LOCAL = "local",
    DOMAIN = "domain",
    APPLICATIVE = "applicative",
}

export type CredModel = {
    username: string;
    password: string;
    type: CredentialTypes;
    worksOn: string;
    additionalInformation?: string;
};

const credSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String,
    worksOn: String,
    additionalInformation: String,
});

export default mongoose.models?.[Models.CREDENTIAL] || mongoose.model<CredModel & mongoose.Document>(Models.CREDENTIAL, credSchema);
