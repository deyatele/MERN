import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)


async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ww9jghb.mongodb.net/${process.env.DB_BASE}?retryWrites=true&w=majority`,
    );
    app.listen(PORT, () => {
      console.log('start', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
