const express = require('express'); 
const app = express();
const sqlconnection = require('./database.js/sql.js');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(cors());

app.post("/contact", (req, res) => {
  if (req.method === 'POST') {
    const { fullname, email, message } = req.body;

    // Validate input
    const errors = [];
    if (!fullname || fullname.length < 3) {
      errors.push('Full name must be greater than 2 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Invalid email address.');
    }

    if (!message || message.length < 3 || message.length > 100) {
      errors.push('Message must be between 3 and 100 characters.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ msg: errors, success: false });
    }

        // Get current date and time
        const currentDate = new Date();
        const submission_date = currentDate.toISOString().split('T')[0];
        const submission_time = currentDate.toTimeString().split(' ')[0];
        console.log('Formatted Submission Date:', submission_date);
        console.log('Formatted Submission Time:', submission_time);

    // Insert into MySQL
    const query = 'INSERT INTO contact (fullname, email, message,	 submission_date, submission_time) VALUES (?, ?, ?,?,?)';
    sqlconnection.query(query, [fullname, email, message, submission_date, submission_time], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: ['Database error'], success: false });
      }

      res.status(200).json({ msg: ['Form submitted successfully'], success: true });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

app.get("/", (req, res) => {
  res.send('working i am aman');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
