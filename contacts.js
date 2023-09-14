const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  // ...твій код. Повертає об'єкт доданого контакту.node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH
  const contacts = await listContacts();
  const addedContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(addedContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return addedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
