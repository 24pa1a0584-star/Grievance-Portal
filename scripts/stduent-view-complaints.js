 const complaints = JSON.parse(localStorage.getItem("myComplaints")) || [];

    const container = document.getElementById("complaintsList");

    if (complaints.length === 0) {
      container.innerHTML = "<p>No complaints submitted yet.</p>";
    } else {
      complaints.forEach(complaint => {
        const div = document.createElement("div");
        div.className = "complaint-card";
        div.innerHTML = `
          <h3>${complaint.title}</h3>
          <span class="status ${complaint.status.toLowerCase().replace(/ /g, '-')}">${complaint.status}</span>
          <span class="priority ${complaint.priority.toLowerCase()}">${complaint.priority} Priority</span>

          <p>${complaint.description}</p>

          <div class="info-line">Category: ${complaint.category}</div>
          <div class="info-line">Submitted: ${complaint.date}</div>
          <div class="info-line">Last Updated: ${complaint.updated}</div>

          <div class="response-box">
            <strong>Admin Response:</strong> ${complaint.response || 'Awaiting response.'}
          </div>

          <button class="btn-view" onclick="viewDetails(${complaint.id})">View Details</button>
        `;
        container.appendChild(div);
      });
    }

    function viewDetails(id) {
      const selectedComplaint = complaints.find(c => c.id === id);
      localStorage.setItem("selectedComplaint", JSON.stringify(selectedComplaint));
      window.location.href = "view-complaint-student.html";
    }