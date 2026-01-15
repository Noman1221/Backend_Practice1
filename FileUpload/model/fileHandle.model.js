import mongoose from "mongoose";

const fileSchema  = new mongoose.Schema({
    img:[
        {
            url:{type:String, required:true},
            filename:{type:String, required:true},
    },
        
    ]
});

const File = mongoose.model("File", fileSchema);
export default File;