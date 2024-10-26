import {
    createEditorial,
    deleteEditorial,
    addBookToEditorial,
    getAllEditorials
} from '../services/editorial.service.js';
import { EditorialErrorCodes } from '../utils/errors/editorial.errorCodes.js';
import createError from 'http-errors';

export const createEditorialController = async (req, res, next) => {
    try {
        const editorialData = req.body;
        const editorialCreated = await createEditorial(editorialData);
        res.status(201).json({ message: 'Editorial creada', data: editorialCreated });
    } catch (e) {
        switch (e.code) {
            case EditorialErrorCodes.EDITORIAL_CREATION_FAILED:
                next(createError(500, 'Error al crear la editorial'));
                break;
            default:
                next(e);
        }
    }
};

export const deleteEditorialController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteEditorial(id);
        res.status(200).json({ message: 'Editorial eliminada' });
    } catch (e) {
        switch (e.code) {
            case EditorialErrorCodes.EDITORIAL_NOT_FOUND:
                next(createError(404, 'Editorial no encontrada'));
                break;
            case EditorialErrorCodes.EDITORIAL_DELETE_FAILED:
                next(createError(500, 'Error al eliminar la editorial'));
                break;
            default:
                next(e);
        }
    }
};

export const addBookToEditorialController = async (req, res, next) => {
    try {
        const { editorialId, bookId } = req.params;
        const updatedEditorial = await addBookToEditorial(editorialId, bookId);
        res.status(200).json({ message: 'Libro agregado a la editorial', data: updatedEditorial });
    } catch (e) {
        switch (e.code) {
            case EditorialErrorCodes.EDITORIAL_NOT_FOUND:
                next(createError(404, 'Editorial no encontrada'));
                break;
            case EditorialErrorCodes.BOOK_NOT_FOUND:
                next(createError(404, 'Libro no encontrado'));
                break;
            case EditorialErrorCodes.BOOK_ASSIGN_FAILED:
                next(createError(500, 'Error al agregar el libro a la editorial'));
                break;
            default:
                next(e);
        }
    }
};

export const getAllEditorialsController = async (req, res, next) => {
    try {
        const editorials = await getAllEditorials();
        res.status(200).json({ data: editorials });
    } catch (e) {
        switch (e.code) {
            case EditorialErrorCodes.EDITORIAL_FETCH_FAILED:
                next(createError(500, 'Error al obtener las editoriales'));
                break;
            default:
                next(e);
        }
    }
};
