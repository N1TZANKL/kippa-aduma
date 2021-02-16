import milestoneModel, { MilestoneModel } from "./model";

export async function getMilestones(): Promise<MilestoneModel[]> {
    return milestoneModel.find({}, "-_id").lean();
}

export async function addMilestone(milestoneData: MilestoneModel): Promise<MilestoneModel> {
    const milestoneDoc = new milestoneModel(milestoneData);
    await milestoneDoc.save();
    return milestoneData;
}
