function sortGames(games, order, featuredId, disableFeatured = false) {
    const sorted = [...games];

    switch(order) {
        case "az":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "za":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "oldest":
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "newest":
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        default:
            break;
    }

    // If there’s a featured game, move it to the front
    if (featuredId && !disableFeatured) {
        const index = sorted.findIndex(g => g.id === featuredId);
        if (index > -1) {
            const [featuredGame] = sorted.splice(index, 1);
            sorted.unshift(featuredGame);
        }
    }

    return sorted;
}