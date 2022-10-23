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


export const countByCity = async (req, resp, next) => {
    const cities = req.query.cities.split(",");
    
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        resp.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, resp, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const appartmentCount = await Hotel.countDocuments({type:"appartmdent"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        resp.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"appartmdents", count:appartmentCount},
            {type:"resorts", count:resortCount},
            {type:"villas", count: villaCount},
            {type:"cabins", count:cabinCount}
        ]);
    } catch (err) {
        next(err);
    }
}