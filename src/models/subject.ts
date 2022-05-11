import { Schema, model } from "mongoose";

export interface Subject {
    id: string,
    semester: number,
    title: string,
    description: string,
    objectives: string[],
    resources: string[]
};

const schema = new Schema<Subject>({
    semester: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    objectives: [{ type: Array, required: true }],
    resources: [{ type: Array, required: true }]
});

export const SubjectModel = model<Subject>("subjects", schema);

export interface getSubjectByIdDTO {
    id: string;
}

export interface CreateSubjectDTO {
    semester: number,
    title: string,
    description: string,
    objectives: string[],
    resources: string[]
};

export interface UpdateSubjectDTO {
    id: string,
    semester: number,
    title: string,
    description: string,
    objectives: string[],
    resources: string[]
};

export interface deleteSubjectDTO {
    id: string;
};