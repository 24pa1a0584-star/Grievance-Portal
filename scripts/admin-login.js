document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");

  // Show/hide password
  document.getElementById("togglePassword").addEventListener("change", function () {
    const passwordInput = document.getElementById("adminPassword");
    passwordInput.type = this.checked ? "text" : "password";
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;

    try {
      const response = await fetch("http://localhost:5000/admin/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // IMPORTANT: needed for session cookies
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();
      console.log("Admin login response:", result);

      if (response.status === 200) {
        alert("Login successful!");
        window.location.href = "http://localhost:5000/pages/admin-dashboard.html"; // Redirect to dashboard
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  });
});
