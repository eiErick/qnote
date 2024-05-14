const alertHTML = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert-close-btn');

const home = document.querySelector('.home');
const notesContainer = document.querySelector('.notes-container');
const noteCreateBtn = document.querySelector('.note-create-btn');

const notesCreationMenu = document.querySelector('.notes-creation-menu');
const noteTitleInput = document.querySelector('.note-title-input');
const cancelNewNoteBtn = document.querySelector('.cancel-new-note-btn');
const createNewNoteBtn = document.querySelector('.create-new-note-btn');

const noteDisplay = document.querySelector('.note-display');
const backHomeBtn = document.querySelector('.back-home-btn');
const titleChatHeader = document.querySelector('.title-chat-header')
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const chatMsg = document.querySelector('.chat-msg');

let listNotes = [];
const savedNotes = localStorage.getItem('savedNotes');

if (savedNotes) {
    listNotes = JSON.parse(savedNotes);
    listNotes.forEach(note => {
        noteMaker(note.title);
    });
}

const notes = document.querySelectorAll('.note');

notes.forEach(noteTitle => {
    noteTitle.addEventListener('click', () => {
        titleChatHeader.textContent = noteTitle.childNodes[0].textContent;
        chatMsg.innerHTML = ''
        home.style.display = 'none';
        noteDisplay.style.display = 'flex';

        listNotes.forEach((note) => {
            if (note.title === noteTitle.childNodes[0].textContent) {
                note.notes.forEach((text) => {
                    printMsg(text);
                });
            }
        });

    });
});

noteCreateBtn.addEventListener('click', () => {
    home.style.display = 'none';
    notesCreationMenu.style.display = 'flex';
});

cancelNewNoteBtn.addEventListener('click', () => {
    home.style.display = 'block';
    notesCreationMenu.style.display = 'none';
});

createNewNoteBtn.addEventListener('click', () => {
    if (noteTitleInput.value === '') {
        alert('warning', 'The name field cannot be empty!');
        return;
    }

    listNotes.push({'title': noteTitleInput.value, 'notes': []});
    localStorage.setItem('savedNotes', JSON.stringify(listNotes));

    noteTitleInput.value = '';
    location.reload();
});

backHomeBtn.addEventListener('click', () => {
    home.style.display = 'block';
    noteDisplay.style.display = 'none';
});

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    listNotes.forEach((note) => {
        if (note.title === titleChatHeader.textContent) {
            note.notes.push(chatInput.value);
            localStorage.setItem('savedNotes', JSON.stringify(listNotes));
        }
    });

    const msg = {
        content: chatInput.value
    }

    printMsg(msg.content);
    chatInput.value = '';
});

function noteMaker(title) {
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

function printMsg(text) {
    const msg = createMessageEmenent(text);
    chatMsg.appendChild(msg);
}

function createMessageEmenent(content) {
    const div = document.createElement('div');
    div.classList.add('msg');
    div.innerHTML = content;
    return div;
}
