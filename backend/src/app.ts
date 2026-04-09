import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log("Server Running")
})