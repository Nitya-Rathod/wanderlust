// const mongoose = require("mongoose");

// const listingSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//     },
//     image: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: (v) => v === ""? "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
//     },
//     price: Number,
//     location: String,
//     country: String,
//     review: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Review",
//         }
//     ]
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>
            v === "" ? "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [ // Changed from 'review' to 'reviews'
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;