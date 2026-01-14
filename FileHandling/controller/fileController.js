import cloudinary from "../Cloudinary.js";
import File from "../model/FileModel.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer to base64
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "uploads",
      resource_type: "auto",
    });

    // Save metadata to DB
    const savedFile = await File.create({
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      data: savedFile,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};