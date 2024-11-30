const Listing = require("../models/listing");
const Review = require("../models/review");

// Create review
module.exports.createReview = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success", "New review Created !");
    res.redirect(`/listings/${listing._id}`);
};

// Delete review
module.exports.destroyReview = async(req,res) => {
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
};