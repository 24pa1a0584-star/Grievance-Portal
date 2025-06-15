const adminCategory = "Technical Issue"; // Simulated role-based access

    const complaints = [
      {
        title: "Library WiFi Issues",
        status: "In Progress",
        priority: "Medium",
        category: "Technical Issue",
        student: "John Doe",
        date: "2025-01-05",
        updated: "2025-01-07",
        response: "We are working on upgrading the network infrastructure."
      },
      {
        title: "Hostel Air Conditioning",
        status: "Resolved",
        priority: "High",
        category: "Hostel & Facility Issue",
        student: "John Doe",
        date: "2025-01-05",
        updated: "2025-01-07",
        response: "AC Unit has been repaired and is functioning."
      },
      {
        title: "Scholarship Delay",
        status: "Pending",
        priority: "High",
        category: "Financial & Scholarship",
        student: "Jane Smith",
        date: "2025-01-03",
        updated: "2025-01-05",
        response: ""
      }
    ];

    let total = 0, pending = 0, inProgress = 0, resolved = 0;
    const container = document.getElementById("complaintList");

    complaints.forEach((comp, index) => {
      if (comp.category === adminCategory) {
        total++;
        if (comp.status === "Pending") pending++;
        else if (comp.status === "In Progress") inProgress++;
        else if (comp.status === "Resolved") resolved++;

        const div = document.createElement("div");
        div.className = "complaint";
        div.innerHTML = `
          <h4>${comp.title}</h4>
          <span class="status ${comp.status.toLowerCase().replace(/ /g, '-')}">${comp.status}</span>
          <span class="priority ${comp.priority.toLowerCase()}">${comp.priority} Priority</span>
          <p><strong>Student:</strong> ${comp.student}</p>
          <p><strong>Category:</strong> ${comp.category}</p>
          <p><strong>Submitted:</strong> ${comp.date}</p>
          <p><strong>Updated:</strong> ${comp.updated}</p>
          <p><strong>Your Response:</strong> ${comp.response || 'No response yet.'}</p>
          <button class="btn-manage" onclick="redirectToManage(${index})">
            <span class="material-icons">visibility</span> Manage
          </button>
        `;
        container.appendChild(div);
      }
    });

    document.getElementById("totalCount").innerText = total;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("inProgressCount").innerText = inProgress;
    document.getElementById("resolvedCount").innerText = resolved;

    function redirectToManage(index) {
      const selectedComplaint = complaints[index];
      localStorage.setItem("selectedComplaint", JSON.stringify(selectedComplaint));
      window.location.href = "admin-view-complaint.html";
    }

    function logout() {
      alert("Logging out...");
    }