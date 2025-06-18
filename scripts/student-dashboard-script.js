// document.addEventListener("DOMContentLoaded", function() {
//     fetch("http://localhost:5000/login/session", {
//         method: "GET",
//         credentials: "include" // Ensure cookies are sent
//     })
//         .then(response => response.json())
//         .then(user => {
//             console.log("Session Data Received:", user); // Debugging log

//             if (!user || !user.id) {
//                 console.error("User session not found, redirecting to login.");
//                 window.location.href = "login.html";
//             } else {
//                 document.getElementById("name").textContent = user.name;
//                 document.getElementById("username").textContent = user.email;
//                 document.getElementById("faculty").textContent = user.type;
//             }
//         })
//         .catch(error => {
//             console.error("Session fetch error:", error);
//             window.location.href = "login.html";
//         });
// });

/*document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:5000/login/session", {
    method: "GET",
    credentials: "include"  // Send cookies with request
  })
    .then(response => {
      if (!response.ok) throw new Error("Not authenticated");
      return response.json();
    })
    .then(user => {
      document.getElementById("name").textContent = user.name;
      document.getElementById("username").textContent = user.email;
      document.getElementById("faculty").textContent = user.type;
    })
    .catch(() => {
      alert("Session expired or not logged in.");
      window.location.href = "login.html";
    });
});*/

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:5000/login/session", {
    method: "GET",
    credentials: "include"  // Send cookies with request
  })
    .then(response => {
      if (!response.ok) throw new Error("Not authenticated");
      return response.json();
    })
    .then(user => {
      // Safely handle missing data
      const name = user.name || "Student";
      const regno = user.regno || "Unknown";
      const faculty = user.accountType || "N/A";

      document.getElementById("name").textContent = name;
      document.getElementById("username").textContent = regno;
      document.getElementById("faculty").textContent = faculty;
    })
    .catch(() => {
      alert("Session expired or not logged in.");
      window.location.href = "login.html";
    });
});

