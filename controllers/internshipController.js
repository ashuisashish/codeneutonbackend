import Internship from '../models/Internship.js';

// Create Internship
export const createInternship = async (req, res) => {
  try {
    const { userName, internshipName, fromDate, toDate } = req.body;

    const lastRecord = await Internship.findOne().sort({ createdAt: -1 });

    let nextNumber = 1000;
    if (lastRecord) {
      const lastId = lastRecord.id;
      const lastNum = parseInt(lastId.split('/')[2]);
      nextNumber = lastNum + 1;
    }

    const newId = `CN/ION/${nextNumber}`;

    // Convert fromDate and toDate to Date objects
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Calculate duration in months
    const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());

    const newInternship = new Internship({
      id: newId,
      userName,
      internshipName,
      fromDate: from,
      toDate: to,
      durationInMonths: months,
    });

    await newInternship.save();
    res.status(201).json({ message: 'Internship created', data: newInternship });
  } catch (error) {
    console.error('❌ Create Internship Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Internships
export const getAllInternships = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const data = await Internship.find({
      internshipName: { $regex: searchQuery, $options: 'i' }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Fetch Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
};
