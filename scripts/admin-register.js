document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const fullname = form.querySelector('input[placeholder="Full Name"]').value.trim();
    const password = form.querySelector('input[placeholder="Password"]').value.trim();
    const position = form.querySelector('input[placeholder*="Position"]').value.trim();
    const phonenumber = form.querySelector('input[placeholder*="Phone"]').value.trim();
    const faculty = form.querySelector('input[placeholder*="Faculty"]').value.trim();
    const department = form.querySelector('input[placeholder*="Department"]').value.trim();

    // Generate a fake email or use username as email (if you want email field instead, change input and collect)
    const email = fullname.replace(/\s+/g, '').toLowerCase() + "@admin.com";

    // Validate required fields
    if (!fullname || !password || !position || !phonenumber) {
      alert("Please fill in all required fields.");
      return;
    }

    const adminData = {
      fullname,
      email, // generated or change to actual input if needed
      password,
      position,
      phonenumber,
      faculty,
      department,
    };

    try {
      const response = await fetch("http://localhost:5000/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // Redirect to login or dashboard
        window.location.href = "login.html";
        console.log("Admin Redirected to login page");
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during admin registration:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
