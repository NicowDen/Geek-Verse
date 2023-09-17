import { ERRORS } from "../utils/errors.utils.js";
import { emailIsValid } from "../utils/regex.utils.js";
import { Schema, createCollection, ObjectId } from "./mongoose.config.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, ERRORS.required],
      unique: true,
      lowercase: true,
      validate: {
        validator: emailIsValid,
        message: ERRORS.notValid,
      },
    },
    password: { type: String, required: [true, ERRORS.required] },
    role: {
      type: String,
      required: true,
      default: "MEMBER",
      enum: {
        values: ["MEMBER", "ADMIN", "META_ADMIN"],
        message: ERRORS.notValid,
      },
    },
    pseudo: { type: String },
    theme: {
      type: String,
      // default: "pinkBlue",
      enum: {
        values: ["pinkBlue", "redWhite", "blackGold", "vintage"],
        message: ERRORS.notValid,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = createCollection("User", userSchema);
export default User;
