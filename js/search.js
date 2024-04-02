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