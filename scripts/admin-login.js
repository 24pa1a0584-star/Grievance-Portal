document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");

  // Show/hide password
  document.getElementById("togglePassword").addEventListener("change", function () {
    const passwordInput = document.getElementById("adminPassword");
    passwordInput.type = this.checked ? "text" : "password";
  });

  // Handle form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    // Dummy logic — replace with real fetch/POST
    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      window.location.href = "./admin-dashboard.html"; // your admin dashboard
    } else {
      alert("Invalid admin credentials!");
    }
  });
});
