const slider = document.getElementById("slider");
const slides = Array.from(slider.querySelectorAll(".slide"));
const dotsContainer = document.getElementById("dots");

let current = 0;
let autoplayInterval = null;
const total = slides.length;

/* -------------------------
   INIT DOTS
------------------------- */

function createDots() {
    const fragment = document.createDocumentFragment(); //کلا یه بار اضافه میکنه
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "w-2.5 h-2.5 rounded-full transition-all";
        dot.addEventListener("click", () => goTo(i));
        dots.push(dot);
        fragment.appendChild(dot);
    });
    dotsContainer.appendChild(fragment);
};

/* -------------------------
   UPDATE UI
------------------------- */
// function updateUI() {
//     slides.forEach((slide, i) => {
//         slide.style.opacity = i === current ? "1" : "0";
//         slide.style.zIndex = i === current ? "10" : "0";
//     });

//     [...dotsContainer.children].forEach((dot, i) => {
//         dot.classList.toggle("bg-white", i === current);
//         dot.classList.toggle("bg-white/40", i !== current);
//     });
// }

function updateUI() {
    slides[current].classList.add("active");
    dots[current].classList.replace("bg-white/40", "bg-white");

    const prev = (current - 1 + total) % total; // فقط قبلی رو پاک میکنه
    slides[prev].classList.remove("active");
    dots[prev].classList.replace("bg-white", "bg-white/40");
};

/* -------------------------
   INFINITE LOGIC
------------------------- */
function next() {
    current = (current + 1) % total;
    updateUI();
}

function prev() {
    current = (current - 1 + total) % total;
    updateUI();
}

function goTo(i) {
    const old = current;
    current = i;
    slides[old].classList.remove("active");                           //این یه قسمتو حتما حتما چک کن درست باشهههه ((((:
    dots[old].classList.replace("bg-white", "bg-white/40");
    updateUI();
    resetAutoplay();
};

/* -------------------------
   AUTOPLAY
------------------------- */
function startAutoplay() {
    autoplayInterval = setInterval(next, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

/* -------------------------
   DRAG (MOUSE)
------------------------- */
let startX = 0;
let isDragging = false;

slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
});

slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    let diff = e.clientX - startX;

    if (diff > 50) prev();
    else if (diff < -50) next();
});

/* -------------------------
   SWIPE (TOUCH)
------------------------- */
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) prev();
    else if (diff < -50) next();
});

/* -------------------------
   HOVER PAUSE
------------------------- */
slider.parentElement.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
});

slider.parentElement.addEventListener("mouseleave", () => {
    startAutoplay();
});

/* -------------------------
   INIT
------------------------- */
createDots();
updateUI();
startAutoplay();
