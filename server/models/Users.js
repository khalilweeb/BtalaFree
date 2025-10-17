import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email "],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password "],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "freelancer",
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
