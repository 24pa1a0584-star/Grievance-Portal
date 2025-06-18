document.addEventListener("DOMContentLoaded", () => {
  // Category from URL
  // Get category from URL and set it
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "General Complaints";
document.getElementById("categoryDisplay").textContent = `Category: ${formatCategoryName(category)}`;

// Format category name for display (optional prettifying)
function formatCategoryName(cat) {
  switch(cat) {
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



  // Live character count
  const description = document.getElementById("description");
  const charCount = document.getElementById("charCount");
  description.addEventListener("input", () => {
    charCount.textContent = description.value.length;
  });

  // Form Validation & Submission
  const form = document.getElementById("complaintForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = description.value.trim();

    if (title.length < 5) {
      alert("❗ Complaint Title must be at least 5 characters.");
      return;
    }

    if (desc.length < 20) {
      alert("❗ Description must be at least 20 characters.");
      return;
    }

    // Optional: file validation (size/type)
    const files = document.getElementById("evidence").files;
    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`⚠️ ${file.name} exceeds 10MB limit.`);
        return;
      }
    }

    // ✅ SUCCESS - Show animation
    showSuccess();
    form.reset();
    charCount.textContent = "0";
  });

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
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "General Complaints";
  document.getElementById("categoryDisplay").textContent = `Category: ${formatCategoryName(category)}`;
});

