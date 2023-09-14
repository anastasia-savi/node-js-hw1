const argv = require("yargs").argv;
const contacts = require("./contacts");

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await contacts.listContacts();
      return console.table(allContact);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact( id );
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);