import mongoose from "mongoose";

import credModel, { CredModel } from "./model";

export async function getAllCreds(): Promise<Credential[]> {
    // return cred + _id as id + filter unecessary fields
    return credModel.find({}).then((creds) => creds.map(({ id, _doc: { _id, __v, ...cred } }) => ({ id, ...cred })));
}

export async function createCred(credData: CredModel): Promise<Document> {
    const credDoc = new credModel(credData);
    return credDoc.save();
}

export async function deleteCreds(credIds: string[]): Promise<void> {
    credModel.remove({
        _id: {
            $in: credIds.map((id) => mongoose.Types.ObjectId(id)),
        },
    });
}
