const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// root path
router.get('/', (req, res) => {
	res.render('landing');
});

// ==================================================================
// AUTH ROUTES
// ==================================================================
// REGISTER ROUTE

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render('register', { error: err.message });
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('info', 'Welcome to Campgrounds ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

// LOGIN ROUTE

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successFlash: 'Welcome!',
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
		failureFlash: true
	}),
	(req, res) => {}
);

// LOGOUT ROUTE

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('info', 'Logged you out!');
	res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
