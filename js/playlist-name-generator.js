// Playlist Name Generator Script

document.addEventListener('DOMContentLoaded', () => {
    const keywordsInput = document.getElementById('keywordsInput');
    const generateNameBtn = document.getElementById('generateNameBtn');
    const playlistNamesList = document.getElementById('playlistNamesList');

    const baseTemplates = [
        "{keyword} Vibes",
        "The {keyword} Mixtape",
        "{keyword} Drive",
        "Lost in {keyword}",
        "{keyword} Sessions",
        "Retro {keyword}",
        "Sounds of {keyword}",
        "Melodies of {keyword}",
        "Golden {keyword}"
    ];

    const cmiyglPhrases = [
        "If You Get Lost",
        "Call Me",
        "Journey Through",
        "Excursions",
        "Voyage",
        "Souvenir",
        "Collection"
    ];

    function generateNames(keywords) {
        const names = [];
        const keywordArray = keywords.toLowerCase().split(',').map(kw => kw.trim()).filter(kw => kw);

        // Generate names using base templates and keywords
        baseTemplates.forEach(template => {
            keywordArray.forEach(keyword => {
                let name = template.replace('{keyword}', keyword.charAt(0).toUpperCase() + keyword.slice(1));
                names.push(name);
            });
        });

        // Add some CMIYGL-inspired names
        cmiyglPhrases.forEach(phrase => {
            keywordArray.forEach(keyword => {
                names.push(`${phrase}: ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`);
                names.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${phrase}`);
            });
        });

        // Ensure unique names and limit the number
        const uniqueNames = [...new Set(names)];
        return uniqueNames.slice(0, 10); // Return up to 10 names
    }

    generateNameBtn.addEventListener('click', () => {
        const keywords = keywordsInput.value;
        const generatedNames = generateNames(keywords);

        playlistNamesList.innerHTML = ''; // Clear previous results
        if (generatedNames.length > 0) {
            generatedNames.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                playlistNamesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = "Please enter some keywords to generate names.";
            playlistNamesList.appendChild(li);
        }
    });

    // Optional: Generate some default names on page load
    keywordsInput.value = "road trip, summer, driving, chill";
    generateNameBtn.click();
});