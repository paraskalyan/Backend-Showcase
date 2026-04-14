import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { AppError } from './utils/AppError.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("Server Running")
})