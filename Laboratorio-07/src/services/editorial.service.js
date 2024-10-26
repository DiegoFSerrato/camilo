import { Editorial } from '../models/editorial.model.js';
import { Book } from '../models/book.model.js';
import { ServiceError } from '../utils/errors/serviceError.js';

// Crear una nueva editorial
export const createEditorial = async (editorialData) => {
    try {
        const newEditorial = new Editorial(editorialData);
        const editorialCreated = await newEditorial.save();
        return editorialCreated;
    } catch (error) {
        throw new ServiceError('Error al crear la editorial', error.code || 'EDITORIAL_CREATION_FAILED');
    }
};

// Eliminar una editorial
export const deleteEditorial = async (id) => {
    try {
        const editorialDeleted = await Editorial.findByIdAndDelete(id);
        if (!editorialDeleted) {
            throw new ServiceError('Editorial no encontrada', 'EDITORIAL_NOT_FOUND');
        }
        return editorialDeleted;
    } catch (error) {
        throw new ServiceError('Error al eliminar la editorial', error.code || 'EDITORIAL_DELETE_FAILED');
    }
};

// Incluir un libro existente en una editorial
export const addBookToEditorial = async (editorialId, bookId) => {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new ServiceError('Libro no encontrado', 'BOOK_NOT_FOUND');
        }

        // Asociar el libro con la editorial
        book.editorial = editorialId;
        const updatedBook = await book.save();
        return updatedBook;
    } catch (error) {
        throw new ServiceError('Error al agregar el libro a la editorial', error.code || 'BOOK_ASSIGN_FAILED');
    }
};

// Obtener todas las editoriales
export const getAllEditorials = async () => {
    try {
        const editorials = await Editorial.find();
        return editorials;
    } catch (error) {
        throw new ServiceError('Error al obtener las editoriales', 'EDITORIAL_FETCH_FAILED');
    }
};
