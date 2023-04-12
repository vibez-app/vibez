const { Token } = require('../models');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const buffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const tokenController = {};

tokenController.createToken = async (req, res, next) => {
	console.log('createToken')
	try {
		let accessToken = await Token.findOne({ userId: res.locals.user._id });
		if (!accessToken) {
			accessToken = await Token.create({
				userId: res.locals.user._id,
				token: res.locals.token.access_token,
			});
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

tokenController.refreshToken = async (req, res, next) => {
	console.log('refreshToken')
	try {
		let accessToken = await Token.findOne({ userId: res.locals.user._id });
		if (!accessToken) {
			const { refreshToken } = res.locals.user;
			const params = new URLSearchParams();
			params.append('refresh_token', refreshToken);
			params.append('grant_type', 'refresh_token');

			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				body: params,
				headers: {
					Authorization: `Basic  ${buffer}`,
				},
			});
			const tokenObj = await response.json();
			accessToken = await Token.create({
				userId: res.locals.user._id,
				token: tokenObj.access_token,
			});
		}
		res.locals.token = accessToken.token;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = tokenController;
