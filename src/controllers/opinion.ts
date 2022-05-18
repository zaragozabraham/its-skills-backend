import { OpinionModel, GetOpinionByIdDTO, CreateOpinionDTO, UpdateOpinionDTO, DeleteOpinionDTO } from './../models/opinion';

export const getAllOpinions = async () => {
    try {
        return await OpinionModel.find();
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const getOpinionById = async ({ id }: GetOpinionByIdDTO) => {
    try {
        return await OpinionModel.findById(id);
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const createOpinion = async ({ user, description }: CreateOpinionDTO) => {
    if (!user || !description) return {
        status: 400,
        error: 'Todos los campos son necesarios.'
    }

    try {
        return await OpinionModel.create({
            user,
            description
        })
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const updateOpinion = async ({
    id,
    user,
    description
}: UpdateOpinionDTO) => {
    if (!id)
        return {
            status: 400,
            error: 'El id es necesario'
        }

    if (!user || !description) return {
        status: 400,
        error: 'Todos los campos son necesarios.'
    }
    try {
        return await OpinionModel.findByIdAndUpdate(id, {
            user,
            description
        },
            {
                new: true
            })
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};

export const deleteOpinion = async ({ id }:DeleteOpinionDTO) => {
    if (!id)
    return {
        status: 400,
        error: 'El id es necesario.'
    }
    try {
        return await OpinionModel.findByIdAndDelete(id, {new: true})
    } catch (err) {
        return {
            status: 500,
            error: err
        }
    }
};