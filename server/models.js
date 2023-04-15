const mongoose = require('mongoose');

const { Schema } = mongoose;

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
	imageUrl: { type: String },
	refreshToken: { type: String, required: true },
	days: { type: Object },
});

module.exports = {
	User: mongoose.model('User', userSchema),
	Token: mongoose.model('Token', tokenSchema),
};
