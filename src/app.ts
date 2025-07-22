import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./utils/apiError";

const app = express();

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); 

app.use(morgan('dev'));
app.use(cors({
    origin: process.env['CORS_ORIGIN'] || "*",
    credentials: true
}));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



app.get('/ping', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pong | Server is running",
        error: [],
        data: null
    });
})

// app.use("/api", routes);

export { app };
