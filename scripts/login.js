document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("http://localhost:5000/login/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.status === 200) {
            alert(result.message);
            const basePath = "../pages/"; // Define the correct path
            window.location.href = basePath + result.redirect; // Redirect to the actual page
        } else {
            alert("Login failed: " + result.message);
        }
    } catch (error) {
        alert("Error logging in: " + error.message);
    }
});