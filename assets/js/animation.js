// Smooth Scrolling

const smoothScrolling = () => {
  const lenis = new Lenis({
    duration: 2,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

smoothScrolling();

// Full Nav Menu

const fullNavMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn button");
  const fullNav = document.querySelector(".full-nav");

  const openNav = () => {
    gsap.to(fullNav, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3,
    });

    gsap.fromTo(
      ".full-nav .top-content",
      { opacity: 0, y: "-20px" },
      {
        opacity: 1,
        y: "0px",
        duration: 0.5,
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".nav-list .nav-item",
      { opacity: 0, x: "50px" },
      {
        opacity: 1,
        x: "0px",
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".full-nav .bottom-content",
      { opacity: 0, y: "20px" },
      {
        opacity: 1,
        y: "0px",
        duration: 0.5,
        ease: "power1.out",
        delay: 0.6, // Add delay to start after the nav items animation
      }
    );

    document.querySelector("body").style.overflowY = "hidden";
  };

  const closeNav = () => {
    gsap.to(fullNav, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
    });

    document.querySelector("body").style.overflowY = "auto";
  };

  hamburger.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
};

fullNavMenu();

// Fade Animation

function loadAnimations() {
  let visibleElements = [];

  const revealOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!visibleElements.includes(entry.target)) {
          visibleElements.push(entry.target);
        }
      }
    });

    if (visibleElements.length > 1) {
      visibleElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("reveal");
          observer.unobserve(element);

          visibleElements = visibleElements.filter((el) => el !== element);
        }, index * 200);
      });
    } else if (visibleElements.length === 1) {
      const element = visibleElements[0];
      element.classList.add("reveal");
      observer.unobserve(element);
      visibleElements = [];
    }
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    root: null,
    threshold: 0.2,
  });

  document.querySelectorAll(".masker").forEach((element) => {
    observer.observe(element);
  });
}

loadAnimations();

// Magnetic Hover Button Animation

const btn = document.querySelectorAll(".magnetic-btn");

btn.forEach((button) => {
  // Define the magnetic area (in pixels)
  const magneticArea = 100;

  window.addEventListener("mousemove", (e) => {
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const distance = Math.sqrt(x * x + y * y);

    // Check if the mouse is within the magnetic range
    if (distance < magneticArea) {
      gsap.to(button, {
        x: x * 0.3, // Control intensity of the movement
        y: y * 0.3,
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      // Reset position when out of magnetic range
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  });

  // Reset button position on mouseleave
  document.body.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });
});
