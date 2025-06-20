// Format Category (keep this at top so it's reusable)
function formatCategoryName(cat) {
  switch (cat) {
    case 'academic': return 'Academic Grievance';
    case 'technical': return 'Technical Issues';
    case 'disciplinary': return 'Disciplinary & Ragging Complaints';
    case 'hostel': return 'Hostel & Facility Issues';
    case 'financial': return 'Financial & Scholarship Concerns';
    case 'anonymous': return 'Anonymous Complaints';
    case 'general': return 'General Complaints';
    default: return cat;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Set category from URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "General Complaints";
  document.getElementById("categoryDisplay").textContent = `Category: ${formatCategoryName(category)}`;

  const form = document.getElementById("complaintForm");
  const description = document.getElementById("description");
  const charCount = document.getElementById("charCount");

  // Live character count
  description.addEventListener("input", () => {
    charCount.textContent = description.value.length;
  });

  // File list display
  document.getElementById("evidence").addEventListener("change", function () {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

<<<<<<< HEAD
=======
    Array.from(this.files).forEach(file => {
      const li = document.createElement("li");
      li.textContent = file.name;
      li.style.fontSize = "14px";
      li.style.color = "#333";
      li.style.marginTop = "4px";
      fileList.appendChild(li);
    });
  });

  // Submit form
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = description.value.trim();
    const priority = document.getElementById("priority").value;
    const files = document.getElementById("evidence").files;

    // Validation
    if (title.length < 5) {
      alert("❗ Complaint Title must be at least 5 characters.");
      return;
    }

    if (desc.length < 20) {
      alert("❗ Description must be at least 20 characters.");
      return;
    }

<<<<<<< HEAD
    // File validation (size/type)
=======
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("priority", priority);
    formData.append("category", category); // from URL

>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`⚠️ ${file.name} exceeds 10MB limit.`);
        return;
      }
      formData.append("evidence", file);
    }

<<<<<<< HEAD
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "general";

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("priority", priority);
    formData.append("category", formatCategoryName(category));
    
    // Append files
    for (let file of files) {
      formData.append("evidence", file);
    }

    try {
      // Show loading
      const submitBtn = document.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;

      // Submit to backend
      const response = await fetch("http://localhost:5000/send-complaint/submit", {
        method: "POST",
        body: formData,
        credentials: "include" // Include session cookies
      });

      const result = await response.json();

      if (response.ok) {
        showSuccess();
        form.reset();
        charCount.textContent = "0";
        document.getElementById("fileList").innerHTML = "";
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          window.location.href = "http://localhost:5000/pages/student-dashboard.html";
        }, 3000);
      } else {
        alert("❌ Error submitting complaint: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Error submitting complaint. Please try again.");
    } finally {
      // Restore button
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showSuccess() {
    const successBox = document.createElement("div");
    successBox.innerText = "🎉 Complaint Submitted Successfully! Redirecting to dashboard...";
    successBox.style.position = "fixed";
    successBox.style.top = "20px";
    successBox.style.left = "50%";
    successBox.style.transform = "translateX(-50%)";
    successBox.style.backgroundColor = "#10b981";
    successBox.style.color = "#fff";
    successBox.style.padding = "14px 28px";
    successBox.style.borderRadius = "8px";
    successBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    successBox.style.zIndex = 9999;
    successBox.style.fontSize = "16px";
    document.body.appendChild(successBox);

    setTimeout(() => {
      successBox.style.transition = "opacity 1s ease-out";
      successBox.style.opacity = 0;
    }, 2500);

    setTimeout(() => {
      if (document.body.contains(successBox)) {
        document.body.removeChild(successBox);
      }
    }, 3500);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "General Complaints";
  document.getElementById("categoryDisplay").textContent = `Category: ${formatCategoryName(category)}`;
});

document.getElementById("evidence").addEventListener("change", function () {
      const fileList = document.getElementById("fileList");
      fileList.innerHTML = ""; // Clear previous

      Array.from(this.files).forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name;
        li.style.fontSize = "14px";
        li.style.color = "#333";
        li.style.marginTop = "4px";
        fileList.appendChild(li);
=======
    try {
      const res = await fetch("http://localhost:5000/complaint/submit", {
        method: "POST",
        body: formData,
        credentials: "include"
>>>>>>> 8840ef71b6ae4e23e608033c491bd03ca87e5dff
      });

      const result = await res.json();
      if (res.ok) {
        showSuccess();
        form.reset();
        charCount.textContent = "0";
        document.getElementById("fileList").innerHTML = "";
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong: " + err.message);
    }
  });
});

// Show success alert
function showSuccess() {
  const successBox = document.createElement("div");
  successBox.innerText = "🎉 Complaint Submitted Successfully!";
  successBox.style.position = "fixed";
  successBox.style.top = "20px";
  successBox.style.left = "50%";
  successBox.style.transform = "translateX(-50%)";
  successBox.style.backgroundColor = "#10b981";
  successBox.style.color = "#fff";
  successBox.style.padding = "14px 28px";
  successBox.style.borderRadius = "8px";
  successBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  successBox.style.zIndex = 9999;
  successBox.style.fontSize = "16px";
  document.body.appendChild(successBox);

  setTimeout(() => {
    successBox.style.transition = "opacity 1s ease-out";
    successBox.style.opacity = 0;
  }, 2000);

  setTimeout(() => {
    document.body.removeChild(successBox);
  }, 3000);
}
