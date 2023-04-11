const mongoose = require('mongoose');

const { Schema } = mongoose;

// const sessionSchema = new Schema({
// 	userId: {
// 		type: Schema.Types.ObjectId,
// 		ref: 'User',
// 	},
// 	createdAt: { type: Date, default: Date.now },
// });

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
	},
	token: { type: String },
	createdAt: { type: Date, expires: 60 * 60 - 1, default: Date.now },
});

const userSchema = new Schema({
	spotifyId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	refreshToken: { type: String, required: true },
	days: { type: Object },
});

module.exports = {
	// Session: mongoose.model('Session', sessionSchema),
	User: mongoose.model('User', userSchema),
	Token: mongoose.model('Token', tokenSchema),
};
