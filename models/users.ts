import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },

  name: {
    type: String,
  },
  books: {
    type: [],
  },
});

// Check if the 'User' model already exists, if not, create it
const User = models.User || model("User", userSchema);
export default User;
