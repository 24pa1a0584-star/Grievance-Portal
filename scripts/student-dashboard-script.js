// document.addEventListener("DOMContentLoaded", function() {
//   fetch("http://localhost:5000/login//global-session", {
//     method: "GET",
//     credentials: "include" // ✅ Ensures session data is sent
// })
//   .then(response => {
//     if (!response.ok) throw new Error("Not authenticated");
//     return response.json();
//   })
//   .then(user => {
//     if (!user || !user.name) {
//       throw new Error("Session expired or invalid.");
//     }

//     document.getElementById("name").textContent = user.name;
//     document.getElementById("username").textContent = user.regno;
//     document.getElementById("faculty").textContent = user.faculty;
//   })
//   .catch(() => {
//     alert("Session expired or not logged in.");
//     window.location.href = "http://localhost:5500/pages/login.html"; // ✅ Redirect to correct login page
//   });
// });

// // logout button 
// document.getElementById("logout").addEventListener("click", async function() {
//     try {
//         const response = await fetch("http://localhost:5000/login/logout", {
//             method: "POST",
//             credentials: "include"
//         });

//         const result = await response.json();
//         alert(result.message);
//         window.location.href = "http://localhost:5500/pages/login.html"; // ✅ Redirect after logout
//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Fetch session info from global-session route
  fetch("http://localhost:5000/login/latest-session", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        const user = response.data;
        console.log("👤 Logged in as:", user.name);
        
        // ✅ Update DOM elements
        document.getElementById("name").textContent = user.name;
        document.getElementById("username").textContent = user.regno;
        document.getElementById("faculty").textContent = user.faculty;
      } else {
        alert(response.message);
        window.location.href = "http://localhost:5500/pages/login.html";
      }
    })
    .catch(error => {
      console.error("❌ Session fetch error:", error);
      alert("Session expired or not logged in.");
      window.location.href = "http://localhost:5500/pages/login.html";
    });
});

// ✅ Logout button handler
document.getElementById("logout").addEventListener("click", async function () {
  try {
    const response = await fetch("http://localhost:5000/login/logout", {
      method: "POST",
      credentials: "include"
    });

    const result = await response.json();
    alert(result.message);
    window.location.href = "http://localhost:5500/pages/login.html";
  } catch (error) {
    console.error("Logout failed:", error);
  }
});