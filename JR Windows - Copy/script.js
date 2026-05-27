const services = [
  ["Interior Window Cleaning", "Careful indoor cleaning around furniture, floors, blinds, and decor for a brighter home interior.", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"],
  ["Exterior Window Cleaning", "Outside glass, edges, and frames cleaned with detail-focused care for a crystal clear finish.", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"],
  ["Screen Cleaning", "Dust, pollen, and debris removed from screens so the full window area feels refreshed.", "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80"],
  ["Bi/Tri Annual Service Plan", "Choose two or three scheduled cleanings per year to keep your windows consistently bright and polished.", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"]
];

const reviews = [
  ["Jo Pernot", "Jaden performed beyond my expectations! He took his time, going back to check each window, and moving/returning anything that was in the way. My windows are spotless!"],
  ["Lillia Niaka", "Jaden cleaned my windows, and I was very happy with his work. He did a great job and was very professional, respectful, and easy to communicate with."],
  ["Local Homeowner", "The communication was easy, the work was careful, and the final result made the whole house feel brighter."]
];

const gallery = [
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80"
];

const header = document.querySelector(".navbar");
const toggle = document.querySelector(".nav-toggle");
const body = document.body;

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
});

toggle?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => body.classList.remove("menu-open"));
});

document.querySelectorAll("[data-services]").forEach((grid) => {
  const limit = Number(grid.dataset.limit || services.length);
  grid.innerHTML = services.slice(0, limit).map(([title, text, image]) => `
    <article class="service-card reveal">
      <img src="${image}" alt="${title}" loading="lazy">
      <div>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </article>
  `).join("");
});

document.querySelectorAll("[data-reviews]").forEach((grid) => {
  grid.innerHTML = reviews.map(([name, quote]) => `
    <article class="review-card reveal">
      <div class="stars">★★★★★</div>
      <p>"${quote}"</p>
      <strong>- ${name}</strong>
    </article>
  `).join("");
});

document.querySelectorAll("[data-gallery]").forEach((grid) => {
  grid.innerHTML = gallery.map((image, index) => `
    <article class="gallery-item ${index % 3 === 0 ? "tall" : ""} reveal">
      <img src="${image}" alt="JR Window Cleaning gallery image ${index + 1}" loading="lazy">
    </article>
  `).join("");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const observeReveals = () => document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
observeReveals();
setTimeout(observeReveals, 50);

document.querySelectorAll("[data-count]").forEach((counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";
  let started = false;
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      counter.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  observer.observe(counter);
});

document.querySelectorAll("[data-before-after]").forEach((slider) => {
  const after = slider.querySelector(".after");
  const input = slider.querySelector("input");
  input.addEventListener("input", () => {
    after.style.clipPath = `inset(0 ${100 - input.value}% 0 0)`;
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".faq-item").classList.toggle("open");
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".testimonial")];
  let index = 0;
  const show = (next) => {
    slides[index].classList.remove("active");
    index = (next + slides.length) % slides.length;
    slides[index].classList.add("active");
  };
  carousel.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
  carousel.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
  setInterval(() => show(index + 1), 7000);
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Thanks! This demo form is ready. Connect it to email/Formspree/Netlify Forms to receive submissions.";
    form.reset();
  });
});

window.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
});
