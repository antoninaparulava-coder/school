const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const Trip = require('./models/Trip');
const Booking = require('./models/Booking')

const app = express();

app.use(cors());
app.use(express.json());

//mongodb+srv://antoninaparulava_db_user:t6ffxmHtQ8aK5EWA@cluster0.zztfbxa.mongodb.net/

mongoose.connect("mongodb://127.0.0.1:27017/school")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API working");
});

app.get("/trip", async (req, res) => {
    const trip = await Trip.find()

    res.json(trip);
});

app.post('/api/booking', async (req, res) => {
  
    const { students, parents, teachers, destination, menu, firstName, lastName, schoolName } = req.body;

    
    if (!firstName || !lastName || !schoolName) {
        return res.status(400).json({ error: "Please fill in all required fields" });
    }

    try {
        const newBooking = await Booking.create({
            students, parents, teachers, destination, menu,
            firstName, lastName, schoolName
        });
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: "Failed to save" });
    }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().select('-email -phone');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/trip", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//////////BOOKINGS//////////

//delete a booking
app.delete("/api/book/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted from Database" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add a booking
app.post('/api/book', async (req, res) => {
    try {
        const { schoolName, destination, students, teachers, parents, menu, firstName, lastName } = req.body;

        
        if (!schoolName || !destination || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newBooking = new Booking({
            schoolName,
            destination,
            students,
            teachers,
            parents,
            menu,
            firstName,
            lastName
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking); 
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Update a booking
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


////////TRIP////////


//add a trip
app.post('/api/trip', async (req, res) => {
    try {
        const { name, description, duration, rating, } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Trip name is required" });
        }

        const newTrip = new Trip({
            name,
            description,
            duration,
            rating: parseFloat(rating) || 0,
        });

        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip); 
    } catch (err) {
        console.error("Error saving trip:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a trip
app.delete("/api/trip/:id", async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    
    if (!deletedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a trip
app.put("/api/trip/:id", async (req, res) => {
  try {
    const { name, description, duration, rating } = req.body;
    
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { name, description, duration, rating: parseFloat(rating) || 0 },
      { new: true } 
    );

    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(updatedTrip);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
