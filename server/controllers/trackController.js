/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const axios = require('axios');

const trackController = {};

trackController.getTracks = async (req, res, next) => {
	try {
		// get current date
		const date = new Date();
		// set time to be zero;
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);

		// date is now the start of today, so we set that as our end time
		// dates need to be in milliseconds to work with Spotify api and for comparisons
		const dateEnd = date.getTime();

		// get start of yesterday in milliseconds
		date.setTime(date.getTime() - 86400000);
		const dateStart = date.getTime();

		// pass along date string
		res.locals.date = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;

		// IF WE PUT EVERYTHING IN THE FETCH USER ROUTE, WE SHOULD CHECK IF THIS DATE ALREADY EXISTS AND SKIP EVERYTHING SO WE DON'T OVERWRITE TRACK DATA

		// get recently played by user after start of day (spotify only has 50 available total)
		const response = await axios.get(
			'https://api.spotify.com/v1/me/player/recently-played',
			{
				headers: {
					Authorization: `Bearer ${res.locals.token}`,
				},
				params: {
					limit: 50,
					before: dateEnd,
				},
			}
		);
		// save tracks into array and get the played time of most recent track
		const tracks = response.data.items;

		if (tracks.length) {
			let curTrackTime = new Date(tracks[tracks.length - 1].played_at);
			while (curTrackTime.getTime() < dateStart) {
				tracks.pop();
				if (!tracks.length) break;
				curTrackTime = new Date(tracks[tracks.length - 1].played_at);
			}
		}
		// pass along tracks array
		res.locals.tracksInfo = tracks;
		return next();
	} catch (err) {
		return next(err);
	}
};

trackController.getTrackFeatures = async (req, res, next) => {
	try {
		// if we don't have any tracks, pass along an empty feature array
		if (!res.locals.tracksInfo.length) {
			res.locals.tracksFeatures = [];
			return next();
		}
		// get list of track Ids from track objects
		const trackIds = res.locals.tracksInfo.map((el) => el.track.id);
		// so we build an array of comma-separated strings of tracks
		const trackIdString = trackIds.reduce((acc, cur) => `${acc},${cur}`);

		// for each query string, get the corresponding track features and add them to an array of track features
		const response = await axios.get(
			'https://api.spotify.com/v1/audio-features',
			{
				headers: {
					Authorization: `Bearer ${res.locals.token}`,
				},
				params: {
					ids: trackIdString,
				},
			}
		);
		const features = response.data.audio_features;
		// pass along an array of track features in same order as info array
		res.locals.tracksFeatures = features;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = trackController;
