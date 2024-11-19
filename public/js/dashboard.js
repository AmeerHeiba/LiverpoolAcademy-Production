document.addEventListener("DOMContentLoaded", () => {
  // Attach submit event to forms with id 'dynamicForm'
  document.querySelectorAll("#dynamicForm").forEach(form => {
    form.addEventListener("submit", (event) => prepareFormDataforSubmission(event, form));
  });
    // Attach click event for eye icons to open modals
    document.querySelectorAll(".fa-eye").forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", (event) => {
        const dataId = event.target.getAttribute("data-id");
        console.log("Data ID:", dataId);
        const modalMapping = {
          viewBranchModal: renderDetailsModal,
          viewNewsModal: renderDetailsModal,
          viewStaffModal: renderDetailsModal,
          viewStoryModal: renderDetailsModal, 
          viewServiceModal: renderDetailsModal
        };
        
        for (const modalId in modalMapping) {
          if (document.getElementById(modalId)) {
            modalMapping[modalId](dataId, modalId);
            break;
          }
        }
      });

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
});

function showLoadingSpinner() {
  document.getElementById("loading-spinner").classList.remove("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("loading-spinner").classList.add("d-none");
}


// Helper to upload photo or video to Cloudinary
async function uploadToCloudinary(file) {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dukl6eyfn/upload`; // Correct endpoint
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "xvwxckhr"); // Ensure the preset exists and is unsigned

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Cloudinary error details:", errorDetails);
      throw new Error(`Cloudinary error: ${errorDetails.error.message}`);
    }

    const data = await response.json();
    console.log("Cloudinary upload response:", data);
    return data.secure_url; // Use the uploaded file's secure URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}


async function prepareFormDataforSubmission(event, form) {
  event.preventDefault(); // Prevent the default form submission

  showLoadingSpinner(); // Show a loading spinner to indicate form processing

  // Create a new FormData object from the form
  const formData = new FormData(form);
  const files = form.querySelectorAll('input[type="file"]');
  const fileUploads = []; 

  // Collect the selected training days into an array
  const trainingDays = [];
  const checkboxes = form.querySelectorAll('input[name="trainingDays[]"]:checked');
  if (checkboxes.length > 0) {
  checkboxes.forEach((checkbox) => {
    trainingDays.push(checkbox.value);
  });
  }

  // Add trainingDays as a JSON string to ensure it is sent as an array
  if (trainingDays.length > 0) {
    formData.delete("trainingDays[]"); // Remove individual checkbox entries
    formData.append("trainingDays", trainingDays); // Append the entire array as a single FormData value
  }

  // Handle file uploads
  files?.forEach((fileInput) => {
    const file = fileInput.files[0];
    if (file) {
      const uploadPromise = uploadToCloudinary(file).then((uri) => {
        formData.set(fileInput.name, uri); // Replace file input with its URI
      });
      fileUploads.push(uploadPromise);
    }
  });

  try {
    await Promise.all(fileUploads); // Wait for all file uploads to complete
    hideLoadingSpinner();
    submitForm(form, formData); // Submit the form with the updated FormData
  } catch (error) {
    console.error("Error processing form submission:", error);
    alert("Error uploading files. Please try again.");
    hideLoadingSpinner();
  }

}



// This is an example of the `submitForm` function, which can be customized to handle form submission
function submitForm(form, formData) {
  const actionUrl = form.action; // The URL the form will be submitted to
  const method = form.method; // The form submission method (e.g., POST, PUT)

  fetch(actionUrl, {
    method: method,
    body: formData, // Pass the FormData as the request body
  })
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    if (data.status === "success") {
      alert("Form submitted successfully!");
      // Handle successful form submission (e.g., show success message or redirect)
    } else {
      alert("Form submission failed: " + data.message);
      // Handle error in form submission (e.g., show error message)
    }
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form.");
  });
}

// This is a placeholder for showing a loading spinner
function showLoadingSpinner() {
  const spinner = document.querySelector('#loading-spinner');
  if (spinner) {
    spinner.style.display = 'block'; // Show the spinner
  }
}

// This is a placeholder for hiding the loading spinner
function hideLoadingSpinner() {
  const spinner = document.querySelector('#loading-spinner');
  if (spinner) {
    spinner.style.display = 'none'; // Hide the spinner
  }
}


async function submitForm(form, formData) {
  const action = form.getAttribute("action");
  const method = form.dataset.method || "POST"; // Retrieve stored method

  // Convert FormData to a plain object
  const payload = Object.fromEntries(formData.entries());

  // If "video" or "photo" are empty objects, ensure we exclude them from the payload
  if (!payload.video || typeof payload.video === 'object') {
    delete payload.video; // Remove video field from the payload if empty
  }

  if (!payload.photo || typeof payload.photo === 'object') {
    delete payload.photo; // Remove photo field from the payload if empty
  }

  try {
    const response = await fetch(action, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload) // Send the final payload
    });
    if (!response.ok) throw await response.json(); // Parse the error response

    alert("Form submitted successfully");
    window.location.href = `/admin/dashboard/${form.getAttribute("data-type")}`;
  } catch (error) {
    if (error.status === "fail") {
      document.getElementById("error-message").textContent = `Error: ${error.message}`;
    } else {
      document.getElementById("error-message").textContent = `Submission error: ${error.message}`;
    }
  }
}


// Fetch data and render modal
async function fetchModalData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch modal data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching modal data:", error);
  }
}

async function renderDetailsModal(dataId, modalId) {
  const endpoints = {
    viewBranchModal: `/api/branch/${dataId}`,
    viewNewsModal: `/api/news/${dataId}`,
    viewStaffModal: `/api/staff/${dataId}`,
    viewStoryModal: `/api/story/${dataId}`,
    viewServiceModal: `/api/service/${dataId}`
  };

  const modalData = await fetchModalData(endpoints[modalId]);
  const modalMapping = {
    viewBranchModal: renderBranchDetails,
    viewNewsModal: renderNewsDetails,
    viewStaffModal: renderStaffDetails,
    viewStoryModal: renderStoryDetails,
    viewServiceModal: renderServiceDetails
  };

  if (modalMapping[modalId]) {
    modalMapping[modalId](modalData);
    new bootstrap.Modal(document.getElementById(modalId)).show();
  }
}

function renderBranchDetails(branchData) {
  document.getElementById("branchName").innerText = branchData.branchName;
  document.getElementById("branchAddress").innerText = branchData.address;
  document.getElementById("branchPhone").innerText = branchData.phone || "N/A";
  document.getElementById("branchEmail").innerText = branchData.email || "N/A";
  document.getElementById("branchAuthor").innerText = branchData.author;
  document.getElementById("branchCreatedAt").innerText = new Date(branchData.createdAt).toDateString();
  document.getElementById("branchPhoto").src = branchData.photo || "/public/img/placeholder.jpg";
}

function renderNewsDetails(newsData) {
  document.getElementById("newsTitle").innerText = newsData.title;
  document.getElementById("newsContent").innerText = newsData.content;
  document.getElementById("newsAuthor").innerText = newsData.author;
  document.getElementById("newsCreatedAt").innerText = new Date(newsData.createdAt).toDateString();
  document.getElementById("newsPhoto").src = newsData.photo || "/public/img/placeholder.jpg";
  document.getElementById("newsVideo").src = newsData.video || "/public/img/placeholder.jpg";
}

function renderStaffDetails(staffData) {
  document.getElementById("staffName").innerText = staffData.Employeename;
  document.getElementById("staffPosition").innerText = staffData.position;
  document.getElementById("staffTshirt").innerText = staffData.TshirtNo;
  document.getElementById("staffPhone").innerText = staffData.phone || "N/A";
  document.getElementById("staffEmail").innerText = staffData.email || "N/A";
  document.getElementById("staffJoinedAt").innerText = new Date(staffData.joinedAt).toDateString();
  document.getElementById("staffPhoto").src = staffData.photo || "/public/img/placeholder.jpg";
}

function renderStoryDetails(storyData) {
  document.getElementById("storyTitle").innerText = storyData.title;
  document.getElementById("storyYear").innerText = storyData.year;
  document.getElementById("storyAuthor").innerText = storyData.author;
  document.getElementById("storyContent").innerText = storyData.content;
  document.getElementById("storyPhoto").src = storyData.photo || "/public/img/placeholder.jpg";
}

function renderServiceDetails(serviceData) {
  document.getElementById("title").innerText = serviceData.title;
  document.getElementById("description").innerText = serviceData.discription;
  document.getElementById("author").innerText = serviceData.author;
  document.getElementById("createdAt").innerText = new Date(serviceData.createdAt).toDateString();
}
