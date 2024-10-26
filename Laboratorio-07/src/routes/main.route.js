import { bookRouter } from './book.route.js';
import { authorRouter } from './author.route.js';
import { editorialRouter } from './editorial.route.js';
import { Router } from 'express';

const mainRouter = Router();

mainRouter.use('/books', bookRouter);
mainRouter.use('/authors', authorRouter);
mainRouter.use('/editorials', editorialRouter);

export { mainRouter };