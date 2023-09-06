const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../auth');


// Check if email exists
router.post("/check-email", auth.verify, (request, response) => {
	UserController.checkIfEmailExists(request.body).then((result) => {
		response.send(result)
	})
})

// User Registration / Create user routes
router.post('/register', async (request, response) => {
    const data = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        mobileNumber: request.body.mobileNumber,
    };

    try {
        const emailCheck = await UserController.checkIfEmailExists(request.body);
        if (emailCheck.message === "Email Already Exists") {
            response.status(400).send({ message: "Email already exists" });
        } else {
            const result = await UserController.register(request.body);
            response.send(result);
        }
    } catch (error) {
        response.status(500).send({ message: "An error occurred" });
    }
});




// Retrieve user details
router.get('/:id/details', auth.verify,  (request, response) =>  {
	UserController.getProfile(request.params.id).then((result) => { response.send(result)

	})
})

// Login User / User Authentication
router.post('/login',auth.verify, (request, response) => {
	UserController.login(request.body).then((result) => {
		response.send(result)
	})
})

// Get all user
router.get('/', (request, response) => {
	UserController.getAllUsers().then((result) => {
		response.send(result)
	})
})

// Delete a user
router.delete('/:userId/delete', auth.verify, (request, response) => {
	const data = {
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	UserController.deleteUser(request.params.userId, data).then((result) => {
		response.send(result)
	})
})





module.exports = router