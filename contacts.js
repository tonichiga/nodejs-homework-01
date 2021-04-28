const path = require("path");
const argv = process.argv;
const contactsPath = path.resolve("./db.json");
const fs = require("fs/promises");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  console.table(content);
}

async function getContactById(contactId) {
  contactId = Number(contactId);
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  await content.forEach((contact) => {
    if (contact.id === contactId) {
      return console.table(contact);
    }
  });
}

async function removeContact(contactId) {
  contactId = Number(contactId);
  const newContacts = [];
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  await content.forEach((contact) => {
    if (contact.id !== contactId) {
      newContacts.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    }
  });
  console.log("Delete done!");
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const id = Date.now();
  const content = JSON.parse(data);
  content.push({ id, name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(content, null, 2));
  console.log("Contact added successfull!");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
