const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

// Post Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review Created !");
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;