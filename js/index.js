// Zoom function
function zoomIn(element) {
    var container = document.getElementById("all");
    var names = document.querySelectorAll(".names");
    names.forEach(function (name) {
        name.style.display = "none"; // Hide all planet names during zoom-in
    });

    var rect = element.getBoundingClientRect();
    var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var scaleX = window.innerWidth / rect.width;
    var scaleY = window.innerHeight / rect.height;
    var minScale = Math.min(scaleX, scaleY);

    // Calculate offsets to center the element horizontally and move it more to the top
    var offsetX =
        window.innerWidth / 2 - (rect.left + scrollX + rect.width / 2);
    var topPadding = 70; // Additional padding to move the element more towards the top, adjust as needed
    var offsetY = -(rect.top + scrollY - window.pageYOffset + topPadding);

    // Set the transformation
    container.style.transition = "2s ease"; // Apply transition for zoom-in
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${minScale})`;
    container.style.transformOrigin = `${
        rect.left + scrollX + rect.width / 2
    }px ${rect.top + scrollY}px`;

    // Store zoom state in session storage
    sessionStorage.setItem("zoomed", "true");
    sessionStorage.setItem("zoomTransform", container.style.transform);
    sessionStorage.setItem("zoomOrigin", container.style.transformOrigin);

    setTimeout(function () {
        var zoomTarget = element.getAttribute("data-zoom-target");
        if (zoomTarget) {
            window.location.href = zoomTarget;
        }
    }, 1000); // Change delay as needed
}

// Function to toggle sunlight
function toggleSunlight() {
    var sunCon = document.getElementById("sunCon");
    var sun = sunCon.querySelector(".sun");
    var planets = document.querySelectorAll(
        ".earthElements,.venusElements,.mercuryElements,.spaceBackground,body,.ufoElements,.shuttleElements,.satelliteElements"
    );

    sunCon.classList.toggle("sunlight"); // Toggle sunlight class for the sun
    planets.forEach(function (planet) {
        planet.classList.toggle("planetlight"); // Toggle planetlight class for each planet
    });
}

// Load function to check zoom state
document.addEventListener("DOMContentLoaded", function () {
    var isZoomed = sessionStorage.getItem("zoomed");
    if (isZoomed === "true") {
        var container = document.getElementById("all");
        container.style.transition = "none"; // Remove transition during zoom-in
        container.style.transform = sessionStorage.getItem("zoomTransform");
        container.style.transformOrigin = sessionStorage.getItem("zoomOrigin");
        setTimeout(function () {
            container.style.transition = ""; // Reapply transition after zoom-in
        }, 0);
    }
});

function zoomOut() {
    var container = document.getElementById("all");
    container.style.transition = "1.5s ease"; // Apply transition for zoom-out
    container.style.transform = ""; // Reset the transform
    container.style.transformOrigin = ""; // Reset the transform origin

    // Remove zoom state from session storage
    sessionStorage.removeItem("zoomed");
    sessionStorage.removeItem("zoomTransform");
    sessionStorage.removeItem("zoomOrigin");

    // Show all planet names after zoom-out
    var names = document.querySelectorAll(".names");
    names.forEach(function (name) {
        name.style.display = "block";
    });
}

// Call zoomOut function after 2 seconds
setTimeout(zoomOut, 700);
