// cloudinaryUploader.js

// Import Cloudinary library if you're using it directly
// e.g., const cloudinary = require('cloudinary').v2;

export async function uploadToCloudinary(file) {
    if (!file) {
      throw new Error("No file provided for upload.");
    }
  
    // Perform file type and size validations here if needed
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Unsupported file type.");
    }
    
    if (file.size > 5 * 1024 * 1024) { // Limit to 5MB for example
      throw new Error("File size exceeds limit.");
    }
  
    try {
      // Replace this with the actual Cloudinary upload logic
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");
  
      const response = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Failed to upload file to Cloudinary");
  
      return data.secure_url; // Return the Cloudinary URL
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }
  