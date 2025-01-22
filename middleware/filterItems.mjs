const filterItems = async(req,resizeBy,next)=>{
    try{
        const {category,minPrice,maxPrice} = req.query;

        const filter = {};
        if(category) filter.category = category;

        if(minPrice || maxPrice)
        {
            filter.price={};
            if(minPrice)filter.price.$gte = parseFloat(minPrice);
            if(maxPrice)filter.price.$lte=parseFloat(maxPrice)
        }

        req.filter = filter;
        next();
    }

    catch(error){
        res.status(500).json({message:"filetring error",error})
    }
};

export default filterItems;