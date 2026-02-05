import express from 'express';
import { config } from 'dotenv';
import { prisma, connectDB, disconnectDB } from './config/prisma.js';

//Import routes
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import movieRoutes from './routes/movieRoutes.js';


config();// Load environment variables from .env file
connectDB();// Connect to the database 

// Initialize Express app.
const app = express();


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/auth', authRoutes); //authentication.
app.use('/watchlist', watchlistRoutes); //watchlist manipulation.
app.use('/movies', movieRoutes); //Movie routes "not  in use".


// Listening to port
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1); //mandatory (as per the Node.js docs)
});
//Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
//Handle SIGTERM signal
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});