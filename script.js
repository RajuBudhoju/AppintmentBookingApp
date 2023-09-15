const contacts = [];

const contactList = document.getElementById('contactList');
const contactForm = document.getElementById('contactForm');
const contactNameInput = document.getElementById('contactName');
const contactEmailInput = document.getElementById('contactEmail');
const cancelButton = document.getElementById('cancelEdit');


let editContactId = null;


//*********************************************SAVE CONTACT ************************************************* */

contactForm.addEventListener('submit', handleContactSubmission);


function handleContactSubmission(event) {
    event.preventDefault();

    //It gives the values, which were entered in the boxes
    const name = contactNameInput.value;
    const email = contactEmailInput.value;


    if (name && email) {
        if (editContactId !== null) {
            const contact = contacts.find(contact => contact.id === editContactId);
            if (contact) {
                contact.name = name;
                contact.email = email;
                editContactId = null;
            }

            axios.put("https://crudcrud.com/api/bb427ae8a5f3490c9264d8999a5ff233/contactsData", contact)
                .then((response) => {
                    showContactsAfterEdited(contact);
                    cancelEdit();
                })
                .catch((err) => {
                    console.log(err);
                })

        }
        else {
            // Adding a new contact
            const NewContact = {
                id: contacts.length + 1,
                name: name,
                email: email
            };
            contacts.push(NewContact);

            axios.post("https://crudcrud.com/api/bb427ae8a5f3490c9264d8999a5ff233/contactsData", NewContact)
                .then((response) => {
                    showContactsAfterNewContact(NewContact);
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


}
// *****************************************SHOWING on WEBPAGE******************************************* */

// Fetch contact data when the page loads
window.addEventListener('load', () => {

    axios.get("https://crudcrud.com/api/bb427ae8a5f3490c9264d8999a5ff233/contactsData")
        .then((response) => {
            const contactsData = response.data;
            contacts.length = 0;
            contacts.push(...contactsData); // Update the contacts array with data from the API
            contacts.forEach(contact => {
                showContactsAfterNewContact(contact);
            });
        })
        .catch((err) => {
            console.log(err);
        });
});


function showContactsAfterEdited(contact) {

    const li = document.querySelector(`li[data-contact-id="${contact.id}"]`);
    const index = contacts.indexOf(contact) + 1;
    li.innerHTML = '';
    li.innerHTML = `
        <span>${index}. ${contact.name} - ${contact.email}</span>
        <button class="edit-button" data-id="${contact.id}">Edit</button>
        <button class="delete-button" data-id="${contact.id}">Delete</button>
    `;


    //if condition used to disable edit & delete operations for sample contact
    if (contact.id !== 1) {
        const editButton = li.querySelector('.edit-button');
        const deleteButton = li.querySelector('.delete-button');

        editButton.addEventListener('click', handleEditButtonClick);
        deleteButton.addEventListener('click', handleDeleteButtonClick);
    }

    //After saving contact cleaning input boxes
    contactNameInput.value = "";
    contactEmailInput.value = "";
}


function showContactsAfterNewContact(contact) {

    //Creating Writing html for new contact
    const li = document.createElement('li');
    li.dataset.contactId = contact.id;//used for showUpdatedContact fun
    // const index = contacts.indexOf(contact) + 1;

    li.innerHTML = `
        <span>${contact.id}. ${contact.name} - ${contact.email}</span>
        <button class="edit-button" data-id="${contact.id}">Edit</button>
        <button class="delete-button" data-id="${contact.id}">Delete</button>
    `;

    contactList.appendChild(li);

    //if condition ? To disable edit & delete operations for sample contact
    if (contact.id !== 1) {
        const editButton = li.querySelector('.edit-button');
        const deleteButton = li.querySelector('.delete-button');

        editButton.addEventListener('click', handleEditButtonClick);
        deleteButton.addEventListener('click', handleDeleteButtonClick);
    }

    //After saving contact cleaning input boxes
    contactNameInput.value = "";
    contactEmailInput.value = "";
}


// ********************************************BUTTONs************************************************ */

//EDIT : search the contact & shows on ui input boxes & gave editContactId 
function handleEditButtonClick(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const contact = contacts.find(contact => contact.id === id);

    if (contact) {
        editContactId = contact.id;
        contactNameInput.value = contact.name;
        contactEmailInput.value = contact.email;
        cancelButton.style.display = 'inline-block';
    }
}

//CANCEL : Cleaning Input boxes 
//It is common for all edit button, so declared here only
cancelButton.addEventListener('click', cancelEdit);

function cancelEdit() {
    editContactId = null;
    contactNameInput.value = '';
    contactEmailInput.value = '';
    cancelButton.style.display = 'none';
}

//DELETE : Removing specified contact & Cleaning all contacts & Updating all contacts
function handleDeleteButtonClick(event) {
    console.log("DELETE CLICKED");
    const id = parseInt(event.target.getAttribute('data-id'));
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        const contactToDelete = contacts[index];

        axios.delete(`https://crudcrud.com/api/bb427ae8a5f3490c9264d8999a5ff233/contactsData/${contactToDelete.id}`)
            .then(() => {
                // Contact successfully deleted from the API
                contacts.splice(index, 1); // Remove from the local contacts array
                // Update the UI to reflect the deletion
                contacts.forEach(contact => {
                    showContactsAfterNewContact(contact);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
