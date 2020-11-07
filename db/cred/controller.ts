import { Credential } from "interfaces";

import credModel, { CredModel } from "./model";

export async function getAllCreds(): Promise<Credential[]> {
    // return cred + _id as id + filter unecessary fields
    return credModel.find({}).then((creds) => creds.map(({ id, _doc: { _id, __v, ...cred } }) => ({ id, ...cred })));
}

export async function createCred(credData: CredModel): Promise<Credential> {
    const credDoc = new credModel(credData);
    const {
        id,
        _doc: { _id: docObjId, __v: docVerKey, ...cred },
    } = await credDoc.save();
    return { id, ...cred };
}

export async function deleteCreds(credIds: string[]): Promise<void> {
    const res = await credModel.deleteMany({ _id: { $in: credIds } });

    if (!res.ok || res.deletedCount !== credIds.length)
        throw new Error(`deleteMany failed. ${res.deletedCount} creds out of ${credIds.length} were deleted.`);
}
