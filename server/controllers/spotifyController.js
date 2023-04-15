/* eslint-disable import/no-extraneous-dependencies */
const querystring = require('node:querystring');
// eslint-disable-next-line import/no-extraneous-dependencies
const randomstring = require('randomstring');
const { Buffer } = require('node:buffer');
const fetch = require('node-fetch');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = 'http://localhost:3000/api/spotify';
const spotifyScope = 'user-read-private user-read-recently-played';
const serverState = randomstring.generate(16);
const buffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const spotifyController = {};

spotifyController.getApprove = (req, res) => {
	// eslint-disable-next-line prefer-template
	// bounce user to spotify for authentication/authorization
	// we include required info about our app to verify our app
	res.redirect(
		`https://accounts.spotify.com/authorize?${querystring.stringify({
			response_type: 'code',
			client_id: clientId,
			scope: spotifyScope,
			redirect_uri: redirectUrl,
			state: serverState,
		})}`
	);
};

spotifyController.checkApprove = (req, res, next) => {
	try {
		// get authorization code and state from spotify's request to our callback
		const { code, state } = req.query;
		// if we don't get an auth code, throw spotify's error
		if (!code) {
			throw new Error(req.query.error);
		}
		// if the state doesn't match the state we sent, something went wrong, so we reject (this is a security feature)
		if (state !== serverState) {
			throw new Error('returned state does not equal to serverState');
		}
		res.locals.authCode = code;
		return next();
	} catch (err) {
		return next(err);
	}
};

spotifyController.getToken = async (req, res, next) => {
	try {
		// set up form to send info to get access token based on authorization code
		const params = new URLSearchParams();
		params.append('code', res.locals.authCode);
		params.append('redirect_uri', redirectUrl);
		params.append('grant_type', 'authorization_code');

		// send and parse request
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: params,
			headers: {
				Authorization: `Basic  ${buffer}`,
			},
		});
		const token = await response.json();

		// pass along token object
		res.locals.token = token;
		return next();
	} catch (err) {
		return next(err);
	}
};

spotifyController.getUser = async (req, res, next) => {
	try {
		// get access token
		const { token } = res.locals;
		// make request for user data using our token
		const response = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		});
		// check if succeeded then parse
		if (response.status !== 200)
			throw new Error('Unable to fetch spotify user info');
		const user = await response.json();
		res.locals.user = user;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = spotifyController;
