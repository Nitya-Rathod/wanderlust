const Listing = require("../models/listing.js")

// Index
module.exports.index = async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
};

// New
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

// Show
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate("reviews")
        .populate("owner");
    if( !listing){
        req.flash("error", "The listing you are trying to access does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
}

// Create
module.exports.createListing = async (req, res)=>{
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created !");
    res.redirect("/listings");
}

// Edit
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "The listing you are trying to access does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

// Update
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);
}

// Destroy
module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let delListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !");
    res.redirect("/listings");
}