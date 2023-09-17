// import { ERRORS } from "../utils/errors.utils.js";
// import { emailIsValid } from "../utils/regex.utils.js";
import { Schema, createCollection, ObjectId } from "./mongoose.config.js";

const cinemaSchema = new Schema(
  {
    title: { type: String, required: true, lowercase: true },
    release: {
      year: { type: Number, required: true, lowercase: true },
      month: { type: Number, required: true, lowercase: true },
      day: { type: Number, required: true, lowercase: true },
    },
    directors: { type: Array, required: true, lowercase: true },
    actors: { type: Array, required: true, lowercase: true },
    image: { type: String, required: true, lowercase: true },
    type: { type: Array, required: true, lowercase: true },
    synopsis: { type: String, required: true, lowercase: false },
    trailer: { type: String, required: true, lowercase: false },
  },
  {
    timestamps: true,
  }
);

const Cinema = createCollection("Cinema", cinemaSchema);
export default Cinema;
