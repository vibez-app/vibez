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
				days: [],
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

module.exports = userController;
