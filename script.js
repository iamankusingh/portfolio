// Preloading Animation
document.addEventListener("DOMContentLoaded", function () {
  // Simulate delay for demonstration purposes
  setTimeout(function () {
    // Remove loading animation
    document.getElementById("loading-animation").classList.add("fade-out");

    // Display website content
    // document.getElementById("website-content").style.display = "block";

    // Allow scrolling after content is loaded
    document.body.style.overflow = "auto";
  }, 4000); // x seconds delay, adjust as needed
});
// ============================================================

// ==========DARK / LIGHT MODE====================
let modebtn = document.querySelector("#mode");
let body = document.querySelector("body");
let btn = document.querySelector("#mode");
let currMode = "light";

modebtn.addEventListener("click", () => {
  if (currMode === "light") {
    currMode = "dark";
    body.classList.add("dark");
    // body.classList.remove("light");

    btn.classList.add("dark");
    btn.classList.remove("light");
  } else {
    currMode = "light";
    // body.classList.add("ligth");
    body.classList.remove("dark");

    btn.classList.add("ligth");
    btn.classList.remove("dark");
  }

  console.log(currMode);
});

// ================Type JS=======================
