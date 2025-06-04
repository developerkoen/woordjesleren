// quiz.js

document.addEventListener('DOMContentLoaded', () => {
    const quizWordElement = document.getElementById('quizWord');
    const answerInput = document.getElementById('answerInput');
    const checkAnswerButton = document.getElementById('checkAnswerButton');
    const feedbackElement = document.getElementById('feedback');
    const correctCountElement = document.getElementById('correctCount');
    const totalCountElement = document.getElementById('totalCount');
    const noWordsMessage = document.getElementById('noWordsMessage');
    const quizSection = document.getElementById('quizSection');

    let vocabulary = [];
    let currentQuizIndex = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;

    // Functie om woorden uit localStorage te laden
    function loadVocabulary() {
        const storedVocabulary = localStorage.getItem('vocabulary');
        if (storedVocabulary) {
            vocabulary = JSON.parse(storedVocabulary);
        }
        if (vocabulary.length === 0) {
            noWordsMessage.style.display = 'block';
            quizSection.style.display = 'none'; // Verberg de quiz als er geen woorden zijn
        } else {
            noWordsMessage.style.display = 'none';
            quizSection.style.display = 'block';
            startQuiz();
        }
    }

    // Functie om een custom message box te tonen
    function showMessageBox(title, message) {
        const overlay = document.createElement('div');
        overlay.className = 'message-box-overlay';
        overlay.innerHTML = `
            <div class="message-box bg-white p-8 rounded-xl shadow-2xl text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">${title}</h3>
                <p class="text-lg text-gray-600 mb-6">${message}</p>
                <button id="messageBoxCloseButton" class="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">Oké</button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('messageBoxCloseButton').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    // Functie om de quiz te starten of een nieuwe vraag te tonen
    function startQuiz() {
        if (vocabulary.length === 0) {
            showMessageBox('Geen woorden', 'Voeg eerst woorden toe op de hoofdpagina om de quiz te starten.');
            return;
        }
        // Shuffle de woorden voor een willekeurige volgorde
        vocabulary.sort(() => Math.random() - 0.5);
        currentQuizIndex = 0;
        correctAnswers = 0;
        totalQuestions = 0;
        displayQuestion();
        updateScore();
    }

    // Functie om de volgende vraag weer te geven
    function displayQuestion() {
        if (currentQuizIndex < vocabulary.length) {
            const currentWord = vocabulary[currentQuizIndex];
            quizWordElement.textContent = currentWord.word;
            answerInput.value = '';
            feedbackElement.classList.add('hidden'); // Verberg feedback
            answerInput.focus(); // Focus op het invoerveld
        } else {
            // Quiz is afgelopen
            showMessageBox('Quiz Afgerond!', `Je hebt ${correctAnswers} van de ${totalQuestions} vragen correct beantwoord!`);
            startQuiz(); // Herstart de quiz na afloop
        }
    }

    // Functie om de score bij te werken
    function updateScore() {
        correctCountElement.textContent = correctAnswers;
        totalCountElement.textContent = totalQuestions;
    }

    // Functie voor strenge correctie
    function checkStrict(userAnswer, correctAnswer) {
        return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    }

    // Functie voor minder strenge correctie (case-insensitive, trim, en basis fuzzy matching)
    function checkLoose(userAnswer, correctAnswer) {
        const cleanedUser = userAnswer.trim().toLowerCase();
        const cleanedCorrect = correctAnswer.trim().toLowerCase();

        // Exacte match (case-insensitive)
        if (cleanedUser === cleanedCorrect) return true;

        // Basis fuzzy matching: controleer of het antwoord dichtbij is
        // Bijvoorbeeld, als het antwoord 90% overeenkomt (simpele lengtecheck)
        const minLength = Math.min(cleanedUser.length, cleanedCorrect.length);
        const maxLength = Math.max(cleanedUser.length, cleanedCorrect.length);

        if (maxLength === 0) return false; // Voorkom delen door nul

        let matchingChars = 0;
        for (let i = 0; i < minLength; i++) {
            if (cleanedUser[i] === cleanedCorrect[i]) {
                matchingChars++;
            }
        }
        const similarity = matchingChars / maxLength; // Gebruik maxLength voor een strengere check

        return similarity >= 0.8; // 80% overeenkomst als 'minder streng'
    }

    // Event listener voor de 'Controleer Antwoord' knop
    checkAnswerButton.addEventListener('click', () => {
        if (vocabulary.length === 0) {
            showMessageBox('Geen woorden', 'Voeg eerst woorden toe op de hoofdpagina om de quiz te starten.');
            return;
        }

        const userAnswer = answerInput.value;
        const correctAnswer = vocabulary[currentQuizIndex].translation;
        const correctionType = document.querySelector('input[name="correction"]:checked').value;

        let isCorrect = false;
        if (correctionType === 'strict') {
            isCorrect = checkStrict(userAnswer, correctAnswer);
        } else { // loose
            isCorrect = checkLoose(userAnswer, correctAnswer);
        }

        totalQuestions++;
        if (isCorrect) {
            correctAnswers++;
            feedbackElement.textContent = 'Correct! Goed gedaan! 🎉';
            feedbackElement.className = 'feedback-message correct block';
        } else {
            feedbackElement.textContent = `Fout. Het juiste antwoord was "${correctAnswer}". 😔`;
            feedbackElement.className = 'feedback-message incorrect block';
        }
        updateScore();

        // Ga naar de volgende vraag na een korte vertraging
        setTimeout(() => {
            currentQuizIndex++;
            displayQuestion();
        }, 1500); // Wacht 1.5 seconden voordat de volgende vraag verschijnt
    });

    // Laad de woorden wanneer de pagina geladen is
    loadVocabulary();
});
