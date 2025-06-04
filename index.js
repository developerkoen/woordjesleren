// index.js

document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const translationInput = document.getElementById('translationInput');
    const addWordButton = document.getElementById('addWordButton');
    const wordListDiv = document.getElementById('wordList');
    const messageElement = document.getElementById('message');
    const noWordsMessage = document.getElementById('noWordsMessage');

    let vocabulary = []; // Array om de woorden op te slaan

    // Functie om woorden uit localStorage te laden
    function loadVocabulary() {
        const storedVocabulary = localStorage.getItem('vocabulary');
        if (storedVocabulary) {
            vocabulary = JSON.parse(storedVocabulary);
        }
        renderWordList(); // Render de lijst na het laden
    }

    // Functie om woorden op te slaan in localStorage
    function saveVocabulary() {
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    }

    // Functie om de lijst met woorden weer te geven
    function renderWordList() {
        wordListDiv.innerHTML = ''; // Maak de lijst leeg
        if (vocabulary.length === 0) {
            noWordsMessage.style.display = 'block'; // Toon de 'geen woorden' boodschap
        } else {
            noWordsMessage.style.display = 'none'; // Verberg de 'geen woorden' boodschap
            vocabulary.forEach((item, index) => {
                const wordItem = document.createElement('div');
                wordItem.className = 'word-item flex justify-between items-center bg-blue-100 p-3 rounded-lg mb-2 shadow-sm';
                wordItem.innerHTML = `
                    <span class="text-lg font-semibold text-gray-700">${item.word} - ${item.translation}</span>
                    <button data-index="${index}" class="delete-button bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200">Verwijder</button>
                `;
                wordListDiv.appendChild(wordItem);
            });
        }
    }

    // Functie om een bericht weer te geven
    function showMessage(msg, type = 'success') {
        messageElement.textContent = msg;
        messageElement.className = `text-sm mt-3 font-semibold ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'text-sm mt-3 text-green-600 font-semibold'; // Reset class
        }, 3000); // Verberg bericht na 3 seconden
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

    // Event listener voor de 'Woord Toevoegen' knop
    addWordButton.addEventListener('click', () => {
        const word = wordInput.value.trim();
        const translation = translationInput.value.trim();

        if (word && translation) {
            vocabulary.push({ word: word, translation: translation });
            saveVocabulary();
            renderWordList();
            wordInput.value = '';
            translationInput.value = '';
            showMessage('Woord succesvol toegevoegd!');
        } else {
            showMessageBox('Fout', 'Vul zowel het woord als de vertaling in.');
        }
    });

    // Event listener voor het verwijderen van woorden (gebruik event delegation)
    wordListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const indexToDelete = parseInt(event.target.dataset.index);
            vocabulary.splice(indexToDelete, 1); // Verwijder het woord uit de array
            saveVocabulary();
            renderWordList();
            showMessage('Woord verwijderd.');
        }
    });

    // Laad de woorden wanneer de pagina geladen is
    loadVocabulary();
});
