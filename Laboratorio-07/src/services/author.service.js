import { Author } from "../models/author.model.js";
import { AuthorErrorCodes } from "../utils/errors/author.errorCodes.js";
import { ServiceError } from "../utils/errors/serviceError.js";

export const saveAuthor = async (author) => {
  const newAuthor = new Author(author);
  try {
    const authorCreated = await newAuthor.save();
    return authorCreated;
  } catch (error) {
    throw new ServiceError(
      "Error al crear el autor",
      AuthorErrorCodes.AUTHOR_CREATION_FAILED
    );
  }
};

export const findAuthorByNameAndLastName = async (name, lastName) => {
  try {
    const author = await Author.findOne({ name, lastName });
    return author || null;
  } catch (error) {
    throw new ServiceError(
      "Error al buscar el autor",
      AuthorErrorCodes.AUTHOR_SEARCH_FAILED
    );
  }
};

export const assignBookToAuthor = async (author, bookId) => {
  try {
    const existBook = author.books.find((book) => book.toString() === bookId);
    if (existBook)
      throw new ServiceError(
        "El libro ya fue asignado al autor",
        AuthorErrorCodes.BOOK_ALREADY_ASSIGNED
      );

    author.books.push(bookId);
    const authorUpdated = await author.save();
    return authorUpdated;
  } catch (error) {
    throw new ServiceError(
      "Error al asignar el libro al autor",
      error.code || AuthorErrorCodes.BOOK_ASSIGN_FAILED
    );
  }
};

export const findAuthorById = async (id) => {
  try {
    const author = await Author.findById(id);
    if (!author)
      throw new ServiceError(
        "Autor no encontrado",
        AuthorErrorCodes.AUTHOR_NOT_FOUND
      );
    return author;
  } catch (error) {
    throw new ServiceError(
      "Error al buscar el autor por ID",
      error.code || AuthorErrorCodes.AUTHOR_FETCH_BY_ID_FAILED
    );
  }
};

export const deleteBookFromAuthor = async (bookId) => {
    try {
        console.log(`Intentando eliminar el libro con ID: ${bookId} de los autores...`);
        const updatesAuthors = await Author.updateMany(
            { books: bookId },
            { $pull: { books: bookId } }
        );

        console.log('Resultado de la actualización:', updatesAuthors);

        if (updatesAuthors.matchedCount === 0) {
            console.log('No se encontraron autores con el libro especificado.');
            return { message: 'No se encontraron autores con el libro especificado, no es necesario actualizar.' };
        }

        return updatesAuthors;
    } catch (error) {
        console.error('Error en deleteBookFromAuthor:', error);
        throw new ServiceError('Error al eliminar el libro de los autores', error.code || AuthorErrorCodes.BOOK_DELETE_FAILED);
    }
};



export const deleteAuthor = async (id) => {
  try {
    const authorDelete = await Author.findByIdAndDelete(id);
    if (!authorDelete)
      throw new ServiceError(
        "Autor no encontrado",
        AuthorErrorCodes.AUTHOR_NOT_FOUND
      );
    return authorDelete;
  } catch (error) {
    throw new ServiceError(
      "Error al eliminar el autor",
      error.code || AuthorErrorCodes.AUTHOR_DELETE_FAILED
    );
  }
};

export const getAllAuthors = async () => {
  try {
    const authors = await Author.find();
    return authors;
  } catch (error) {
    throw new ServiceError(
      "Error al obtener los autores",
      AuthorErrorCodes.AUTHOR_FETCH_FAILED
    );
  }
};
