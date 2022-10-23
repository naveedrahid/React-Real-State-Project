import express from "express";
import dotenv  from "dotenv";
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async () => {    
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connect Mongo DB');
        
    } catch (err) {
        throw err;
    }
}

mongoose.connection.on('disconnected', ()=> {
    console.log('MongoDB is Disconnected!')
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, resp, next)=> {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'some thing went wrong';
    return resp.status(errStatus).json({
        success: false,
        status: errStatus,
        message:errMessage,
        stack:err.stack
    });
});


app.listen(8800, ()=> {
    connect();
    console.log('connected backend');
});