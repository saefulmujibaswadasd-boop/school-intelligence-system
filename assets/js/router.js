// SIMPLE ROUTER SIS 2026

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-link]");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href");
      window.location.href = page;
    });
  });
});