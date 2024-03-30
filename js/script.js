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


    card.querySelector(".btn").style.background = gradientBackground;

  // fetch the page source code of the repository
    fetch(url).then((response) => response.text()).then((data) => {
    // extract the image url from the source code from the twitter:image:src meta tag
    const parser = new DOMParser();
    const html = parser.parseFromString(data, "text/html");

    //   get the repo description
    repoDescription = html.querySelector('meta[name="description"]').content.split("-")[0].trim();
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



// Search functionality
const searchInput = document.getElementById("searchInput");
const cardsContainer = document.getElementById("cardsContainer");
const noResultsMessage = document.createElement("h3");
noResultsMessage.textContent = "No results found";
noResultsMessage.classList.add("no-results-message");

// Add the "No results found" message to the DOM
cardsContainer.appendChild(noResultsMessage);

// Hide the "No results found" message by default
noResultsMessage.style.display = "none";

// Search functionality
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    let resultsFound = false;

    cards.forEach((cardi) => {
        const title = cardi.querySelector(".card-title").textContent.trim().toLowerCase();
        const description = cardi.querySelector(".card-text").textContent.trim().toLowerCase();
        const tag = cardi.querySelector(".sc-15px").textContent.trim().toLowerCase();

        // Check if the search value is found in the title, description, or tag, if not found, hide the entire card (parent element) not just the card image, title, and description
        if (title.includes(searchValue) || description.includes(searchValue) || tag.includes(searchValue)) {
            cardi.parentElement.classList.remove("d-none");
            resultsFound = true;
        } else {
            cardi.parentElement.classList.add("d-none");
        }
    });

    // Show or hide the "No results found" message based on search results
    if (resultsFound) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
});

