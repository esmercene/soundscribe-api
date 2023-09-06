const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// module to check if email already exist
module.exports.checkIfEmailExists = async (data) => {
    try {
        const result = await User.find({ email: data.email });
        if (result.length > 0) {
            return { message: "Email Already Exists" };
        }
        return { message: "Email is Available" };
    } catch (error) { 
        console.error("Error while checking email existence:", error);
        throw error;
    }
};


// module to register new user
module.exports.register = async (data) => { 
    try {
        const result = await User.find({ email: data.email });
        if (result.length > 0) {
            return { message: "Username / Email already Exists" };
        }

        const encrypted_password = bcrypt.hashSync(data.password, 10);

        const new_user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encrypted_password,
            mobileNumber: data.mobileNumber,
        });

        const created_user = await new_user.save();
        return { message: "New User Successfully Registered" };
    } catch (error) { 
        console.error("Error while registering new user:", error);
        throw error;
    }
};

//  module to login user
module.exports.login = (data) => {
	return User.findOne({email: data.email}).then((result) => {
		if(!result){
			return {message: " User does not exist"}
		} 

		const is_password_correct = bcrypt.compareSync(data.password, result.password)
		if(is_password_correct) {
			return { message: "Login Successful!"}
		}

		return {message: "Invalid Password!!!"}
	}).catch(error => {
        console.error("An error occurred:", error);
        throw error;
    });
}

// module to get all users
module.exports.getAllUsers = () => {
	return User.find({}, {password: 0}).then((result) => {
		return  result
	})
}



// module to archive a user
module.exports.archiveUser = async (userId, data) => {
    if (!data) {
        return Promise.resolve({ message: "User must be ADMIN to archive a user!!!" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });

        if (!updatedUser) {
            return { message: `User with id: ${userId} not found` };
        }

        return { message: `User with id: ${userId} has been archived!` };
    } catch (error) {
        console.error("An error occurred while archiving the user:", error);
        throw error; // Ensure that the error is rethrown or handled appropriately.
    }
};













