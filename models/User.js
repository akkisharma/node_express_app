var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	email: {type: String, lowercase: true, unique: true, require: true},
	first_name: String,
	last_name: String,
	user_name: {type: String, unique: true},
	phone_no: {type: String, max: 10},
	password: String,
	role_type: {type: String, default: 'User'},
	online: {type: Boolean, default: false},
	consultant_attributes: mongoose.Schema.Types.Mixed,
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);