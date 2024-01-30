const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ObjectId can be accessed via Schema if needed, but it's not used in this snippet.

const schema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true, // It should be 'required' instead of 'require'
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
    },
    role: {
        type: [String],
        default: ["Buyer"],
        enum: ["Buyer", "Seller", "Admin"],
    },
    // resetCode: { type: String, default: "" }, // Uncomment if resetCode is needed
}, {
    timestamps: true
});

const User = mongoose.model('User', schema);

module.exports = User;  // Exporting the User model for use in other parts of the application
