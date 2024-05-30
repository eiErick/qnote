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

const rmenu = document.querySelector('.rmenu');
const deleteBtn = document.querySelector('.delete-btn');

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

notes.forEach((note) => {
    note.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        rmenu.style.display = 'flex';
        rmenu.style.top = `${event.clientY}px`;
        rmenu.style.left = `${event.clientX}px`;
        
        document.addEventListener('click', () => {
            rmenu.style.display = 'none';
        });

        deleteBtn.addEventListener('click', () => {
            listNotes.forEach((n) => {
                if (note.childNodes[0].textContent === n.title) {
                    note.remove();

                    for (let i = 0; i < listNotes.length; i++) {
                        if (listNotes[i].title === n.title) listNotes.splice(i, 1);
                        localStorage.setItem('savedNotes', JSON.stringify(listNotes));
                    }

                }
            });

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

    const nameValid = checkName(noteTitleInput.value);

    if (!nameValid) {
        alert('warning', 'The name already exists!');
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

function checkName(name) {
    let nameValid = true;
    listNotes.forEach((note) => {
        if (name === note.title) {
            nameValid = false;
        }
    });
    return nameValid;
}
