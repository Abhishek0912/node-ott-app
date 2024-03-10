import "express-async-errors";
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.config";
import movieRoutes from './routes/movieRoutes';

dotenv.config();


const app = express();
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '5000');

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', movieRoutes);


const startDB = async () => {
    try {
        await connectDB(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
startDB();

export default app;