import File from "../model/fileHandle.model.js";

export const FileController = async (req,res)=>{
    console.log(req);
   

    if (!req.file) {
       return res.status(404).json({message:"No File Uploaded"});
    }
    const FileAdded = new File({
       img:[
        {
            url:req.file.path,
            filename:req.file.filename,
        }
       ]
    })
    console.log("is file create?", FileAdded);
    
    await FileAdded.save();
    res.status(201).json({message:"File upload successfully"});
    
};