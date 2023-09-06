const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is required']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	mobileNumber: {
		type: String
	},
	isActive: {
		type: Boolean,
		default: true
	},

})

module.exports = mongoose.model('User', user_schema)