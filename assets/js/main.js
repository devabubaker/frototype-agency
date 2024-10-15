// Project Sec

import { projectData } from "./constant.js";
const projectContainer = document.querySelector(
  ".project-sec .project-container"
);

const projectsData = () => {
  projectContainer.innerHTML = projectData
    .map(
      (item) => `
    <div class="project-frame">
              <a href="${item.linkUrl}">
                <div class="image">
                  <img
                    src="${item.imgUrl}" 
                    alt="Project Image"
                  />
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
    .join(""); // join the mapped array into a string
};

// projectsData();

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
