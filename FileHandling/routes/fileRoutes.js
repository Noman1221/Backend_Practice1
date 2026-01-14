import express from "express"
import upload from "../middleware/upload.js"
import { uploadFile } from "../controller/fileController.js"

const FileRoute = express.Router();

FileRoute.post("/upload", upload.single("file"), uploadFile);

export default FileRoute;