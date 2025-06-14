 function selectCategory(category) {
      window.location.href = `complaint-form.html?category=${category}`;
    }
    function contactSupport() {
      alert("Please contact your university grievance support team for help.");
    }
    // Fade in animation after DOM loads
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".category-card").forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
      });
    });