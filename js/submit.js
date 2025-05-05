const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (if needed)
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ajnastmohammed@gmail.com',
            pass: 'aju123**'
        }
    });

    const mailOptions = {
        from: email,
        to: 'ajnastmohammed@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error: Something went wrong');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Success: Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});