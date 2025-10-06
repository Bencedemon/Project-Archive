const dropdown = document.querySelector('.custom-dropdown');
const btn = dropdown.querySelector('.dropdown-btn');
const list = dropdown.querySelector('.dropdown-list');

btn.addEventListener('click', () => {
    const isOpen = list.style.display === 'block';
    list.style.display = isOpen ? 'none' : 'block';
    btn.textContent = btn.textContent.replace(/▾|▴/, isOpen ? '▾' : '▴');
});

list.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        btn.textContent = item.textContent + " ▾";
        btn.dataset.value = item.dataset.value;
        list.style.display = 'none';
        applyFilters(item.dataset.value);
    });
});

// Close if clicked outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        list.style.display = 'none';
        btn.textContent = btn.textContent.replace(/▴/, '▾');
    }
});