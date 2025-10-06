function enableScreenshotViewer() {
    document.querySelectorAll('.screenshots img').forEach(img => {
        img.addEventListener('click', () => {
            const allImages = Array.from(img.closest('.screenshots').querySelectorAll('img'));
            const index = allImages.indexOf(img);
            openImageViewer(allImages, index);
        });
    });
}

function openImageViewer(images, startIndex) {
    let currentIndex = startIndex;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'image-viewer-overlay';
    overlay.innerHTML = `
        <div class="image-viewer-content">
        <button class="viewer-btn prev">❮</button>
        <img src="${images[currentIndex].src}" alt="Screenshot">
        <button class="viewer-btn next">❯</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('img');
    const prevBtn = overlay.querySelector('.prev');
    const nextBtn = overlay.querySelector('.next');

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        imgEl.src = images[currentIndex].src;
    }

    function closeViewer() {
        overlay.remove();
        document.removeEventListener("keydown", keyHandler);
    }

    function keyHandler(e) {
        if (e.key === "ArrowLeft") {
        showImage(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
        showImage(currentIndex + 1);
        } else if (e.key === "Escape") {
        closeViewer();
        }
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    // Close on overlay click
    overlay.addEventListener('click', () => {
        closeViewer();
    });

    // Hide arrows if only one image
    if (images.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    // Keyboard navigation
    document.addEventListener("keydown", keyHandler);
}
