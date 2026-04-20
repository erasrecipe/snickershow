// Quote Generator Script

document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const authorDisplay = document.getElementById('authorDisplay');
    const generateQuoteBtn = document.getElementById('generateQuoteBtn');

    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "In three words I can sum up everything I’ve learned about life: it goes on.", author: "Robert Frost" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Travel is fatal to prejudice, bigotry, and narrow-mindedness.", author: "Mark Twain" },
        { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
        { text: "It is better to be hated for what you are than to be loved for what you are not.", author: "André Gide" },
        { text: "We are here to laugh at the odds and live our lives so well, that Death will tremble to take us.", author: "Charles Bukowski" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "It is not the years in your life that count. It is the life in your years.", author: "Abraham Lincoln" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
        { text: "Life is short, and if you want to do it, do it now.", author: "Unknown" },
        { text: "Collect moments, not things.", author: "Unknown" },
        { text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" }
    ];

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    function displayQuote() {
        const quote = getRandomQuote();
        quoteDisplay.textContent = `"${quote.text}"`;
        authorDisplay.textContent = `- ${quote.author}`;
    }

    generateQuoteBtn.addEventListener('click', displayQuote);

    // Display a quote on page load
    displayQuote();
});