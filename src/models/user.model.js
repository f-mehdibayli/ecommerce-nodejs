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
    roles: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user"
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        trim: true,
        maxLength: [15, "Phone must be at most 100 characters long"]
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    isStore: {
        type: Boolean,
        default: false
    },
    storeName: {
        type: String,
        trim: true,
        maxLength: [100, "Store name must be at most 100 characters long"]
    },
    voen: {
        type: String,
        trim: true,
        unique: [true, "VOEN already exists"],
        maxLength: [20, "VOEN must be at most 20 characters long"]
    },
    storeDescription: {
        type: String,
        trim: true,
        maxLength: [500, "Store description must be at most 500 characters long"]
    },
    raiting: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshTokens: [{
        type: String,
        default: null
    }]
}, { timestamps: true })

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