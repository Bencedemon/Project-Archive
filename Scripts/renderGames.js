let games = [];

// Load JSON data from script tag
document.addEventListener("DOMContentLoaded", () => {
    const jsonText = document.getElementById("games-data").textContent;
    games = JSON.parse(jsonText).Games;
    applyFilters();
});

// Render function
function renderGames(gameList, featuredId, disableFeatured = false) {
    const container = document.getElementById("mainContent");
    container.innerHTML = ""; // clear existing

    if (gameList.length <= 0) {
        // Empty card
        container.innerHTML += `
            <div id="no-results" class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No game found.</div>
            </div>
        `;
    }

    gameList.forEach(game => {
        let titleHtml = "";

        // Featured Badge
        const isFeatured = (!disableFeatured && game.id === featuredId);

        // Title and State
        if(game.state){
            titleHtml+= `<h1>${game.name}<span class="game-state ${game.state}">[${game.state}]</span>${isFeatured ? `<span class="featured-badge">★ Featured</span>` : ""}</h1>`
        }else{
            titleHtml+= `<h1>${game.name}${isFeatured ? `<span class="featured-badge">★ Featured</span>` : ""}</h1>`
        }

        // Build video or fallback image
        let mediaHtml = "";
        if (game.youtube) {
            mediaHtml = `<iframe id="youtubeVideo" src="https://www.youtube-nocookie.com/embed/${game.youtube}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            mediaHtml = `<img src="Images/${game.id}/screenshot0.png" alt="${game.name} Cover" style="width:100%; border-radius:10px;">`;
        }

        // Build tags HTML
        const tagsHtml = game.tags.map(t => `<span class="tag">${t.name}</span>`).join("");

        // Build links HTML
        const linksHtml = game.links.map(l => `<a href="${l.link}" target="_blank">${l.name}</a>`).join("");

        // Build screenshots
        let screenshotsHtml = "";
        for (let i = 1; i <= game.screenshotCount; i++) {
            screenshotsHtml += `<img src="Images/${game.id}/screenshot${i}.png" alt="Screenshot ${i}">`;
        }

        // Full card
        container.innerHTML += `
            <div class="project-bleed ${isFeatured ? "featured" : ""}" data-bg="Images/${game.id}/bg.png">
            <div class="project-bg" aria-hidden="true"></div>
            <div class="project">
                <!-- Title + Engine icon -->
                <div class="project-header">
                    ${titleHtml}
                    <img src="Images/${game.engine}.png" alt="${game.engine} Engine">
                </div>
                <!-- Video + description -->
                <div class="project-content">
                    <div class="project-video">${mediaHtml}</div>
                    <div class="project-details">
                    <p>${game.desc}</p>
                    <p class="release-date">Release Date: ${game.date}</p>
                    <div class="tags">${tagsHtml}</div>
                    <div class="links">${linksHtml}</div>
                    </div>
                </div>
                <div class="screenshots">${screenshotsHtml}</div>
                </div>
            </div>
        `;
    });

    createBleed();
    enableScreenshotViewer();
}

document.querySelector(".filter-clear").addEventListener("click", () => {
    document.querySelectorAll('.filter-options input').forEach(cb => cb.checked = false);
    /* Clears Search Bar */
    //document.getElementById("searchInput").value = "";
    applyFilters();
});

// Apply Filters button
document.querySelector(".filter-apply").addEventListener("click", () => {
    applyFilters();
    /* Close Filters Panel */
    //document.getElementById("filterPanel").classList.remove("active");
    //document.querySelector(".filter-toggle").innerHTML = "Filters ▾";
});

function applyFilters(sortOverride) {
    const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();

    const checkedStates = Array.from(document.querySelectorAll(".filter-category.states input:checked"))
        .map(cb => cb.value.toLowerCase());

    const checkedEngines = Array.from(document.querySelectorAll(".filter-category.engines input:checked"))
        .map(cb => cb.value.toLowerCase());

    let filtered = games;

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(g =>
        g.name.toLowerCase().includes(searchQuery) ||
        g.desc.toLowerCase().includes(searchQuery) ||
        (g.tags && g.tags.some(t => t.name.toLowerCase().includes(searchQuery)))
        );
    }

    // State filter
    if (checkedStates.length > 0) {
        filtered = filtered.filter(g => checkedStates.includes(g.state.toLowerCase()));
    }

    // Engine filter
    if (checkedEngines.length > 0) {
        filtered = filtered.filter(g => g.engine && checkedEngines.includes(g.engine.toLowerCase()));
    }

    // Other filter
    const disableFeatured = document.getElementById("disable-featured").checked;
    const onlyWithLinks = document.getElementById("only-links").checked;

    if (onlyWithLinks) {
        filtered = filtered.filter(g => Array.isArray(g.links) && g.links.length > 0);
    }

    const jsonText = document.getElementById("games-data").textContent;
    const featuredId = JSON.parse(jsonText).Featured;

    // Sorting
    const order = sortOverride || document.querySelector('.dropdown-btn').dataset.value || 'default';
    filtered = sortGames(filtered, order, featuredId, disableFeatured);


    renderGames(filtered, featuredId, disableFeatured);
}

const searchBar = document.getElementById("searchInput");
const clearSearch = document.getElementById("clear-search");

// Toggle "X" visibility when typing
searchBar.addEventListener("input", () => {
    if (searchBar.value) {
        clearSearch.classList.add("show");
    } else {
        clearSearch.classList.remove("show");
    }
    applyFilters();
});

/*searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        applyFilters();
    }
});*/

// Clear search on click
clearSearch.addEventListener("click", () => {
    searchBar.value = "";
    clearSearch.classList.remove("show");
    applyFilters();
});