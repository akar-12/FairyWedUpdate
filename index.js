const express = require('express');
const { User, Venue } = require('./Model/Event');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/registration', async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const newUser = await new User(req.body).save();
    console.log("New User:", newUser);

    res.status(200).send(newUser);
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send("Registration failed. Internal server error.");
  }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/login', async (req, res) => {
  try {
    // Email validation
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send("Invalid email format");
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the provided password with the password in the database (plaintext comparison)
    if (password !== user.password) {
      return res.status(401).send("Invalid email or password");
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/managevenues',async (req, res) => {
 try{
  const venue = await Venue.find({});
    res.status(200).json(venue);

 }catch(errorr){
  console.error("Error fetching venue:",error.message);
  res.status(500).send("Server error");
 }
});
app.get('/manageusers', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Use the User model instead of user
    res.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/manageusers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user with the provided ID exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user using deleteOne method
    await User.deleteOne({ _id: userId });

    console.log('User deleted successfully:', userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/deletevenue/:venueId', async (req, res) => {
  try {
    const venueId = req.params.venueId;

    // Check if the venue with the provided ID exists
    const existingVenue = await Venue.findById(venueId);
    if (!existingVenue) {
      console.log('Venue not found:', venueId);
      return res.status(404).json({ error: 'Venue not found' });
    }

    // Delete the venue using deleteOne method
    await existingVenue.deleteOne({ _id: venueId });

    console.log('Venue deleted successfully:', venueId);
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    console.error('Error deleting venue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updatevenue/:venueId', async (req, res) => {
  try {
    const venueId = req.params.venueId;
    const updatedVenueData = req.body;

    // Check if the venue with the provided ID exists
    const existingVenue = await Venue.findById(venueId);
    if (!existingVenue) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    // Update the venue data
    existingVenue.set(updatedVenueData);
    await existingVenue.save();

    console.log('Venue updated successfully:', existingVenue);
    res.status(200).json({ message: 'Venue updated successfully' });
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addvenue', async (req, res) => {
  try {
    const { name, location, img, contact, price, details,type } = req.body;

    // Convert base64 image data to a Buffer
    const imgBuffer = Buffer.from(img, 'base64');

    // Create a new venue object
    const newVenue = new Venue({
      name,
      location,
      img: imgBuffer,
      contact,
      price,
      details,
      type,
    });

    // Save the new venue to the database
    await newVenue.save();

    res.status(201).json({ message: 'Venue added successfully!' });
  } catch (error) {
    console.error('Error adding venue:', error);
    res.status(500).json({ error: 'An error occurred while adding the venue.' });
  }
});

app.listen(7060, () => {
  console.log(`Connected To Localhost port ${7060}`);
});
