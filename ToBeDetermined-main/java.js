let lightOn = false;
let lightTurnedOn = false;
const walle = document.getElementById("homeWalle");
const light = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  // Set up the light element and add it to the DOM
  light.id = "light";
  document.body.appendChild(light);
  light.style.opacity = "0"; // Default to off
  lightOn = localStorage.getItem("lightOn") === "true";


  // Determine initial light state based on page
  if (!document.URL.includes("home.html")) {
    lightOn = true;
    light.style.opacity = "1";
    localStorage.setItem("lightOn", "true");
  }

  if (document.URL.includes("home.html") && localStorage.getItem("lightOn") === "true") {
    light.style.opacity = "1";
    walle.src = "sources/WalleLightOnNoEyeBallsAtAll.png";
    walle.style.opacity = "0.7";
    localStorage.setItem("lightOn", lightOn);
  }

  // Toggle light on click only on "home.html"
  if (document.URL.includes("home.html")) {
    document.onclick = function () {
      lightOn = !lightOn;
      lightTurnedOn = !lightTurnedOn;
      light.style.opacity = lightOn ? "1" : "0";
      walle.src = lightOn ? "sources/WalleLightOnNoEyeBallsAtAll.png" : "sources/WalleLightOffNoEyeBallsAtAll.png";
      walle.style.opacity = lightOn ? "0.7" : "0.5";
      localStorage.setItem("lightOn", lightOn);
    };
  }

  // Track mouse movement to update light and eyes when light is on
  document.addEventListener("mousemove", function (e) {
    light.style.left = e.clientX + "px";
    light.style.top = e.clientY + "px";

    if (lightOn && document.URL.includes("home.html")) {
      const eyesContainer = document.querySelector(".eyes");
      const eyes = document.querySelectorAll(".eyes > div");

      if (!eyesContainer || eyes.length !== 2) return;

      const containerRect = eyesContainer.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      // Calculate angle and distance for eye movement
      const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
      const distance = Math.min(
        eyes[0].offsetWidth / 4,
        Math.sqrt(Math.pow(e.clientX - containerCenterX, 2) + Math.pow(e.clientY - containerCenterY, 2))
      );

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      // Move each eye's pupil based on calculated position
      eyes.forEach((eye) => {
        const eyeBall = eye.querySelector("i");
        if (eyeBall) {
          eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    }
  });

  if (document.URL.includes("gallery.html")) {
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

  }
  if (document.URL.includes("aboutthegame.html")){
    const previewImg = document.getElementById("previewImg");
    const photos = document.querySelectorAll('.photoPickerImg');
    
    // Function to update the preview area
    function updatePreview(item) {
      if (item.tagName === "IMG") {
        previewImg.src = item.src; // Display image in preview
        previewImg.style.display = "block"; // Ensure previewImg is visible
        previewImg.replaceWith(previewImg); // Replace if it was previously an iframe
      } else if (item.tagName === "IFRAME") {
        const videoPreview = item.cloneNode(true); // Clone the iframe
        videoPreview.width = previewImg.width; // Match dimensions
        videoPreview.height = previewImg.height;
        previewImg.replaceWith(videoPreview); // Replace preview image with iframe
      }
    }
    
    // Add click event listeners to all photo picker items
    photos.forEach(function(item) {
      item.addEventListener("click", function(event) {
        updatePreview(this);
      });
    });
    
    // Scrolling buttons
    const buttonRight = document.getElementById('rightButton');
    const buttonLeft = document.getElementById('leftButton');
    const photoPicker = document.getElementsByClassName('photoPicker')[0];
    
    buttonRight.onclick = function () {
      photoPicker.scrollLeft += 450;
    };
    
    buttonLeft.onclick = function () {
      photoPicker.scrollLeft -= 450;
    };
  }
});







