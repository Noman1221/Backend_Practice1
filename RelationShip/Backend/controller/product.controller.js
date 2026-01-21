import Product from "../model/product.model.js";

export const CreateProduct = async (req, res)=>{
  try {
      const {title, desc} = req.body;
      const userId = req.user.id;
      console.log(userId);
      
      if (!title || !desc) {
          return res.status(404).json({message:"missing details"});
      };
  
      const newProduct = new Product({
          title,
          desc,
          userId,
      });
     await newProduct.save()
     res.status(201).json({message:"product created successfully", newProduct });
     
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const getProducts = async (req,res)=>{
  try {
      const products = await Product.find({}).populate("userId", "name email");
      console.log(products);
      
      if (!products) {
        return res.status(404).json({message:"products not found"})
      }
      res.status(200).json({message:"get all users", products})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}