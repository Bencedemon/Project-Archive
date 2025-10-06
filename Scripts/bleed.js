// Auto-fill the blurred background for each .project-bleed from the first screenshot image.
function createBleed() {
    document.querySelectorAll('.project-bleed').forEach(bleed => {
        const bgNode = bleed.querySelector('.project-bg');
        if (!bgNode) return;

        // If already has a background, skip reapplying
        if (bgNode.style.backgroundImage) return;

        const custom = bleed.getAttribute('data-bg');
        if (custom && custom.trim() !== "") {
            bgNode.style.backgroundImage = `url('${custom}')`;
            return;
        }

        const firstImg = bleed.querySelector('.screenshots img');
        if (firstImg && firstImg.src) {
            bgNode.style.backgroundImage = `url('${firstImg.src}')`;
            return;
        }

        bgNode.style.background = 'linear-gradient(135deg,#222,#111)';
        bgNode.style.filter = 'brightness(0.6)';
    });
}

function createBleedOld2(){
    document.querySelectorAll('.project-bleed').forEach(bleed => {
        const bgNode = bleed.querySelector('.project-bg');
        if (!bgNode) return;

        const custom = bleed.getAttribute('data-bg');

        if (custom && custom.trim() !== "") {
            // Try to preload the image
            const testImg = new Image();
            testImg.onload = function() {
                // ✅ If image loads, use it
                bgNode.style.backgroundImage = `url('${custom}')`;
            };
            testImg.onerror = function() {
                // ❌ If it fails, fallback to first screenshot
                const firstImg = bleed.querySelector('.screenshots img');
                if (firstImg && firstImg.src) {
                    bgNode.style.backgroundImage = `url('${firstImg.src}')`;
                } else {
                    // Final fallback: gradient
                    bgNode.style.background = 'linear-gradient(135deg,#222,#111)';
                    bgNode.style.filter = 'brightness(0.6)';
                }
            };
            testImg.src = custom;
        } else {
            // If data-bg is empty, fallback right away
            const firstImg = bleed.querySelector('.screenshots img');
            if (firstImg && firstImg.src) {
                bgNode.style.backgroundImage = `url('${firstImg.src}')`;
            } else {
                bgNode.style.background = 'linear-gradient(135deg,#222,#111)';
                bgNode.style.filter = 'brightness(0.6)';
            }
        }
    });
}

function oldBleed(){
    document.querySelectorAll('.project-bleed').forEach(bleed => {
        // If the developer provided a custom background via data-bg, prefer that.
        const custom = bleed.getAttribute('data-bg');
        const bgNode = bleed.querySelector('.project-bg');
        if (!bgNode) return;
        if (custom) {
            bgNode.style.backgroundImage = `url('${custom}')`;
            return;
        }

        // find the first screenshot img inside this project
        const firstImg = bleed.querySelector('.screenshots img');
        if (firstImg && firstImg.src) {
            bgNode.style.backgroundImage = `url('${firstImg.src}')`;
        } else {
            // fallback: small subtle gradient if no image available
            bgNode.style.background = 'linear-gradient(135deg,#222,#111)';
            bgNode.style.filter = 'brightness(0.6)';
        }
    });
}