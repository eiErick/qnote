const alertHTML = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert-close-btn');

const header = document.querySelector('.header');
const brandHeader = document.querySelector('.brand-header');
const searchBar = document.querySelector('.search-bar');

const home = document.querySelector('.home');
const notesContainer = document.querySelector('.notes-container');
const searchMsg = document.querySelector('.search-msg');
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

printBanner();

let listNotes = [];
const savedNotes = localStorage.getItem('savedNotes');

if (savedNotes) {
    listNotes = JSON.parse(savedNotes);
    listNotes.forEach(note => {
        noteMaker(note.title);
    });
}

if (listNotes.length === 0) {
    const text = document.createElement('p');
    text.textContent = 'There are no saved notes :/';
    text.classList = 'there-are-no-saved-notes-msg';
    home.appendChild(text);
}

if (window.innerWidth <= 500) brandHeader.style.display = 'none';

const notes = document.querySelectorAll('.note');

notes.forEach(noteTitle => {
    noteTitle.addEventListener('click', () => {
        titleChatHeader.textContent = noteTitle.childNodes[0].textContent;
        chatMsg.innerHTML = '';
        printScreen(noteDisplay, 'flex');
        header.style.display = 'none';

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

brandHeader.addEventListener('click', () => {
    printScreen(home, 'flex');
});

searchBar.addEventListener('input', () => {
    notesContainer.childNodes.forEach((note) => {
        note.style.display = 'none';
        if (searchBar.value === note.firstChild.innerHTML.substr(0, searchBar.value.length)) note.style.display = 'flex';
    });
});

noteCreateBtn.addEventListener('click', () => {
    printScreen(notesCreationMenu, 'flex');
});

cancelNewNoteBtn.addEventListener('click', () => {
    printScreen(home, 'block');
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
    printScreen(home, 'block');
    header.style.display = 'flex';
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

document.addEventListener('contextmenu', (e) => {
    if (e.target.classList[0] === 'msg') {
        e.preventDefault();
        rmenu.style.display = 'flex';
        rmenu.style.top = `${event.clientY}px`;
        rmenu.style.left = `${event.clientX - 120}px`;

        document.addEventListener('click', () => {
            rmenu.style.display = 'none';
        });
        
        deleteBtn.addEventListener('click', () => {
            const title = document.querySelector('.title-chat-header');
            let index = 0;
            
            for (let i = 0; i < listNotes.length; i++) {
                if (listNotes[i].title === title.textContent) {
                    index = i;
                    i = listNotes.length + 1;
                }
            }

            listNotes[index].notes = [];
            e.target.remove();

            const msgs = document.querySelectorAll('.msg');
            for (let i = 0; i < msgs.length; i++) {
                listNotes[index].notes.push(msgs[i].textContent);
            }

            localStorage.setItem('savedNotes', JSON.stringify(listNotes));
        });
    }
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

function printBanner() {
    if (window.location.href === "https://eierick.github.io/qnote/") {
        const banner = document.querySelector(".banner");
        if (navigator.platform !== "Linux x86_64") return;
        banner.style.display = "flex";
    }
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

function printScreen(element, show) {
    home.style.display = 'none';
    notesCreationMenu.style.display = 'none';
    noteDisplay.style.display = 'none';
    element.style.display = show;
}
