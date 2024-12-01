const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route("/")
    // Index route
    .get(wrapAsync(listingController.index)) 
    // Create Route
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); 
    .post( upload.single('listing[image]'), (req,res) => {
        res.send(req.file);
    });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // Show Route
    .get(wrapAsync(listingController.showListing)) 
    // Update Route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) 
    // Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); 

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;