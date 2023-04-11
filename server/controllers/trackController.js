/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const axios = require('axios');

const trackController = {};

trackController.getTracks = async (req, res, next) => {
	try {
		// expect req to have date in format YYYY-MM-DD
		const date = new Date(`${req.query.date}T00:00`);
		// dates need to be in milliseconds to work with Spotify api and for comparisons
		const dateStart = date.getTime();
		const dateEnd = dateStart + 86400000;
		// get first 50 songs played by user after start of day
		let response = await axios.get(
			'https://api.spotify.com/v1/me/player/recently-played',
			{
				headers: {
					Authorization: `Bearer ${res.locals.token}`,
				},
				params: {
					limit: 50,
					after: dateStart,
				},
			}
		);
		// save tracks into array and get the played time of most recent track
		const tracks = response.data.items;
		let lastTrackTime = new Date(tracks[0].played_at);
		// if we didn't get back 50 songs, or the most recent track is after our date end, we move on
		while (
			!(response.data.items.length < 50 || lastTrackTime.getTime() >= dateEnd)
		) {
			// otherwise we repeat the process and get the next 50 tracks until we've moved outside our date
			response = await axios.get(
				'https://api.spotify.com/v1/me/player/recently-played',
				{
					headers: {
						Authorization: `Bearer ${res.locals.token}`,
					},
					params: {
						limit: 50,
						before: response.data.cursors.before,
					},
				}
			);
			// save tracks; array is in reverse order; this should be optimized at some point
			tracks.unshift(...response.data.items);
			lastTrackTime = new Date(tracks[0].played_at);
		}
		// remove tracks after our date end
		for (let i = 0; i < tracks.length; i++) {
			const trackTime = new Date(tracks[i].played_at);
			if (trackTime.getTime() < dateEnd) break;
			tracks.shift();
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
		// get list of track Ids from track objects
		const trackIds = res.locals.tracksInfo.map((el) => el.track.id);
		// spotify api can only handle requests for 100 tracks at a time
		// so we build an array of comma-separated strings of tracks no longer than 100 tracks
		// set up array with first set
		const trackIdString = [
			trackIds.splice(0, 100).reduce((acc, cur) => `${acc},${cur}`),
		];
		// if there are any more tracks, add another query string
		while (trackIds.length > 100) {
			trackIdString.push(
				trackIds.splice(0, 100).reduce((acc, cur) => `${acc},${cur}`)
			);
		}
		// for each query string, get the corresponding track features and add them to an array of track features
		const features = await trackIdString.reduce(async (acc, cur) => {
			const response = await axios.get(
				'https://api.spotify.com/v1/audio-features',
				{
					headers: {
						Authorization: `Bearer ${res.locals.token}`,
					},
					params: {
						ids: cur,
					},
				}
			);
			acc.push(...response.data.audio_features);
			return acc;
		}, []);
		// pass along an array of track features in same order as info array
		res.locals.tracksFeatures = features;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = trackController;
