// models/Internship.js
import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  internshipName: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  durationInMonths: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
