
import express from "express"
import mongoose from "mongoose";
import adminRoutes from './routes/adminroute.js';
import studentdetails from './routes/studentroute.js'
import { connectDB, closeDB } from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import parent from './routes/parentroute.js';
import facultyroute from './routes/facultyroute.js'




dotenv.config()

const app = express();
app.use(cors());

connectDB();
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/student', studentdetails);
app.use('/parent', parent);
app.use('/faculty', facultyroute);





app.listen(8000, () => {
  console.log("Server started on port 8000");
});