document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("http://localhost:5000/login/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.status === 200) {
            alert(result.message);
            window.location.href = result.redirect;
        } else {
            alert("Login failed: " + result.message);
        }
    } catch (error) {
        alert("Error logging in: " + error.message);
    }
});