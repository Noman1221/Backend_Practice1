import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        User:"ref",
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;