/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userController = {};

userController.createUser = async (req, res, next) => {
	try {
		let user = await User.findOne({ spotifyId: res.locals.user.id });
		if (user) {
			user = await User.findByIdAndUpdate(
				user._id,
				{ refreshToken: res.locals.token.refresh_token },
				{
					new: true,
				}
			);
		} else {
			user = await User.create({
				spotifyId: res.locals.user.id,
				name: res.locals.user.display_name,
				refreshToken: res.locals.token.refresh_token,
				days: {},
			});
		}
		res.cookie('vibez', jwt.sign({ userId: user._id }, process.env.JWT_KEY));
		res.locals.user = user;
		return next();
	} catch (err) {
		return next(err);
	}
};

userController.getUser = async (req, res, next) => {
	try {
		if (req.cookies.vibez) {
			const cookie = jwt.verify(req.cookies.vibez, process.env.JWT_KEY);
			const user = await User.findById(cookie.userId);
			res.locals.user = user;
			return next();
		}
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
		}
		// set up day object
		const day = {
			tracks,
		};
		// get current user record to get current days object
		const curUser = await User.findById(user._id);
		const curDays = curUser.days || {};
		// add our new day object at key of the date we want
		curDays[req.query.date] = day;
		// update user with updated days object
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				days: curDays,
			},
			{ new: true }
		);
		// pass along updated user
		res.locals.user = updatedUser;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = userController;
