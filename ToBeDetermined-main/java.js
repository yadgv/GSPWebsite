var lightOn = false;
const walle = document.getElementById("homeWalle");
const walleEye = document.getElementById("homeWalle");
document.onclick = function () {
  lightOn = !lightOn;
  walle.src = lightOn ? "sources/WalleLightOnLeft.png" : "sources/WalleLightOffLeft.png";
  walle.style.opacity = lightOn ? "0.7" : "0.5";
};

document.addEventListener("DOMContentLoaded", function () {
  const light = document.createElement("div");
  light.id = "light";
  document.body.appendChild(light);
  light.style.opacity = "0";

  document.addEventListener("mousemove", function (e) {
    light.style.opacity = lightOn ? "1" : "0";
    
    if (lightOn) {
      light.style.left = e.clientX + "px";
      light.style.top = e.clientY + "px";

      const eyesContainer = document.querySelector(".eyes");
      const eyes = document.querySelectorAll(".eyes > div");

      if (!eyesContainer || eyes.length !== 2) return;

      const containerRect = eyesContainer.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
      const distance = Math.min(
        eyes[0].offsetWidth / 4,
        Math.sqrt(Math.pow(e.clientX - containerCenterX, 2) + Math.pow(e.clientY - containerCenterY, 2))
      );

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      eyes.forEach((eye) => {
        const eyeBall = eye.querySelector("i");
        eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }
  });
});






// Get the modal
var modal = document.getElementById("imageModal");

// Get the modal image element and close button
var modalImg = document.getElementById("modalImg");
var closeBtn = document.getElementsByClassName("close")[0];

// Add click event to each image in the gallery
var images = document.querySelectorAll('.gallery-card img');
images.forEach(function(image) {
    image.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
    };
});

// Close the modal when user clicks the "X" button
closeBtn.onclick = function() {
    modal.style.display = "none";
};

// Close the modal when the user clicks outside the image
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") { // Check if the pressed key is Esc
    modal.style.display = "none";
  }
});


