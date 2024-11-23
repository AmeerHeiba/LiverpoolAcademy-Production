document.addEventListener("DOMContentLoaded", () => {
  // Navigate to album images on card click
  document.querySelectorAll(".album-card").forEach(card => {
      card.addEventListener("click", () => {
          const albumId = card.getAttribute("data-id");
          window.location.href = `/admin/dashboard/album/${albumId}/images`;
      });
  });

  // Handle add album form submission
  document.getElementById("addAlbumForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);

      const payload = {
          title_ar: formData.get("title_ar"),
          title_en: formData.get("title_en"),
          description_ar: formData.get("description_ar"),
          description_en: formData.get("description_en"),
          images: await Promise.all(
              formData.getAll("images").map(image => uploadToCloudinary(image))
          )
      };

      try {
          const response = await fetch("/admin/dashboard/album", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (!response.ok) throw await response.json();

          alert("Album added successfully!");
          window.location.href = "/admin/dashboard/album/view";
      } catch (error) {
          console.error("Error adding album:", error);
          alert("Failed to add album: " + error.message);
      }
  });

  // Handle delete album
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
              console.error("Error deleting album:", error);
              alert('Error: ' + error.message);
          }
      });
  });

  // Handle edit album modal population
  document.querySelectorAll('.fa-edit').forEach(editButton => {
      editButton.addEventListener('click', async (event) => {
          event.preventDefault();

          const modal = new bootstrap.Modal(document.getElementById('editAlbumModal'));
          const albumId = editButton.getAttribute("data-id");
          const albumTitleAr = editButton.getAttribute("data-title-ar");
          const albumTitleEn = editButton.getAttribute("data-title-en");
          const albumDescriptionAr = editButton.getAttribute("data-description-ar");
          const albumDescriptionEn = editButton.getAttribute("data-description-en");

          document.getElementById("editAlbumTitleAr").value = albumTitleAr || "";
          document.getElementById("editAlbumTitleEn").value = albumTitleEn || "";
          document.getElementById("editAlbumDescriptionAr").value = albumDescriptionAr || "";
          document.getElementById("editAlbumDescriptionEn").value = albumDescriptionEn || "";
          document.getElementById("AlbumId").value = albumId;

          modal.show();
      });
  });

  // Handle edit album form submission
  document.getElementById("editAlbumForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);

      const payload = {
          title_ar: formData.get("title_ar"),
          title_en: formData.get("title_en"),
          description_ar: formData.get("description_ar"),
          description_en: formData.get("description_en"),
      };

      const albumId = formData.get("AlbumId");

      try {
          const response = await fetch(`/admin/dashboard/album/${albumId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (!response.ok) throw await response.json();

          alert("Album updated successfully!");
          window.location.href = `/admin/dashboard/album/view`;
      } catch (error) {
          console.error("Error updating album:", error);
          alert("Failed to update album: " + error.message);
      }
  });
});

// Cloudinary Upload Function
async function uploadToCloudinary(file) {
  showLoadingSpinner();
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
      hideLoadingSpinner();
      return { path: data.secure_url };
      
  } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
  }
}

function showLoadingSpinner() {
  document.getElementById("loading-spinner").classList.remove("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("loading-spinner").classList.add("d-none");
}

