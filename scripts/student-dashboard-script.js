fetch("http://localhost:5000/login/session")
    .then(response => response.json())
    .then(user => {
        if (!user.id) window.location.href = "login.html"; // Redirect if not logged in
    })
    .catch(() => window.location.href = "login.html");