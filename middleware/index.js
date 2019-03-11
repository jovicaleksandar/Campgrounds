let Campground = require("../models/campgrounds");
let Comment = require("../models/comments");
// All the Middleware functions go here
let middlewareObj = {};

// Checks if user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
};

// Checks if specific campground corresponds to specific user
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampgroud) => {
			if (err || !foundCampgroud) {
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else {
				// did user create that campground
				// foundCampgroud.author.id is an object
				// req.user._id is a string
				// Thats why we can't compare with triple equal sign in if statement
				if (foundCampgroud.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permissio to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
};

// Checks if specific comment corresponds to specific user
middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.commentID, (err, foundComment) => {
			if (err || !foundComment) {
				req.flash("error", "Comment not found!");
				res.redirect("back");
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
};

module.exports = middlewareObj;
