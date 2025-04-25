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
}, {
  timestamps: true
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
