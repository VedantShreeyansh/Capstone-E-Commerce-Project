import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: { type: Number, default: 1},
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: { type: String, default: ""},
    role: { type: String, default: "buyer"},
    cart: [cartItemSchema],
    }) ;

const User = mongoose.model("User", userSchema);

export default User;