import File from "../model/fileHandle.model.js";

export const FileController = async (req,res)=>{
    console.log(req.file);
    if (req.file) {
       return res.status(404).json({message:"No File Uploaded"});
    }
    const FileAdded = new File({
       img:[
        {
            url:url,
            filename:filename,
        }
       ]
    })
    await FileAdded.save();
    res.status(201).json({message:"File upload successfully"});
    
};