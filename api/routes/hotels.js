import express from "express";
import Hotel from "../models/Hotel.js";
import {createError} from '../utils/error.js';
const router = express.Router();

// CREATE

router.post('/', async (req, resp)=>{
    const newHotel= new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        resp.status(200).json(savedHotel);
    } catch (error) {
        resp.status(500).json(error);
    }
});

// UPDATE

router.put('/:id', async (req, resp)=>{
    // const updateHotel= new Hotel(req.body);
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        resp.status(200).json(updateHotel);
    } catch (error) {
        resp.status(500).json(error);
    }
});

// DELETE

router.delete('/:id', async (req, resp)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        resp.status(200).json("Hotel Successfully Deleted");
    } catch (error) {
        resp.status(500).json(error);
    }
});

// GET

router.get('/:id', async (req, resp)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        resp.status(200).json(hotel);
    } catch (error) {
        resp.status(500).json(error);
    }
});

// GET ALL

router.get('/', async (req, resp, next)=>{
    try {
        const hotels = await Hotel.find();
        resp.status(200).json(hotels);
    } catch (error) {
       next(error)
    }
});

export default router;