import Internship from '../models/Internship.js';

export const createInternship = async (req, res) => {
  try {
    const { userName, internshipName } = req.body;

    const lastRecord = await Internship.findOne().sort({ createdAt: -1 });

    let nextNumber = 1000;
    if (lastRecord) {
      const lastId = lastRecord.id;
      const lastNum = parseInt(lastId.split('/')[2]);
      nextNumber = lastNum + 1;
    }

    const newId = `CN/ION/${nextNumber}`;

    const newInternship = new Internship({
      id: newId,
      userName,
      internshipName,
    });

    await newInternship.save();
    res.status(201).json({ message: 'Internship created', data: newInternship });
  } catch (error) {
    console.error('❌ Create Internship Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

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
