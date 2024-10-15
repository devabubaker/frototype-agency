// Project Sec
import { projectData } from "./constant.js"; // Ensure this path is correct
// No need to import gsap if using the CDN

const projectContainer = document.querySelector(".project-sec .project-container");

// Function to render project cards
const projectsData = () => {
    projectContainer.innerHTML = projectData
        .map(
            (item) => `
        <div class="project-frame">
            <a href="${item.linkUrl}">
                <div class="image">
                    <img src="${item.imgUrl}" alt="Project Image" />
                </div>
                <div class="content">
                    <h3>${item.title}</h3>
                    <hr />
                    <h5>${item.subTitle}</h5>
                </div>
            </a>
        </div>
        `
        )
        .join(""); // Join the mapped array into a string
};

// Function to load animations for project cards
function loadAnimations() {
  let visibleElements = []; // Array to keep track of visible elements

  // Intersection observer callback function
  const revealOnScroll = (entries, observer) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              if (!visibleElements.includes(entry.target)) {
                  visibleElements.push(entry.target);
              }
          }
      });

      // If there are multiple visible elements
      if (visibleElements.length > 1) {
          visibleElements.forEach((element, index) => {
              setTimeout(() => {
                  // GSAP animation for fade-in effect only (no y-axis movement)
                  gsap.to(element, {
                      opacity: 1,
                      duration: 0.5,
                      ease: "power2.out", // Control easing effect
                  });
                  observer.unobserve(element); // Stop observing the element
                  visibleElements = visibleElements.filter((el) => el !== element); // Remove element from visibleElements
              }, index * 200); // Delay based on index
          });
      } else if (visibleElements.length === 1) {
          const element = visibleElements[0];
          gsap.to(element, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out", // Control easing effect
          });
          observer.unobserve(element); // Stop observing the element
          visibleElements = [];
      }
  };

  // Create an intersection observer
  const observer = new IntersectionObserver(revealOnScroll, {
      root: null,
      threshold: 0.2,
  });

  // Observe each project frame element
  document.querySelectorAll(".project-frame").forEach((element) => {
      observer.observe(element);
  });
}

// Call the function to render project cards
projectsData();
// Call the function to load animations
loadAnimations();


// Services Sec Tab

const servicesTab = () => {
  const cusTabs = document.querySelectorAll(
    ".services-sec .services-container .services-frame .cus-tabs button"
  );

  cusTabs.forEach((tabs) => {
    tabs.addEventListener("click", () => {
      cusTabs.forEach((tabs2) => {
        tabs2.classList.remove("active");
      });
      tabs.classList.add("active");
    });
  });
};

servicesTab();

// Sticky Nav

const stickyNav = () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("active", pageYOffset > 100);
  });
};

stickyNav();

// Prcing toggle functionality

const uxToggle = document.querySelector('.toggle-ux');
const uxPriceElement = document.querySelector('.card-frame:first-of-type .price-amount');
const uxExtraInfo = document.querySelector('.card-frame:first-of-type .extra-info');

uxToggle.addEventListener('change', function () {
    if (this.checked) {
        uxPriceElement.innerHTML = '$430<span>/ per month</span>'; // Updated price
        uxExtraInfo.style.display = 'block'; // Show additional info
    } else {
        uxPriceElement.innerHTML = '$190<span>/ per month</span>'; // Original price
        uxExtraInfo.style.display = 'none'; // Hide additional info
    }
});

// Functionality for the Web Development card
const webToggle = document.querySelector('.toggle-web');
const webPriceElement = document.querySelector('.card-frame:nth-of-type(2) .price-amount');
const webExtraInfo = document.querySelector('.card-frame:nth-of-type(2) .extra-info');

webToggle.addEventListener('change', function () {
    if (this.checked) {
        webPriceElement.innerHTML = '$990<span>/ per month</span>'; // Updated price
        webExtraInfo.style.display = 'block'; // Show additional info
    } else {
        webPriceElement.innerHTML = '$490<span>/ per month</span>'; // Original price
        webExtraInfo.style.display = 'none'; // Hide additional info
    }
});