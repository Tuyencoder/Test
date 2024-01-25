import { model,Schema,ObjectId } from "mongoose";
import mongoose from 'mongoose';
const schema = new Schema({
    //
    username:{
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        maxlength: 255,
    },
    role: {
        type: [String],
        default: ["Buyer"],
        enum: ["Buyer", "Seller","Admin"],
    },
    // resetCode: { type: String, default: ""},
},
    {timestamps: true}
);
const User = mongoose.model('User', schema);
export default User;