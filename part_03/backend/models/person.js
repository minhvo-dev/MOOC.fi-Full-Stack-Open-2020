const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.DB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error);
  });

const DIGITS_REQUIRED = 8;
// Number must have at least 8 digits
const numberValidator = (numberString) => numberString.split("").filter(c => c >= "0" && c <= "9").length >= DIGITS_REQUIRED;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: [numberValidator, `Number must have at least ${DIGITS_REQUIRED} digits`]
  }
});

// apply the uniqueValidator to the personSchema
personSchema.plugin(uniqueValidator);

// modify the return object
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);