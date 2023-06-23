import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String
  }
});
// Route hanya akan dibuat ketika dipanggil. jadi ga aktif selamanya
// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "User" already exists in the "models " object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused
// const User = model('User', UserSchema);

// daripada harus membuat model baru
// lihat didalam model.user , jika tidak ada maka buat model baru
const User = models.User || model("User", UserSchema);
export default User;