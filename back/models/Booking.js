const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  students: { type: Number, required: true },
  parents: { type: Number, required: true },
  teachers: { type: Number, required: true },
  destination: { type: String, required: true },
  menu: { type: String, required: true },
  firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    schoolName: { type: String, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);

//mongodb+srv://antoninaparulava_db_user:t6ffxmHtQ8aK5EWA@cluster0.zztfbxa.mongodb.net/