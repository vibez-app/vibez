/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const spotifyController = require('./controllers/spotifyController');
const userController = require('./controllers/userController');
const tokenController = require('./controllers/tokenController');
const trackController = require('./controllers/trackController');

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'vibez',
	})
	.catch((err) => console.log(err));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/login', spotifyController.getApprove);

app.get(
	'/spotify',
	spotifyController.checkApprove,
	spotifyController.getToken,
	spotifyController.getUser,
	userController.createUser,
	(req, res) => {
		const destination =
			process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : '/';
		res.redirect(destination);
	}
);

app.get(
	'/user',
	userController.getUser,
	tokenController.refreshToken,
	(req, res) => {
		console.log(res.locals.user)
		res.status(200).json({ user: res.locals.user });
	}
);

app.get(
	'/day',
	userController.getUser,
	tokenController.refreshToken,
	trackController.getTracks,
	trackController.getTrackFeatures,
	userController.addDay,
	(req, res) => {
		res.status(200).json(res.locals.user);
	}
);

app.use(express.static(path.resolve(__dirname, '../dist')));
// parsing request body

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

//  express global error handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	const defaultErrObj = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};

	const errorObj = Object.assign(defaultErrObj, { log: err, message: { err } });
	console.log(errorObj.log);
	res.status(errorObj.status).send(errorObj.message);
});

module.exports = app.listen(port, () =>
	console.log('Vibez listening on port 3000!')
);
