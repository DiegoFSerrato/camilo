import { Router } from 'express';
import {
    createEditorialController,
    deleteEditorialController,
    addBookToEditorialController,
    getAllEditorialsController
} from '../controllers/editorial.controller.js';

const editorialRouter = Router();

editorialRouter.post('/', createEditorialController);
editorialRouter.delete('/:id', deleteEditorialController);
editorialRouter.put('/:editorialId/books/:bookId', addBookToEditorialController);
editorialRouter.get('/', getAllEditorialsController);

export { editorialRouter };
