// Sample initial contact data (replace with your actual data)
const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // ... more contacts
];

const contactList = document.getElementById('contactList');
const contactForm = document.getElementById('contactForm');
const contactNameInput = document.getElementById('contactName');
const contactEmailInput = document.getElementById('contactEmail');
const cancelButton = document.getElementById('cancelEdit');

let editContactId = null; // To store the ID of the contact being edited

// Function to render contacts on the UI
function renderContacts() {
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.email}</span>
            <button class="edit-button" data-id="${contact.id}">Edit</button>
            <button class="delete-button" data-id="${contact.id}">Delete</button>
        `;
        contactList.appendChild(li);
    });

    // Attach event listeners to edit and delete buttons
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

// Function to handle contact deletion
function handleDeleteButtonClick(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

// Function to cancel editing
function cancelEdit() {
    editContactId = null;
    contactNameInput.value = '';
    contactEmailInput.value = '';
    cancelButton.style.display = 'none';
}

// Function to handle contact submission (both new and edited contacts)
function handleContactSubmission(event) {
    event.preventDefault();

    const name = contactNameInput.value;
    const email = contactEmailInput.value;

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
    }
}

// Attach event listener to the form submission
contactForm.addEventListener('submit', handleContactSubmission);
cancelButton.addEventListener('click', cancelEdit);

// Initial rendering
renderContacts();
