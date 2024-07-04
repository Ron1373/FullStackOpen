const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide password as an argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://ronaldoshrestha13:${password}@cluster0.x0qasnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  console.log("phonebook");
  Contact.find({}).then((result) => {
    result.forEach((contact) =>
      console.log(`${contact.name} ${contact.phone}`)
    );
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: process.argv[3],
    phone: process.argv[4],
  });
  contact.save().then((result) => {
    console.log(`added ${contact.name} number ${contact.phone} to phonebook`);
    mongoose.connection.close();
  });
}
