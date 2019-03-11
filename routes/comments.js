const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");
const middleware = require("../middleware");

// =======================================================================
// NEW COMMENT - shows form to create new comment for specific campground
// =======================================================================
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// find campground
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", { campground: campground });
		}
	});
});

// ADDS COMMENT TO DB
router.post("/", middleware.isLoggedIn, (req, res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					// connect new comment to campground
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "You successfully added comment!");
					// redirect to campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// EDIT COMMENT - SHOWS TEMPLATE IF USER IS AUTHORIZED
router.get("/:commentID/edit", middleware.checkCommentOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err || !foundCampground) {
			req.flash("error", "Campground not found!");
			return res.redirect("back");
		}
		Comment.findById(req.params.commentID, (err, foundComment) => {
			if (err) {
				res.redirect("back");
			} else {
				res.render("comments/edit", { campgroundID: req.params.id, comment: foundComment });
			}
		});
	});
});

// UPDATES COMMENTS IN DB
router.put("/:commentID", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, (err, updatedComments) => {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY COMMENT
router.delete("/:commentID", middleware.checkCommentOwnership, (req, res) => {
	// findByIdAndRemove()
	Comment.findByIdAndRemove(req.params.commentID, (err) => {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted!");
			res.redirect("/campgrounds/" + req.params.id);
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

// function checkCommentOwnership(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		Comment.findById(req.params.commentID, (err, foundComment) => {
// 			if (err) {
// 				res.redirect('back');
// 			} else {
// 				if (foundComment.author.id.equals(req.user._id)) {
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
