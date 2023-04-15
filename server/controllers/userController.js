/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userController = {};

userController.createUser = async (req, res, next) => {
	try {
		// check and see if user is in our DB already
		let user = await User.findOne({ spotifyId: res.locals.user.id });
		// if so, update the refresh token and profile pic url
		if (user) {
			user = await User.findByIdAndUpdate(
				user._id,
				{
					refreshToken: res.locals.token.refresh_token,
					imageUrl: res.locals.user.images[0]
						? res.locals.user.images[0].url
						: '',
				},
				{
					new: true,
				}
			);
		} else {
			// otherwise we create a new user record
			user = await User.create({
				spotifyId: res.locals.user.id,
				name: res.locals.user.display_name,
				imageUrl: res.locals.user.images[0]
					? res.locals.user.images[0].url
					: '',
				refreshToken: res.locals.token.refresh_token,
				days: {},
			});
		}
		// save a cookie with the user id encoded
		res.cookie('vibez', jwt.sign({ userId: user._id }, process.env.JWT_KEY));
		res.locals.user = user;
		return next();
	} catch (err) {
		return next(err);
	}
};

userController.getUser = async (req, res, next) => {
	try {
		// check to see if we have user info cookie
		if (req.cookies.vibez) {
			// decode cookie
			const cookie = jwt.verify(req.cookies.vibez, process.env.JWT_KEY);
			// fetch user data
			const user = await User.findById(cookie.userId);
			res.locals.user = user;
			return next();
		}
		// no cookie, throw error
		throw new Error('No user info found');
	} catch (err) {
		return next(err);
	}
};

userController.addDay = async (req, res, next) => {
	try {
		const { tracksInfo, tracksFeatures, user } = res.locals;
		// build array of track objects
		const tracks = [];
		const colors = [];
		for (let i = 0; i < tracksInfo.length; i++) {
			// if track ids don't line up between info and features arrays, it's bad
			if (tracksInfo[i].track.id !== tracksFeatures[i].id)
				throw new Error('mismatch in tracks and features');
			const trackObj = {};
			trackObj.id = tracksInfo[i].track.id;
			trackObj.name = tracksInfo[i].track.name;
			trackObj.playedAt = tracksInfo[i].played_at;
			trackObj.energy = tracksFeatures[i].energy;
			trackObj.valence = tracksFeatures[i].valence;
			tracks.unshift(trackObj);
			colors.unshift(
				`hsl(${260 - 200 * tracksFeatures[i].valence},${
					tracksFeatures[i].energy * 100
				}%,50%)`
			);
		}
		// set up day object
		const day = {
			tracks,
			colors,
		};
		// get current user record to get current days object
		const curUser = await User.findById(user._id);
		const curDays = curUser.days || {};
		// add our new day object at key of the date we want
		curDays[res.locals.date] = day;
		// update user with updated days object
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				days: curDays,
			},
			{ new: true }
		);
		// pass along updated user and day
		res.locals.user = updatedUser;
		res.locals.day = { [res.locals.date]: day };
		return next();
	} catch (err) {
		return next(err);
	}
};

userController.updateLog = async (req, res, next) => {
	try {
		// make sure we received data to add in correct format
		if (typeof req.body.log !== 'object')
			throw new Error(
				'request body must have a log object of prompts and answers'
			);
		// check if we have user data
		if (req.cookies.vibez) {
			const cookie = jwt.verify(req.cookies.vibez, process.env.JWT_KEY);
			const user = await User.findById(cookie.userId);

			// make sure we have tracks/colors generated for them to log
			if (!user.days[req.query.date].colors)
				throw new Error('No vibez to log for this date');
			// add our new day object at key of the date we want
			user.days[req.query.date].log = req.body.log;
			// update user with updated days object
			const updatedUser = await User.findByIdAndUpdate(
				user._id,
				{
					days: user.days,
				},
				{ new: true }
			);

			res.locals.user = updatedUser;
			return next();
		}
		throw new Error('No user info found');
	} catch (err) {
		return next(err);
	}
};

module.exports = userController;
