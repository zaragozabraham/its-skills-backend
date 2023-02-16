import { SubjectModel, getSubjectByIdDTO, CreateSubjectDTO, UpdateSubjectDTO, deleteSubjectDTO } from './../models/subject';
export const getAllSubjects = async () => {
    try {
        return await SubjectModel.find();
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const getSubjectById = async ({ id }: getSubjectByIdDTO) => {
    try {
        return await SubjectModel.findById(id)
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const createSubject = async ({ semester,
    title,
    description,
    objectives,
    resources }: CreateSubjectDTO) => {
    if (!semester ||
        !title ||
        !description ||
        !objectives ||
        !resources)
        return {
            status: 400,
            error: 'Todos los campos son obligatorios.'
        }
    try {
        return await SubjectModel.create({
            semester,
            title,
            description,
            objectives,
            resources
        })
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const updateSubject = async ({
    id,
    semester,
    title,
    description,
    objectives,
    resources
}: UpdateSubjectDTO) => {
    if (!id)
        return {
            status: 400,
            error: 'El id es necesario.'
        }
    if (!semester ||
        !title ||
        !description ||
        !objectives ||
        !resources)
        return {
            status: 400,
            error: 'Todos los campos son obligatorios.'
        }
    try {
        return await SubjectModel.findByIdAndUpdate(id, {
            semester,
            title,
            description,
            objectives,
            resources
        },
            {
                new: true,
            }
        )
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const deleteSubject = async ({ id }: deleteSubjectDTO) => {
    if (!id)
        return {
            status: 400,
            error: 'El id es requerido'
        }
    try {
        return await SubjectModel.findByIdAndDelete(id, { new: true })
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
}