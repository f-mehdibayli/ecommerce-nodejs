import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Title must be at most 50 characters long"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        trim: true,
        maxLength: [50, "Title must be at most 50 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email already exists"],
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength: [8, "Password must be at most 8 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user"
    },
    refreshTokens: [{
        type: String,
        default: null
    }]
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);