/* =========================================================
PAGE ROUTING (Replaced with Multi-Page Active Link Logic)
========================================================= */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // For root path, index.html is active. Also check if the href matches exactly.
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

/* =========================================================
MOVE TO TOP
========================================================= */
const backToTop = document.getElementById("backToTop");
if(backToTop){
backToTop.addEventListener("click",() => {
window.scrollTo({
top:0,
behavior:"smooth"
});
});
}
/* =========================================================
MOBILE MENU
========================================================= */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navLinks");
if(menuBtn && navMenu) {
    menuBtn.addEventListener("click",() => {
    navMenu.classList.toggle("open");
    });
}
/* =========================================================
THEME
========================================================= */
const themeToggles = document.querySelectorAll("#themeToggle, .themeToggleMobile");
const themeIcons = document.querySelectorAll("#themeIcon, .themeIconMobile");
function setTheme(theme){
document.documentElement.classList.toggle(
"dark",
theme === "dark"
);
localStorage.setItem("hookHarborTheme",theme);
themeIcons.forEach(icon => { if(icon) icon.innerHTML = theme === "dark" ? "&#9789;" : "&#9728;";theme === "dark" ? "☾" : "☼"; });
}
const savedTheme = localStorage.getItem("hookHarborTheme");
setTheme(
savedTheme ||
(
window.matchMedia &&
window.matchMedia("(prefers-color-scheme: dark)").matches
? "dark"
: "light"
)
);
themeToggles.forEach(themeToggle => { if(themeToggle) {
    themeToggle.addEventListener("click",() => {
    const dark = document.documentElement.classList.contains("dark");
    setTheme(dark ? "light" : "dark");
    });
}});
/* =========================================================
RTL
========================================================= */
const rtlToggles = document.querySelectorAll("#rtlToggle, .rtlToggleMobile");
function setDirection(direction){
document.documentElement.dir = direction;
localStorage.setItem("hookHarborDirection", direction);
}
setDirection(localStorage.getItem("hookHarborDirection") || "ltr");
rtlToggles.forEach(rtlToggle => { if(rtlToggle) {
    rtlToggle.addEventListener("click",() => {
    const current = document.documentElement.dir;
    setDirection(current === "rtl" ? "ltr" : "rtl");
    });
}});
/* =========================================================
PRODUCT FILTER
========================================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const productItems = document.querySelectorAll(".product-item");
filterButtons.forEach(button => {
button.addEventListener("click",() => {
const filter = button.dataset.filter;
filterButtons.forEach(item => {
item.classList.toggle("active", item === button);
});
productItems.forEach(item => {
const category = item.dataset.category;
const visible = filter === "all" || category === filter;
item.style.display = visible ? "" : "none";
});
});
});
/* =========================================================
TOAST
========================================================= */
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message){
if(!toast) return;
toast.textContent = message;
toast.classList.add("show");
clearTimeout(toastTimer);
toastTimer = setTimeout(() => {
toast.classList.remove("show");
},3200);
}
/* =========================================================
PRODUCT ENQUIRY BUTTONS
========================================================= */
document.querySelectorAll(".enquiry-btn").forEach(button => {
button.addEventListener("click",() => {
window.location.href = "contact.html?enquiry=true";
});
});
/* =========================================================
CONTACT FORM
========================================================= */
const contactForm = document.getElementById("contactForm");
if(contactForm) {
    // Check if we came from an enquiry button
    if(window.location.search.includes('enquiry=true')) {
        setTimeout(() => {
            const message = document.getElementById("message");
            if(message){
                message.value = "I would like more information about your fishing products.";
                message.focus();
            }
        }, 100);
    }

    contactForm.addEventListener("submit",event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    if(!name){
    showToast("Please enter your name.");
    return;
    }
    showToast("Thank you, " + name + ". Your enquiry has been prepared successfully.");
    contactForm.reset();
    });
}
/* =========================================================
IMAGE ERROR HANDLING
========================================================= */
document.querySelectorAll("img").forEach(img => {
img.addEventListener("error",() => {
img.dataset.imageError = "true";
console.warn("Image failed to load:", img.src);
});
});
/* =========================================================
DUPLICATE IMAGE CHECK
========================================================= */
function checkDuplicateImages(){
const images = [...document.querySelectorAll("img")];
const urls = images.map(img => img.src);
const duplicates = urls.filter((url,index) => urls.indexOf(url) !== index);
if(duplicates.length){
console.warn("Duplicate image URLs detected:", [...new Set(duplicates)]);
}else{
console.info("Hook & Harbor image audit: PASS â€” no duplicate image URLs detected.");
}
}
checkDuplicateImages();
/* =========================================================
ACCESSIBILITY: KEYBOARD FOCUS
========================================================= */
document.addEventListener("keydown",event => {
if(event.key === "Escape" && navMenu){
navMenu.classList.remove("open");
}
});
/* =========================================================
PREVENT EMPTY BUTTONS
========================================================= */
document.querySelectorAll("button").forEach(button => {
if(!button.getAttribute("aria-label") && !button.textContent.trim()){
button.setAttribute("aria-label", "Website control");
}
});








