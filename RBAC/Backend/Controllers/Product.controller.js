import Product from "../Models/Product.js"

// Admin Only
export const create = async(req,res)=>{
   try {
     const {title, description, price} = req.body;
 
     if (!title || !description || !price) {
         return res.status(400).json({message:"missing details"})
     };
 
     const newProduct = new Product({
         title,
         description, price,
     });
     await newProduct.save();
 
     res.status(201).json({message:"new product created"})
   } catch (error) {
     res.status(500).json({message:error.message});
   }
}

// User
export const read = async (req,res)=>{
 try {
       const allProduct = await Product.find({});
       if (!allProduct) {
           return res.status(401).json({message:"no user exists"})
       };
       res.status(200).json({message:"get all products", allProduct});
 } catch (error) {
     res.status(500).json({message:error.message});
 }
}
export const update = async(req,res)=>{
  try {
      const {title, description, price} = req.body;
      const productId = req.params;
      if (!title || !description || !price) {
          return res.status(401).json({message:"missing details"})
      };
      const updatedProduct = await Product.findByIdAndUpdate(productId, {title, description, price});
      res.status(200).json({message:'user update successfully', updatedProduct});
  } catch (error) {
     res.status(500).json({message:error.message});
  }
};

export const deleteProduct = async(req,res)=>{
    try {
          const productId = req.params;
          const deletedproduct = await Product.findByIdAndDelete(productId);
        res.status(200).json({message:"deleted successfully", deleteProduct});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}