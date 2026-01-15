import express from "express"
import { storage } from "../cloudConfig.js";
import multer from "multer";
import { FileController } from "../controller/fileHandle.controoler.js";
const upload = multer({storage});
const FileRouter = express.Router();

FileRouter.post("/upload",upload.single("img"), FileController);

export default FileRouter;