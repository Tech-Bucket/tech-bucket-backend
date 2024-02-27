const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: [
			'https://www.techbucket.ca',
			'https://techbucket.ca',
			'http://127.0.0.1:5500',
		],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ID = process.env.ID;
const PASS = process.env.PASS;
const REC = process.env.REC;

app.post('/contact', (req, res) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'*'
	);
	const { name, email, phone, message, category } =
		req.body;

	console.log(req.body);
	var transporter = nodemailer.createTransport({
		host: 'smtp.hostinger.com',
		port: 465,
		secure: true,
		auth: {
			user: ID,
			pass: PASS,
		},
	});

	var mailOptions = {
		from: `techbucket@cleverstudio.in<${ID}>`,
		to: REC,
		subject: `Tech Bucket - New Contact Form Submission from ${name}`,
		text: message,
		html: `
        Hello there,<br>
        <p>
        A new contact form submission has been received through TechBucket website. Please find the details below:
       </p>
       </p>
       <ul>
        <li>Name: <b>${name}</b></li>
        <li>Email: <b>${email}</b></li>
        <li>Phone Number: <b>${phone}</b></li>
        <li>Category: <b>${category}</b></li>
        <li>Message: <b>${message}</b></li>
       </ul>
       </b>
       <br>
       Thank you.
        `,
	};

	transporter.sendMail(
		mailOptions,
		function (error, info) {
			if (error) {
				res
					.status(401)
					.json({ status: 'error', error: error });
			} else {
				return res.status(200).json({
					status: 'ok',
					message:
						'Your message has been sent successfully!',
				});
			}
		}
	);
});

app.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});
