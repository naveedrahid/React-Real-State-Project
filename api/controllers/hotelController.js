import Hotel from "../models/Hotel.js";

// CREATE
export const createHotel = async(req, resp, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        resp.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

// UPDATE

export const updateHotel = async(req, resp, next) => {
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        resp.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

// DELETE

export const deleteHotel = async(req, resp, next) => {    
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        resp.status(200).json("Hotel Successfully Deleted");
    } catch (err) {
        next(err);
    }
}

// GET

export const getHotel = async(req, resp, next) => {
    const newHotel= new Hotel(req.body);
    
    try {
        const hotel = await Hotel.findById(req.params.id);
        resp.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

// GET ALL

export const getAllHotel = async(req, resp, next) => {
    const newHotel= new Hotel(req.body);
    
    try {
        const hotels = await Hotel.find();
        resp.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}