document.addEventListener("DOMContentLoaded", () => {
   document.getElementById("addPhotoForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const albumId = form.getAttribute("data-id");
      const photo = formData.get("photo");

      // Handle Cloudinary image upload
      const path = await uploadToCloudinary(photo);
      // Send data to server
      const response = await fetch(`/admin/dashboard/album/${albumId}/image/`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(path) 
      });

      const data = await response.json();
      if (!response.ok) throw data;

      // Refresh or update UI after success
      alert("Photo added successfully!");
      window.location.href = `/admin/dashboard/album/${albumId}/images`;
   });

   document.querySelectorAll('#deletePhoto').forEach(deleteButton => {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const imageId = deleteButton.getAttribute("data-id");
      const albumId = deleteButton.getAttribute("data-album-id");

      try {
        const response = await fetch(`/admin/dashboard/album/${albumId}/image/${imageId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to delete item');
        
        alert('Item deleted successfully');
        document.getElementById(`${imageId}`).remove();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  });
});

async function uploadToCloudinary(file) {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dukl6eyfn/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xvwxckhr");

    try {
        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        return { path: data.secure_url };
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}