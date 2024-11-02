var lightOn = false;
document.onclick = function() {
  lightOn = true;
  walle = document.getElementById("homeWalle")
  walle.src = "sources/WalleLightOnLeft.png";
  walle.style.opacity = "0.7";
};
document.addEventListener("DOMContentLoaded", function () {
    const light = document.createElement("div");
    light.id = "light";
    document.body.appendChild(light);
    light.style.opacity = "0";

    document.addEventListener("mousemove", function (e) {
      if (lightOn) {
        light.style.opacity = "1";
        const x = e.clientX;
        const y = e.clientY;
        light.style.left = x + "px";
        light.style.top = y + "px";
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


