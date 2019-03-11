const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
const middleware = require("../middleware");

//Index - shows all campgrounds
router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: campgrounds });
		}
	});
	// res.render('campgrounds', {campgrounds: campgrounds});
});

// Create - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
	let name = req.body.Name;
	let image = req.body.Image;
	let description = req.body.Description;
	let price = req.body.price;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = { name: name, image: image, price: price, description: description, author: author };
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log("Error occured: " + err);
		} else {
			console.log("Added new campground...");
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

// New - shows form to create new campground
// '/campgrounds/new' has to go in front of '/campgrounds/:id' because ':id' will look at '/new' as ':id'
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// SHOW - shows more info about campground
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampgroud) => {
		if (err || !foundCampgroud) {
			req.flash("error", "Campground not found!");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", { campground: foundCampgroud });
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampgroud) => {
		if (foundCampgroud.author.id.equals(req.user._id)) {
			res.render("campgrounds/edit", { campground: foundCampgroud });
		}
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	// find and update correct campground
	// redirect to that campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + campground._id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// MIDDLEWARE
// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	}
// 	res.redirect('/login');
// }

// function checkCampgroundOwnership(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		Campground.findById(req.params.id, (err, foundCampgroud) => {
// 			if (err) {
// 				res.redirect('back');
// 			} else {
// 				// did user create that campground
// 				// foundCampgroud.author.id is an object
// 				// req.user._id is a string
// 				// Thats why we can't compare with triple equal sign in if statement
// 				if (foundCampgroud.author.id.equals(req.user._id)) {
// 					next();
// 				} else {
// 					res.redirect('back');
// 				}
// 			}
// 		});
// 	} else {
// 		res.redirect('back');
// 	}
// }

module.exports = router;
