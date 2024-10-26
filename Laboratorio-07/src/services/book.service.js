import { Book } from "../models/book.model.js";
import { BookErrorCodes } from "../utils/errors/book.errorCodes.js";
import { ServiceError } from "../utils/errors/serviceError.js";

export const findAllBooks = async () => {
  try {
    const books = await Book.find()
    .populate("authors")
    .populate("editorial", "name address"); 
    return books;
  } catch (error) {
    throw new ServiceError(
      "Error al obtener los libros",
      BookErrorCodes.BOOK_FETCH_FAILED
    );
  }
};

export const deleteBook = async (id) => {
  try {
      const bookDeleted = await Book.findByIdAndDelete(id);
      if (!bookDeleted) {
          throw new ServiceError(
              'Libro no encontrado',
              BookErrorCodes.BOOK_NOT_FOUND
          );
      }
      return bookDeleted;
  } catch (error) {
      throw new ServiceError(
          'Error al eliminar el libro',
          error.code || BookErrorCodes.BOOK_DELETE_FAILED
      );
  }
};

export const findBookByTitle = async (title) => {
  try {
    const book = await Book.findOne({ title });
    return book || null;
  } catch (error) {
    throw new ServiceError(
      "Error al buscar el libro por título",
      BookErrorCodes.BOOK_FETCH_FAILED
    );
  }
};

export const findBookById = async (id) => {
  try {
    const book = await Book.findById(id);
    if (!book)
      throw new ServiceError(
        "Libro no encontrado",
        BookErrorCodes.BOOK_NOT_FOUND
      );
    return book;
  } catch (error) {
    throw new ServiceError(
      "Error al buscar el libro por ID",
      error.code || BookErrorCodes.BOOK_FETCH_FAILED
    );
  }
};

export const deleteAuthorFromBook = async (authorId) => {
  try {
    const updatesBooks = await Book.updateMany(
      { authors: authorId },
      { $pull: { authors: authorId } }
    );
    if (!updatesBooks)
      throw new ServiceError(
        "Error al eliminar los autores del libro",
        BookErrorCodes.AUTHOR_REMOVAL_FAILED
      );
    return updatesBooks;
  } catch (error) {
    throw new ServiceError(
      "Error al eliminar los autores del libro",
      error.code || BookErrorCodes.AUTHOR_REMOVAL_FAILED
    );
  }
};

export const addAuthorToBook = async (book, authorId) => {
  try {
    const existAuthor = book.authors.find(
      (author) => author.toString() === authorId
    );
    if (existAuthor)
      throw new ServiceError(
        "El autor ya fue asignado al libro",
        BookErrorCodes.AUTHOR_ALREADY_ASSIGNED
      );
    book.authors.push(authorId);
    const bookUpdated = await book.save();
    return bookUpdated;
  } catch (error) {
    throw new ServiceError(
      "Error al asignar el autor al libro",
      BookErrorCodes.AUTHOR_ASSIGN_FAILED
    );
  }
};

export const createBook = async (bookData) => {
  try {
    const existingBook = await Book.findOne({ title: bookData.title });
    if (existingBook) {
      throw new ServiceError(
        "El libro ya existe",
        BookErrorCodes.BOOK_ALREADY_EXISTS
      );
    }
    const newBook = new Book(bookData);
    const bookCreated = await newBook.save();
    return bookCreated;
  } catch (error) {
    throw new ServiceError(
      "Error al crear el libro",
      error.code || BookErrorCodes.BOOK_CREATION_FAILED
    );
  }
};
