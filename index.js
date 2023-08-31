// Sample initial contact data (replace with your actual data)
const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // ... more contacts
];

const contactList = document.getElementById('contactList');

// Function to render contacts on the UI
function renderContacts() {
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.email}</span>
            <button class="delete-button" data-id="${contact.id}">Delete</button>
        `;
        contactList.appendChild(li);
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

// Function to handle contact deletion
function handleDelete(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts.splice(index, 1);
        renderContacts();
    }
}
// ... Existing code ...

const addContactForm = document.getElementById('addContactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Function to handle new contact submission
function handleAddContact(event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        const newContact = {
            id: contacts.length + 1, // Generate a new ID
            name: name,
            email: email
        };

        contacts.push(newContact);
        renderContacts();

        // Clear input fields
        nameInput.value = '';
        emailInput.value = '';
    }
}

// Attach event listener to the form submission
addContactForm.addEventListener('submit', handleAddContact);

// Initial rendering
renderContacts();

