// flashcards.js

document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const flashcardFront = flashcard.querySelector('.flashcard-front');
    const flashcardBack = flashcard.querySelector('.flashcard-back');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const noWordsMessage = document.getElementById('noWordsMessage');
    const flashcardContainer = document.getElementById('flashcardContainer');

    let vocabulary = [];
    let currentIndex = 0;
    let isFlipped = false;

    // Functie om woorden uit localStorage te laden
    function loadVocabulary() {
        const storedVocabulary = localStorage.getItem('vocabulary');
        if (storedVocabulary) {
            vocabulary = JSON.parse(storedVocabulary);
        }
        if (vocabulary.length === 0) {
            noWordsMessage.style.display = 'block';
            flashcardContainer.style.display = 'none'; // Verberg de flashcard als er geen woorden zijn
            prevButton.disabled = true;
            nextButton.disabled = true;
        } else {
            noWordsMessage.style.display = 'none';
            flashcardContainer.style.display = 'block';
            displayFlashcard();
        }
    }

    // Functie om de huidige flashcard weer te geven
    function displayFlashcard() {
        if (vocabulary.length > 0) {
            const currentWord = vocabulary[currentIndex];
            flashcardFront.textContent = currentWord.word;
            flashcardBack.textContent = currentWord.translation;
            // Zorg ervoor dat de kaart niet omgedraaid is bij het wisselen van kaart
            if (isFlipped) {
                flashcard.classList.remove('flipped');
                isFlipped = false;
            }
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

    // Event listener voor het omdraaien van de kaart
    flashcard.addEventListener('click', () => {
        if (vocabulary.length > 0) {
            flashcard.classList.toggle('flipped');
            isFlipped = !isFlipped;
        }
    });

    // Event listener voor de 'Vorige' knop
    prevButton.addEventListener('click', () => {
        if (vocabulary.length > 0) {
            currentIndex = (currentIndex - 1 + vocabulary.length) % vocabulary.length;
            displayFlashcard();
        } else {
            showMessageBox('Geen woorden', 'Er zijn geen woorden om te tonen. Voeg eerst woorden toe op de hoofdpagina.');
        }
    });

    // Event listener voor de 'Volgende' knop
    nextButton.addEventListener('click', () => {
        if (vocabulary.length > 0) {
            currentIndex = (currentIndex + 1) % vocabulary.length;
            displayFlashcard();
        } else {
            showMessageBox('Geen woorden', 'Er zijn geen woorden om te tonen. Voeg eerst woorden toe op de hoofdpagina.');
        }
    });

    // Laad de woorden wanneer de pagina geladen is
    loadVocabulary();
});
