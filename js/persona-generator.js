// CMIYGL Persona Generator Script

document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Your ideal travel companion is...",
            answers: [
                { text: "Someone spontaneous and adventurous.", persona_points: { "Adventurer": 2, "Explorer": 1 } },
                { text: "Someone who loves deep conversations.", persona_points: { "Philosopher": 2, "Storyteller": 1 } },
                { text: "Someone who appreciates art and culture.", persona_points: { "Artist": 2, "Visionary": 1 } },
                { text: "Someone calm and always prepared.", persona_points: { "Planner": 2, "Romantic": 1 } }
            ]
        },
        {
            question: "Your travel style is best described as...",
            answers: [
                { text: "Impulsive, go with the flow.", persona_points: { "Adventurer": 1, "Explorer": 2 } },
                { text: "Thoughtful, seeking new perspectives.", persona_points: { "Philosopher": 1, "Storyteller": 2 } },
                { text: "Creative, always looking for inspiration.", persona_points: { "Artist": 1, "Visionary": 2 } },
                { text: "Planned, savoring every moment.", persona_points: { "Planner": 1, "Romantic": 2 } }
            ]
        },
        {
            question: "When you arrive at a new destination, you first...",
            answers: [
                { text: "Find the nearest trail or peak.", persona_points: { "Explorer": 1, "Adventurer": 1 } },
                { text: "Seek out local stories and history.", persona_points: { "Storyteller": 1, "Philosopher": 1 } },
                { text: "Look for unique architecture or art.", persona_points: { "Visionary": 1, "Artist": 1 } },
                { text: "Find a quiet spot to observe.", persona_points: { "Romantic": 1, "Planner": 1 } }
            ]
        },
        {
            question: "Your preferred souvenir is...",
            answers: [
                { text: "A passport stamp or a photo of a summit.", persona_points: { "Explorer": 2 } },
                { text: "A local legend or a personal anecdote.", persona_points: { "Storyteller": 2 } },
                { text: "A piece of local art or craft.", persona_points: { "Artist": 2 } },
                { text: "A plan for the next adventure.", persona_points: { "Planner": 2 } }
            ]
        }
    ];

    const personas = {
        "Adventurer": { description: "You crave excitement and the thrill of the unknown. Your bags are always packed, ready for the next daring escapade.", img: "../assets/persona_adventurer.png" },
        "Explorer": { description: "You seek to discover new horizons and understand the world. Every corner turned is a new story waiting to be lived.", img: "../assets/persona_explorer.png" },
        "Philosopher": { description: "You travel to ponder life's mysteries and gain new perspectives. Depth and meaning are your compass.", img: "../assets/persona_philosopher.png" },
        "Storyteller": { description: "You gather tales from every journey, weaving them into narratives. Every place has a story you're eager to find.", img: "../assets/persona_storyteller.png" },
        "Artist": { description: "You find beauty in the details and inspiration everywhere. You see the world as a canvas waiting to be captured.", img: "../assets/persona_artist.png" },
        "Visionary": { description: "You look beyond the present, seeking innovation and future possibilities. You're inspired by what could be.", img: "../assets/persona_visionary.png" },
        "Planner": { description: "You meticulously plan every detail to ensure a seamless and enriching experience. Every step is part of a grand design.", img: "../assets/persona_planner.png" },
        "Romantic": { description: "You travel to experience profound beauty and connection, cherishing quiet moments and breathtaking vistas.", img: "../assets/persona_romantic.png" }
    };

    let currentQuestionIndex = 0;
    let userPersonaScores = {};

    const questionText = document.getElementById('questionText');
    const answerButtonsContainer = document.getElementById('answerButtons');
    const quizContainer = document.getElementById('quizContainer');
    const resultBlock = document.getElementById('resultBlock');
    const personaNameDisplay = document.getElementById('personaName');
    const personaDescriptionDisplay = document.getElementById('personaDescription');
    const personaImageDisplay = document.getElementById('personaImage');
    const shareButton = document.getElementById('shareButton');

    function initializeQuiz() {
        Object.keys(personas).forEach(persona => userPersonaScores[persona] = 0);
        currentQuestionIndex = 0;
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionText.textContent = q.question;
            answerButtonsContainer.innerHTML = '';
            q.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.textContent = answer.text;
                button.classList.add('btn-tool'); // Add a class for styling
                button.onclick = () => selectAnswer(answer.persona_points);
                answerButtonsContainer.appendChild(button);
            });
        } else {
            showResult();
        }
    }

    function selectAnswer(persona_points) {
        Object.keys(persona_points).forEach(persona => {
            userPersonaScores[persona] += persona_points[persona];
        });
        currentQuestionIndex++;
        displayQuestion();
    }

    function getHighestScoringPersona() {
        let highestScore = -1;
        let bestPersona = "Adventurer"; // Default

        for (const persona in userPersonaScores) {
            if (userPersonaScores[persona] > highestScore) {
                highestScore = userPersonaScores[persona];
                bestPersona = persona;
            }
        }
        return bestPersona;
    }

    function showResult() {
        const finalPersona = getHighestScoringPersona();
        const personaData = personas[finalPersona];

        personaNameDisplay.textContent = finalPersona;
        personaDescriptionDisplay.textContent = personaData.description;
        personaImageDisplay.src = personaData.img;
        personaImageDisplay.style.display = personaData.img ? 'block' : 'none';
        
        quizContainer.style.display = 'none';
        resultBlock.style.display = 'block';
    }

    shareButton.addEventListener('click', async () => {
        const resultElement = document.getElementById('resultBlock');
        if (!resultElement) return;

        try {
            // Use html2canvas to capture the result block
            const canvas = await html2canvas(resultElement, {
                scale: 2, // Higher scale for better resolution
                useCORS: true, // Attempt to load external images (like persona images)
                logging: true,
                letterRendering: 1,
                allowTaint: true // Important for CORS issues if any
            });
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `my-cmiygl-persona-${Date.now()}.png`;
            link.href = imgData;
            link.click();
        } catch (e) {
            console.error("Error generating shareable image: ", e);
            alert("Could not generate shareable image. Please try again or share manually!");
        }
    });

    initializeQuiz();
