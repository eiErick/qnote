const alertHTML = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert-close-btn');

const home = document.querySelector('.home');
const notesContainer = document.querySelector('.notes-container');
const noteCreateBtn = document.querySelector('.note-create-btn');

const notesCreationMenu = document.querySelector('.notes-creation-menu');
const noteTitleInput = document.querySelector('.note-title-input');
const cancelNewNoteBtn = document.querySelector('.cancel-new-note-btn');
const createNewNoteBtn = document.querySelector('.create-new-note-btn');

noteCreateBtn.addEventListener('click', () => {
    home.style.display = 'none';
    notesCreationMenu.style.display = 'flex';
});

cancelNewNoteBtn.addEventListener('click', () => {
    home.style.display = 'block';
    notesCreationMenu.style.display = 'none';
});

createNewNoteBtn.addEventListener('click', () => {
    noteMaker(noteTitleInput.value);
});

function noteMaker(title) {
    if (title === "") {
        alert('warning', 'The name field cannot be empty!');
        return;
    }

    const div = document.createElement('div');
    const pTitle = document.createElement('p');
    const pLastNote = document.createElement('p');

    div.classList.add('note');
    pTitle.classList.add('note-title');
    pLastNote.classList.add('last-note');

    pTitle.textContent = title;

    div.appendChild(pTitle);
    div.appendChild(pLastNote);

    notesContainer.appendChild(div);

    home.style.display = 'block';
    notesCreationMenu.style.display = 'none';
    noteTitleInput.value = '';
}

function alert(type, msg) {
    if (type === 'warning') {
        alertHTML.childNodes[1].setAttribute('src', 'img/exclamation.svg');
        alertHTML.childNodes[3].childNodes[1].textContent = type.toUpperCase();
        alertHTML.childNodes[3].childNodes[3].textContent = msg;
    }

    alertHTML.style.display = 'flex';

    alertCloseBtn.addEventListener('click', () => {
        alertHTML.style.display = 'none';
    });

    setTimeout(() => {
        alertHTML.style.display = 'none';
    }, 5000);
}
