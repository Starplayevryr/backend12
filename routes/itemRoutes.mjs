import express from 'express'
import itemModel from '../models/items.mjs'
import filterItems from '../middleware/filterItems.mjs';
import sortItems from '../middleware/sortItems.mjs';
import paginateItems from '../middleware/paginateItems.mjs';

const router = express.Router();


router.post('/new',async(req,res)=>{
    const{name,category,price} = req.body;
    try{
        const newitem = new itemModel({
            name,category,price
        })

        await newitem.save();

     if(!newitem)
        res.status(401).json({message:"unable to add item"})
     res.status(201).json({message:"new record added",data:newitem})
       }
       catch(error){
        res.status(500).json({message:"internal server error"});
       }
})

router.get("/all", paginateItems,async(req,res)=>{
    try {
        const items = await itemModel.find().sort(req.sortOption || {}).skip(req.pagination.skip)   // Skip based on pagination
        .limit(req.pagination.limit); 
        
        if (items.length === 0) {
            return res.status(404).json({ message: "Items not found" });
        }

        res.json({ data: items });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


export default router;