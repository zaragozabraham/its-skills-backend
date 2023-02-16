import { model, Schema } from 'mongoose';
import { User } from "./user";

export interface Opinion {
    id: string,
    user: User,
    description: string
};

const schema = new Schema<Opinion>({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    description: { type: String, required: true}
});

export const OpinionModel = model<Opinion>('opinions', schema);

export interface GetOpinionByIdDTO {
    id: string
};

export interface CreateOpinionDTO {
    user: User,
    description: string
};

export interface UpdateOpinionDTO {
    id: string,
    user: User,
    description: string
};

export interface DeleteOpinionDTO {
    id: string
};