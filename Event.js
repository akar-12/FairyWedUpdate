const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://akarshasnj:AaSsB@cluster0.3jssvp5.mongodb.net/Wedding?retryWrites=true&w=majority')
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number, // Assuming contact is a number, adjust the type accordingly
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});


const User = mongoose.model("User", userSchema);

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  img: String,
  contact: Number,
  price:Number,
  details:String,
  type:String,
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = {
  User,
  Venue,
};
