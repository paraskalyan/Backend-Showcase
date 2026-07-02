import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import projectRoutes from './modules/projects/projects.routes.js';
import endpointRoutes from './modules/endpoint/endpoint.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import executionRoutes from './modules/execution/execution.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { AppError } from './utils/AppError.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.middleware.js';

const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,  
}))
app.use(logger)

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/endpoint', endpointRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/execution', executionRoutes);

// Endpoint to check server liveness and readiness
app.get('/health', (req, res)=>{
  res.json({message: 'OK'})
})

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("Server Running");
});
