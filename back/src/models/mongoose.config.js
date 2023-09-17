import mongoose from "mongoose";
import { ERRORS } from "../utils/errors.utils.js";

const stringValidator = {
  validator: (s) => s === null || s.trim().length > 0,
  message: ERRORS.empty,
};

mongoose.Schema.Types.String.set("validate", stringValidator);

export const Schema = mongoose.Schema;
export const ObjectId = Schema.Types.ObjectId;
export const createCollection = mongoose.model;
export const MongoId = mongoose.Types.ObjectId;
