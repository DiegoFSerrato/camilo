import { Router } from 'express';
import {
    createAuthorController,
    assingBookToAuthorController,
    deleteAuthorController,
    getAllAuthorsController
} from '../controllers/author.controller.js';

const authorRouter = Router();

authorRouter.get('/', getAllAuthorsController); 
authorRouter.post('/', createAuthorController); 
authorRouter.delete('/:id', deleteAuthorController); 
authorRouter.put('/:authorId/:bookId', assingBookToAuthorController); 

export { authorRouter };