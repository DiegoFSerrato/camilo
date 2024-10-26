import {
  saveAuthor,
  findAuthorById,
  assignBookToAuthor,
  deleteAuthor,
  findAuthorByNameAndLastName,
  getAllAuthors,
} from "../services/author.service.js";
import {
  findBookById,
  deleteAuthorFromBook,
} from "../services/book.service.js";
import createError from "http-errors";
import { AuthorErrorCodes } from "../utils/errors/author.errorCodes.js";
import { BookErrorCodes } from "../utils/errors/book.errorCodes.js";

export const assingBookToAuthorController = async (req, res, next) => {
  try {
    const { bookId, authorId } = req.params;

    const author = await findAuthorById(authorId);

    await findBookById(bookId);

    const authorUpdated = await assignBookToAuthor(author, bookId);
    res
      .status(200)
      .json({ message: "Libro asignado al autor", data: authorUpdated });
  } catch (e) {
    switch (e.code) {
      case AuthorErrorCodes.AUTHOR_NOT_FOUND:
        next(createError(404, "El autor no existe"));
        break;
      case AuthorErrorCodes.AUTHOR_FETCH_BY_ID_FAILED:
        next(createError(500, "Error al buscar el autor por ID"));
        break;
      case BookErrorCodes.BOOK_NOT_FOUND:
        next(createError(404, "El libro no existe"));
        break;
      case BookErrorCodes.BOOK_FETCH_FAILED:
        next(createError(500, "Error al obtener los libros"));
        break;
      case BookErrorCodes.AUTHOR_ALREADY_ASSIGNED:
        next(createError(400, "El libro ya fue asignado al autor"));
        break;
      case BookErrorCodes.AUTHOR_ASSIGN_FAILED:
        next(createError(500, "Error al asignar el autor al libro"));
        break;
      default:
        next(e);
    }
  }
};

export const deleteAuthorController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await findAuthorById(id);

    await deleteAuthorFromBook(id);

    await deleteAuthor(id);
    res.status(200).json({ message: "Autor eliminado" });
  } catch (e) {
    switch (e.code) {
      case AuthorErrorCodes.AUTHOR_NOT_FOUND:
        next(createError(404, "El autor no existe"));
        break;
      case AuthorErrorCodes.AUTHOR_FETCH_BY_ID_FAILED:
        next(createError(500, "Error al buscar el autor por ID"));
        break;
      case AuthorErrorCodes.AUTHOR_DELETE_FAILED:
        next(createError(500, "Error al eliminar el autor"));
        break;
      case BookErrorCodes.AUTHOR_REMOVAL_FAILED:
        next(createError(500, "Error al eliminar el libro de los autores"));
        break;
      default:
        next(e);
    }
  }
};

export const createAuthorController = async (req, res, next) => {
  try {
    const author = req.body;
    const existAuthor = await findAuthorByNameAndLastName(author.name, author.lastName);
    if (existAuthor) throw createError(400, "El autor ya existe");
    const authorCreated = await saveAuthor(author);
    res.status(201).json({ message: "Author created", data: authorCreated });
  } catch (e) {
    switch (e.code) {
      case AuthorErrorCodes.AUTHOR_SEARCH_FAILED:
        next(createError(500, "Error al buscar el autor"));
        break;
      case AuthorErrorCodes.AUTHOR_CREATION_FAILED:
        next(createError(500, "Error al crear el autor"));
        break;
      default:
        next(e);
    }
  }
};

// Controlador para obtener todos los autores
export const getAllAuthorsController = async (req, res, next) => {
  try {
    const authors = await getAllAuthors(); // Llamada al servicio para obtener los autores
    res.status(200).json({ data: authors });
  } catch (e) {
    switch (e.code) {
      case AuthorErrorCodes.AUTHOR_FETCH_FAILED:
        next(createError(500, "Error al obtener los autores"));
        break;
      default:
        next(e);
    }
  }
};
