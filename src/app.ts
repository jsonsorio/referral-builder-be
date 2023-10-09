import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import contactsRoutes from './routes/contacts';

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/contacts", contactsRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "Something went wrong";
    let statusCode = 500;

    if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }

    res.status(statusCode).json({ error: errorMessage });
});

export default app;