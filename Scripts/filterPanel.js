const panel = document.querySelector('.filter-toggle');

panel.addEventListener("click", function(e) {
    const panel = document.getElementById("filterPanel");
    const button = document.querySelector(".filter-toggle");

    panel.classList.toggle("active");

    // Change arrow
    if (panel.classList.contains("active")) {
        button.innerHTML = "Filters ▴";
    } else {
        button.innerHTML = "Filters ▾";
    }
});

/* Closes itself */
/*document.addEventListener("click", function(e) {
    const panel = document.getElementById("filterPanel");
    const button = document.querySelector(".filter-toggle");
    if (!panel.contains(e.target) && !button.contains(e.target)) {
    panel.classList.remove("active");
    button.innerHTML = "Filters ▾"; // reset arrow
    }
});*/