import express from 'express';
import 'dotenv/config';
import {errorHandler} from './src/middleware/error.middleware.js';
import {mainRouter} from './src/routes/main.route.js';
import {connectiondb} from './src/config/dbConnection.config.js';
const app = express();
connectiondb();
app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
console.log(`Server is running on port ${PORT}`);
})