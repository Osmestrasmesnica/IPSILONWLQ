'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    document.getElementById('logo-heder').src="./assets/new-design/logo/logo-1-removebg-preview.png"
  } else {
    header.classList.remove("active");
    document.getElementById('logo-heder').src="./assets/new-design/logo/logo-2-removebg-preview.png"
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }

// JavaScript to toggle text expansion and show/hide "Saznajte više" button
const expandLinks = document.querySelectorAll('.btn-text');

for (let i = 0; i < expandLinks.length; i++) {
  const expandLink = expandLinks[i];
  const cardText = expandLink.parentElement.querySelector('.card-text');

  // Function to check if the button should be shown or hidden
  function toggleButtonVisibility() {
    if (cardText.scrollHeight > cardText.clientHeight) {
      expandLink.style.display = 'flex'; // Show the "Saznajte više" button
    } else {
      expandLink.style.display = 'none'; // Hide the "Saznajte više" button
    }
  }

  // Initially, check the visibility of the button
  toggleButtonVisibility();

  // Attach click event listener
  expandLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the link from navigating

    cardText.classList.toggle('expanded');

    // Toggle the text and button display
    if (cardText.classList.contains('expanded')) {
      expandLink.querySelector('.span').textContent = 'Manje';
    } else {
      expandLink.querySelector('.span').textContent = 'Saznajte više';
    }
  });

  // Attach resize event listener to dynamically show/hide the button
  window.addEventListener('resize', toggleButtonVisibility);
}



document.addEventListener("DOMContentLoaded", function () {
    // Pronađite sve linkove u navbaru
    var navbarLinks = document.querySelectorAll(".navbar-link");

    // Dodajte događaj za svaku stavku u navbaru
    navbarLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Odbijte podrazumevano ponašanje klika

            // Dobijte ciljani ID iz atributa href linka
            var targetId = link.getAttribute("href").substring(1);

            // Pronađite ciljani element po ID-ju
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Skrolujte do ciljanog elementa
                targetElement.scrollIntoView({ behavior: "smooth" });

                   // Close the navbar when a link is clicked
                   closeNavbar();
            }
        });
    });
});

// contact us

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


// Function to hide the contact section
function hideContactSection() {
  const contactSection = document.querySelector('form');
  if (contactSection) {
    contactSection.style.display = 'none';
  }
}

// Function to show the contact section
function showContactSection() {
  const contactSection = document.querySelector('form');
  if (contactSection) {
    contactSection.style.display = 'block'; // You can use 'block' or 'flex' depending on your CSS styles.
  }
}

// Add event listener to the button with class "nav-open-btn"
const navOpenBtn = document.querySelector('.nav-open-btn');
if (navOpenBtn) {
  navOpenBtn.addEventListener('click', function() {
    const navbar = document.querySelector(".navbar");
    if (navbar.classList.contains("active")) {
      hideContactSection();
    } else {
      showContactSection();
    }
  });
}

// Event listener for when the navbar is no longer active
document.body.addEventListener('click', function(event) {
  const navbar = document.querySelector(".navbar");
  const contactSection = document.getElementById('form');
  
  // Check if the navbar contains the "active" class
  if (!navbar.classList.contains("active")) {
    showContactSection();
  }
});
