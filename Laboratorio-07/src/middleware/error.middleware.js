import createError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        error: {
            message,
            statusCode,
        },
    });
};
