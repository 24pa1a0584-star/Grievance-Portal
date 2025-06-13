document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        registrationNumber: document.getElementById("registrationNumber").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        academicYear: document.getElementById("academicYear").value,
        phone: document.getElementById("phone").value,
        faculty: document.getElementById("faculty").value
    };

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        alert(result.message); // Show response message
    } catch (error) {
        alert("Error submitting registration: " + error.message);
    }
});