import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // CORS kütüphanesini ekle
import paymentRoutes from './routes/payment.route.js';

dotenv.config();

mongoose.connect('mongodb+srv://angular:B8KkjTGr8J0JnhhJ@cluster0.v6suo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();


// cors
app.use(cors()); 

app.use(express.json());

app.use("/payments", paymentRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));