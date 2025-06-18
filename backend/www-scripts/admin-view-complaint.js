let complaint = JSON.parse(localStorage.getItem("selectedComplaint"));

    function renderComplaintDetails() {
      const container = document.getElementById("complaintDetails");
      container.innerHTML = `
        <h2>${complaint.title}</h2>
        <span class="status ${complaint.status.toLowerCase().replace(/ /g, '-')}">${complaint.status}</span>
        <span class="priority ${complaint.priority.toLowerCase()}">${complaint.priority} Priority</span>

        <div class="info-row">
          <div class="info-item"><strong>👤 Student:</strong> ${complaint.student}</div>
          <div class="info-item"><strong>📂 Category:</strong> ${complaint.category}</div>
          <div class="info-item"><strong>📅 Submitted:</strong> ${complaint.date}</div>
          <div class="info-item"><strong>🕓 Last Updated:</strong> ${complaint.updated}</div>
        </div>

        <div class="section">
          <h4>Description</h4>
          <div class="info-item">${complaint.description || 'No description available.'}</div>
        </div>

        <div class="section">
          <h4>Supporting Evidence</h4>
          <div class="supporting">
            <i class="material-icons">attach_file</i>
            <span>${complaint.evidence || 'No evidence provided.'}</span>
          </div>
        </div>

        <div class="section">
          <h4>Admin Response</h4>
          <div class="response-box">${complaint.response || 'No response yet.'}</div>
        </div>
      `;
    }

    function updateComplaint() {
      const updatedStatus = document.getElementById("status").value;
      const updatedResponse = document.getElementById("response").value;
      complaint.status = updatedStatus;
      complaint.response = updatedResponse;
      complaint.updated = new Date().toISOString().split("T")[0];
      localStorage.setItem("selectedComplaint", JSON.stringify(complaint));
      renderComplaintDetails();
      alert("Complaint updated successfully.");
    }

    // Initial setup
    renderComplaintDetails();
    document.getElementById("status").value = complaint.status;
    document.getElementById("response").value = complaint.response || "";
