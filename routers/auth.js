const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	var admin = false;
	//check for  existing user
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(401).send('Email Exists');
    }
    const regnoExists = await User.findOne({registrationNumber:req.body.registrationNumber})
    if(regnoExists){
        return res.status(401).send('Reg number exists')
    }

	//hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Check Admin Code
	if (req.body.adminCode === process.env.ADMIN_CODE) {
		admin = true;
	}

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		registrationNumber: req.body.registrationNumber.toUpperCase(),
		isAdmin: admin,
	});
	try {
		const savedUser = await user.save();
		res.status(201).json({
            name: savedUser.name,
            email: savedUser.email,
            registrationNumber: savedUser.registrationNumber
        })
	} catch (err) {
		res.status(400).send(err);
	}
});

//req.body
router.post('/login', async (req, res, next) => {
	//check if user exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(404).send('Email or password is incorrect');

	//check password
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('invalid pass');

	//Create and assign JWT

	const token = JWT.sign({ user }, process.env.JWT_TOKEN, { expiresIn: '1d' });
	res.header('auth-token', token);

	res.status(201).json({
        name: user.name,
        email: user.email,
        registrationNumber: user.registrationNumber,
        authToken:token
    })
});

module.exports = router;
