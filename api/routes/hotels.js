import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//Create
router.post("/", async (req,res)=>{
    
    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update
router.put("/:id", async (req,res)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete
router.delete("/:id", async (req,res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get
router.get("/:id", async (req,res)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all
router.get("/", async (req,res, next)=>{
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(err);
    }
});


export default router;