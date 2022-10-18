import Hotel from "../models/Hotel.js";

// CREATE
export const createHotel = async(req, resp, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        resp.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

// UPDATE

export const updateHotel = async(req, resp, next) => {
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        resp.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
}

// DELETE

export const deleteHotel = async(req, resp, next) => {    
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        resp.status(200).json("Hotel Successfully Deleted");
    } catch (error) {
        next(error);
    }
}

// GET

export const getHotel = async(req, resp, next) => {
    const newHotel= new Hotel(req.body);
    
    try {
        const hotel = await Hotel.findById(req.params.id);
        resp.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

// GET ALL

export const getAllHotel = async(req, resp, next) => {
    const newHotel= new Hotel(req.body);
    
    try {
        const hotels = await Hotel.find();
        resp.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}