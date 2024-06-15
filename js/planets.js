
    window.addEventListener('scroll', function() {
    var header = document.getElementById('mainNav');
    var scrollDistance = window.scrollY;
    var maxOpacityScrollPx = 200; 

    var opacity = scrollDistance / maxOpacityScrollPx;
    opacity = opacity > 1 ? 1 : opacity; 
    header.style.opacity = opacity;
});



function zoomOut() {window.location.href = "../index.html";
    
}

 
 //typewriter 
 /* document.addEventListener("DOMContentLoaded", function(event) {
    var typewriterElement = document.getElementById('typewriter');

    // Capture existing text
    var existingText = typewriterElement.textContent;

    // Clear the element
    typewriterElement.innerHTML = '';

    // Initialize Typewriter
    var typewriter = new Typewriter(typewriterElement, {
      loop: false, // Set to true if you want it to loop
      delay: 75,
    });

    // Use captured text
    typewriter.typeString(existingText)
              .start();
  });
   */
  
      // Initialize the rotation degree
let degree = 0;

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  degree = scrollPosition * 0.2; 
  const planetsImg = document.querySelector('.planetsImg');
  planetsImg.style.transform = 'rotate(' + degree + 'deg)';
});

//cloud 
let move = 0;

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  move = scrollPosition * 0.6; 
  
  var cloud1 = document.querySelector(".cloud1");
  var cloud2 = document.querySelector(".cloud2");
  var cloud3 = document.querySelector(".cloud3");

  cloud1.style.transform = `translate(${move - 40}px, ${-move}px)`;
  cloud2.style.transform = `translate(${-move}px, ${-move}px)`;
  cloud3.style.transform = `translate(${-move}px, ${-move}px)`;
});
