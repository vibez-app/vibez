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

app.get('/api/login', spotifyController.getApprove);

app.get(
	'/api/spotify',
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
	'/api/user',
	userController.getUser,
	tokenController.refreshToken,
	trackController.getTracks,
	trackController.getTrackFeatures,
	userController.addDay,
	(req, res) => {
		console.log(res.locals.user);
		res.status(200).json(res.locals.user);
	}
);

// app.get(
// 	'/api/userLog',
// 	userController.getLog, (req, res) => {
// 		console.log('here')
// 		res.status(200).send(res.locals.log)
// 	}
// )

app.patch('/api/user', userController.updateLog, (req, res) => {
	res.status(200).send(res.locals.user);
});

// app.get(
// 	'/day',
// 	userController.getUser,
// 	tokenController.refreshToken,
// 	trackController.getTracks,
// 	trackController.getTrackFeatures,
// 	userController.addDay,
// 	(req, res) => {
// 		res.status(200).json(res.locals.user);
// 	}
// );

if (process.env.NODE_ENV !== 'development') {
	app.use(express.static(path.resolve(__dirname, '../dist')));

	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '../dist/index.html'));
	});
}

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
