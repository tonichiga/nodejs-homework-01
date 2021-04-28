const path = require("path");
const argv = process.argv;
const contactsPath = path.resolve("./db.json");
const fs = require("fs/promises");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const content = JSON.parse(data);
    console.table(content);
  } catch (error) {
    process.exit(1);
  }
}

async function getContactById(contactId) {
  contactId = Number(contactId);
  try {
    const data = await fs.readFile(contactsPath);
    const content = JSON.parse(data);
    await content.forEach((contact) => {
      if (contact.id === contactId) {
        return console.table(contact);
      }
    });
  } catch (error) {
    process.exit(1);
  }
}

async function removeContact(contactId) {
  try {
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
  } catch (error) {
    process.exit(1);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const id = Date.now();
    const content = JSON.parse(data);
    content.push({ id, name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(content, null, 2));
    console.log("Contact added successfull!");
  } catch (error) {
    process.exit(1);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
