// Sample Details
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
// ID's
const contactList = document.getElementById('contactList');
const contactForm = document.getElementById('contactForm');
const contactNameInput = document.getElementById('contactName');
const contactEmailInput = document.getElementById('contactEmail');
const cancelButton = document.getElementById('cancelEdit');

let editContactId = null; // To store the ID of the contact being edited

contactForm.addEventListener('submit', handleContactSubmission);

//Adding users data(name & email) in js contacts list(above)
// Function to handle contact submission (both new and edited contacts)
function handleContactSubmission(event) {
    event.preventDefault();

    const name = contactNameInput.value;//It gives the text value, which we entered in the name box
    const email = contactEmailInput.value;//Similary it gaves email

    if (name && email) {
        if (editContactId !== null) {
            // Editing an existing contact
            const index = contacts.findIndex(contact => contact.id === editContactId);
            if (index !== -1) {
                contacts[index].name = name;
                contacts[index].email = email;
                editContactId = null;
            }
        } else {
            // Adding a new contact
            const newContact = {
                id: contacts.length + 1,
                name: name,
                email: email
            };
            contacts.push(newContact);
        }

        renderContacts();
        cancelEdit();
        updateLocalStorage();
    }
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}


// Function to render contacts on the UI
// The process of generating and displaying visual content on a screen
function renderContacts() {
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        const contactNumber = index + 1;
        li.innerHTML = `
            <span>${contactNumber}. ${contact.name} - ${contact.email}</span>
            <button class="edit-button" data-id="${contact.id}">Edit</button>
            <button class="delete-button" data-id="${contact.id}">Delete</button>
        `;
        contactList.appendChild(li);
    });

    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', handleEditButtonClick);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeleteButtonClick);
    });
}


// Function to handle edit button click
function handleEditButtonClick(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const contact = contacts.find(contact => contact.id === id);

    if (contact) {
        handleEdit(contact);
    }
}

// Function to handle contact editing
function handleEdit(contact) {
    editContactId = contact.id;
    contactNameInput.value = contact.name;
    contactEmailInput.value = contact.email;
    cancelButton.style.display = 'inline-block';
}

// Attach event listener to the form submission
cancelButton.addEventListener('click', cancelEdit);

// Function to cancel editing
function cancelEdit() {
    editContactId = null;
    contactNameInput.value = '';
    contactEmailInput.value = '';
    cancelButton.style.display = 'none';
}

// Function to handle contact deletion
function handleDeleteButtonClick(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts.splice(index, 1);
        renderContacts();
        updateLocalStorage();
    }
}
// Initial rendering
renderContacts();
