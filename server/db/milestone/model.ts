import mongoose from "mongoose";

import Models from "../models";

export type MilestoneModel = {
    title: string;
    achievedOn: string;
};

const milestoneSchema = new mongoose.Schema({
    title: String,
    achievedOn: String,
});

export default mongoose.models?.[Models.MILESTONE] || mongoose.model<MilestoneModel & mongoose.Document>(Models.MILESTONE, milestoneSchema);
