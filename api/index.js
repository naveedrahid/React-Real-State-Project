import express from "express";
import dotenv  from "dotenv";
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

const connect = async () => {    
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connect Mongo DB');
        
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', ()=> {
    console.log('MongoDB is Disconnected!')
});

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((error, req, resp, next)=> {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'some thing went wrong';
    return resp.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message:errorMessage,
        stack:error.stack
    });
});


app.listen(8800, ()=> {
    connect();
    console.log('connected backend');
});