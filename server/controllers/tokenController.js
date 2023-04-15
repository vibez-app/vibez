const { Token } = require('../models');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const buffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const tokenController = {};

tokenController.createToken = async (req, res, next) => {
	try {
		// check if we have an access token for the current user, this is unlikely but could happen if logging out and back in quickly
		let accessToken = await Token.findOne({ userId: res.locals.user._id });
		// if not, create one based on the access token received previously
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
	try {
		// check if we have a valid access token (they expire after one hour)
		let accessToken = await Token.findOne({ userId: res.locals.user._id });
		// if we don't, we get one
		if (!accessToken) {
			// get the refresh token from the user document
			const { refreshToken } = res.locals.user;

			// set up the form request to send to spotify for the new access token
			const params = new URLSearchParams();
			params.append('refresh_token', refreshToken);
			params.append('grant_type', 'refresh_token');

			// make the request and parse
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				body: params,
				headers: {
					Authorization: `Basic  ${buffer}`,
				},
			});
			const tokenObj = await response.json();

			// save token
			accessToken = await Token.create({
				userId: res.locals.user._id,
				token: tokenObj.access_token,
			});
		}

		// pass along token
		res.locals.token = accessToken.token;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = tokenController;
