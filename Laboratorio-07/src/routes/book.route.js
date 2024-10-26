import { Router } from 'express';
import {
    findAllBooksController,
    deleteBookController,
    addBookToAuthorController,
    createBookController
} from '../controllers/book.controller.js';

const bookRouter = Router();

bookRouter.get('/', findAllBooksController); 
bookRouter.post('/', createBookController); 
bookRouter.delete('/:id', deleteBookController); 
bookRouter.put('/:bookId/:authorId', addBookToAuthorController); 

export { bookRouter };