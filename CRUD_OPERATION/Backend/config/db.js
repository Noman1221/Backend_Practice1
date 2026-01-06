import mongoose from "mongoose"

async function main(){
try {
       await mongoose.connect(process.env.DB_URL)
       console.log("database connect");
       
} catch (error) {
    resizeBy.status(500).json({message:error})
}
}
export default main;