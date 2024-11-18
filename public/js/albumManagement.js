document.addEventListener("DOMContentLoaded", () => {
    // Handle album card click event to navigate to album images
    document.querySelectorAll(".album-card").forEach(card => {
        card.addEventListener("click", () => {
            const albumId = card.getAttribute("data-id");
            window.location.href = `/admin/dashboard/album/${albumId}/images`;
        });
    });

    // Handle album form submission
    document.getElementById("addAlbumForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const title = formData.get("title");
        const description = formData.get("description");

        // Handle Cloudinary image upload
        const images = formData.getAll("images");
        const uploadedImages = await Promise.all(
            images.map(image => uploadToCloudinary(image))
        );

        // Prepare payload
        const payload = {
            title,
            description,
            images: uploadedImages
        };
        console.log("Payload:", payload);

        // Send data to server
        const response = await fetch("/admin/dashboard/album", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) throw data;

        // Refresh or update UI after success
        alert("Album added successfully!");
        window.location.href = "/admin/dashboard/album/view";
    });

      // Attach click event for delete buttons
  document.querySelectorAll('.delete-item').forEach(deleteButton => {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const itemId = deleteButton.getAttribute("data-id");
      const itemType = deleteButton.getAttribute("data-type");

      try {
        const response = await fetch(`/admin/dashboard/${itemType}/${itemId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to delete item');
        
        alert('Item deleted successfully');
        document.getElementById(`${itemId}`).remove();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  });

  //handle edit album form (show add album modal with pre-filled data and update button for album update)
  document.querySelectorAll('.fa-edit').forEach(editButton => {
    editButton.addEventListener('click', async (event) => {
        event.preventDefault();

        //show edit album modal
        const modal = new bootstrap.Modal(document.getElementById('editAlbumModal'));
        const albumId = editButton.getAttribute("data-id");
        const albumTitle = editButton.getAttribute("data-title");
        const albumDescription = editButton.getAttribute("data-description");

        console.log("albumId:", albumId);
        //set editAlbummodal form inputs placeholders with album data

        document.getElementById("editAlbumTitle").value = albumTitle;
        document.getElementById("editAlbumDescription").value = albumDescription;
        document.getElementById("AlbumId").value = albumId;


        modal.show();
    });
  });

  //handle edit album form submission
  document.getElementById("editAlbumForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const albumId = formData.get("AlbumId");
    const title = formData.get("title");
    const description = formData.get("description");




    // build payload then submit form since this is only for editing title and description 
    const payload = {
        title,
        description,
    };


    const response = await fetch(`/admin/dashboard/album/${albumId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw data;

    // Refresh or update UI after success
    alert("Album updated successfully!");
    window.location.href = `/admin/dashboard/album/view`;
  });
});

// Cloudinary Upload Function
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
