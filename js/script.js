// Theme Switch Button
const moonIcon = '<i class="bi bi-moon-stars"></i>';
const sunIcon = '<i class="bi bi-brightness-high fs-4"></i>';
const themeSwitch = document.getElementById("themeSwitch");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === null) {
    localStorage.setItem("theme", JSON.stringify("light"));
}

// Function to apply theme based on stored value
function applyTheme() {
    const currentTheme = JSON.parse(localStorage.getItem("theme"));
    document.body.setAttribute("data-bs-theme", currentTheme);
    themeSwitch.innerHTML = currentTheme === "dark" ? moonIcon : sunIcon;
}
applyTheme();

// Theme switch event listener
themeSwitch.addEventListener("click", () => {
    // Toggle between 'light' and 'dark' themes
    const newTheme = JSON.parse(localStorage.getItem("theme")) === "light" ? "dark" : "light";
    // Apply the new theme
    localStorage.setItem("theme", JSON.stringify(newTheme));
    applyTheme();
});

function randomHSL() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
    const lightness = Math.floor(Math.random() * 30) + 50; // 50-80%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


// fetch the repository image url from the repository page and add it to the card
repoUrls = [];
cards = document.querySelectorAll(".fetch-repo-image");


cards.forEach((card) => {
    url = card.querySelector("img").src;
    ghrepolocation = url.replace("https://github.com/", "");

    // replace the / at the end if exists
    ghrepolocation = ghrepolocation.endsWith("/") ? ghrepolocation.slice(0, -1) : ghrepolocation;

    // make the last updated shield
    commitShield = `https://img.shields.io/github/last-commit/${ghrepolocation}?style=flat-square&logo=github&logoColor=white&color=green&style=flat-square&label=Last%20Updated`;
    card.querySelector(
        ".card-footer-shield"
    ).innerHTML = `<img src="${commitShield}" class="img-thumbnail" alt="${commitShield}">`;

    // now make github.io url from the github repo location
    ghPagesUrl = `https://${ghrepolocation.split("/")[0]}.github.io/${ghrepolocation.split("/")[1]}`;

    // change the href of the button to the github.io url
    card.querySelector(".btn").href = ghPagesUrl;

    // add random gradient background color to every button
    const startColors = [];
    const endColors = [];
    for (let i = 0; i < 18; i++) {
        startColors.push(randomHSL());
        endColors.push(randomHSL());
    }
    
    // Generate random degrees for gradients
    const angles = [];
    for (let i = 0; i < 18; i++) {
        angles.push(Math.floor(Math.random() * 360));
    }
    
    // Construct the gradient background string
    let gradientBackground = "";
    for (let i = 0; i < 18; i++) {
        gradientBackground += `linear-gradient(${angles[i]}deg, ${startColors[i]}, ${endColors[i]}), `;
    }
    
    // Remove the trailing comma and space
    gradientBackground = gradientBackground.slice(0, -2);

    // Apply the gradient background to the button
    card.querySelector(".btn").style.background = gradientBackground;

    // use the api.github.com to do the same functionality
    fetch(`https://api.github.com/repos/${ghrepolocation}`).then((response) => response.json()).then((data) => {
        // get the description of the repo
        repoDescription = data.description;
        card.querySelector(".card-text").textContent = repoDescription;
    });
});



window.onload = function () {
    // Remove preloader class to hide preloader after page is loaded
    setTimeout(() => {
        const preloader = document.querySelector(".preloader-container");
        // Add class to initiate fade-out transition
        preloader.classList.add("preloader-unactive");
        // After the transition is complete, remove the preloader from the DOM
        preloader.addEventListener("transitionend", function () {
            preloader.remove();
        });
    }, 3000);
};


// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});



